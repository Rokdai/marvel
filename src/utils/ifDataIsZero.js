export const ifDataIsZero = (data) => {
  return Object.is(data, undefined) ? "NOT AVAILABLE" : `${data}$`;
};
