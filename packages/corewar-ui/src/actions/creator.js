export const action = (type, payload = {}) => (
  {type, ...payload}
)