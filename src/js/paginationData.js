export const paginationData = (data, size) => {
  const paginationSized = [];

  for (let i = 0; i < data.length; i += size) {
    paginationSized.push(data.slice(i, i + size));
  }

  return paginationSized;
};
