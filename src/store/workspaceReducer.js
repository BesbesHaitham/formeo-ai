export function workspaceReducer(state, action) {
  switch (action.type) {
    case 'initialize':
      if (state.initialized) return state;
      return {
        ...state,
        forms: action.forms,
        responses: Array.isArray(action.events?.responses)
          ? action.events.responses
          : state.responses,
        visits: Array.isArray(action.events?.visits) ? action.events.visits : state.visits,
        initialized: true,
      };
    case 'add':
      return { ...state, initialized: true, forms: [action.form, ...state.forms] };
    case 'update':
      return {
        ...state,
        initialized: true,
        forms: state.forms.map((form) =>
          form.id === action.form.id
            ? { ...action.form, updatedAt: new Date().toISOString() }
            : form,
        ),
      };
    case 'delete':
      return {
        ...state,
        initialized: true,
        forms: state.forms.filter((f) => f.id !== action.id),
        responses: state.responses.filter((r) => r.formId !== action.id),
        visits: state.visits.filter((v) => v.formId !== action.id),
      };
    case 'visit':
      return { ...state, visits: [...state.visits, action.visit] };
    case 'submit':
      return {
        ...state,
        responses: [...state.responses, action.response],
        visits: state.visits.map((v) => (v.id === action.visitId ? { ...v, completed: true } : v)),
      };
    default:
      return state;
  }
}
