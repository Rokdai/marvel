export const ifDataIsEmpty = (data) => {
  return Object.is(data, "") || Object.is(data, null)
    ? "Sorry, no information found"
    : data;
};
