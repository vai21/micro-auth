const success = (data) => {
  return {
    status: 'success',
    data: data
  }
}

const err = (data) => {
  return {
    status: 'unsuccessful',
    message: data
  }
}

module.exports = {
  err: err,
  success: success
}