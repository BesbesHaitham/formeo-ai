import { createGenerationRequest, aiErrorMessage } from '../src/utils/aiRequest.js';
import { validStoredForm } from '../src/utils/formSchema.js';

/** Local development/preview endpoint. Deploy a secured backend for public hosting. */
export function aiMiddleware(apiKey, model) {
  return async (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/ai/generate') return next();

    const reply = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(body));
    };
    const address = req.socket.remoteAddress;

    if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(address))
      return reply(403, { error: 'This AI endpoint is available only on this device.' });

    if (
      req.headers.origin &&
      req.headers.origin !== `http://${req.headers.host}` &&
      req.headers.origin !== `https://${req.headers.host}`
    )
      return reply(403, { error: 'Invalid request origin.' });

    if (req.method !== 'POST') return reply(405, { error: 'Use POST.' });

    if (!apiKey) return reply(503, { error: 'Gemini is not configured.' });

    const controller = new AbortController();
    res.on('close', () => {
      if (!res.writableEnded) controller.abort();
    });
    try {
      const chunks = [];
      let bytes = 0;
      for await (const chunk of req) {
        bytes += chunk.length;

        if (bytes > 262144) return reply(413, { error: 'Request too large.' });

        chunks.push(chunk);
      }
      let data;
      try {
        data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      } catch {
        return reply(400, { error: 'Invalid JSON.' });
      }

      if (
        !data ||
        typeof data.prompt !== 'string' ||
        !data.prompt.trim() ||
        data.prompt.length > 4000 ||
        (data.current && !validStoredForm(data.current))
      )
        return reply(400, { error: 'Invalid form request.' });

      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });
      const request = createGenerationRequest(data.prompt, data.current);

      if (model) request.model = model;

      const result = await ai.models.generateContent({
        ...request,
        config: { ...request.config, abortSignal: controller.signal },
      });

      if (!controller.signal.aborted) reply(200, { text: result.text });
    } catch (error) {
      if (controller.signal.aborted) return;

      const status = [400, 401, 403, 404, 429, 503, 504].includes(error.status)
        ? error.status
        : /timeout|timed out/i.test(error.message)
          ? 504
          : 502;
      // Return only safe messages; provider error details can contain credentials.
      reply(status, { error: aiErrorMessage(status) });
    }
  };
}
