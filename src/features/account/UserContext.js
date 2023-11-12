let globalUserId = null;

export const setGlobalUserId = (userId) => {
  globalUserId = userId;
};

export const getGlobalUserId = () => {
  return globalUserId;
};
