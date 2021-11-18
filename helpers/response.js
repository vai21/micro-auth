const success = (data) => {
  const res = {
    status: 'success',
    data,
  };
  return res;
};

const fail = (data) => {
  const res = {
    status: 'fail',
    data,
  };
  return res;
};

const err = (data) => {
  const res = {
    status: 'error',
    data,
  };
  return res;
};

module.exports = {
  success,
  fail,
  err,
};
