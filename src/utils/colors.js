/** Keep form accents separate from brand/focus colors, with readable white button text. */
export function accentStyle(color) {
  if (!/^#[a-f\d]{6}$/i.test(color)) return undefined;

  const channels = color.match(/[a-f\d]{2}/gi).map((hex) => {
    const value = parseInt(hex, 16) / 255;

    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const luminance = channels.reduce(
    (sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index],
    0,
  );
  // Darken only the button background when white text would fall below 4.5:1 contrast.
  const whiteTextLimit = 1.05 / 4.5 - 0.05;
  const scale = luminance > whiteTextLimit ? whiteTextLimit / luminance : 1;
  const buttonColor =
    scale === 1
      ? color
      : '#' +
        channels
          .map((channel) => {
            const value = channel * scale;
            const encoded = value <= 0.0031308 ? value * 12.92 : 1.055 * value ** (1 / 2.4) - 0.055;

            return Math.floor(encoded * 255)
              .toString(16)
              .padStart(2, '0');
          })
          .join('');

  return {
    '--form-accent': color,
    '--form-button-bg': buttonColor,
    '--form-button-hover': `color-mix(in srgb, ${buttonColor} 90%, #000)`,
    '--on-form-button': '#fff',
  };
}
