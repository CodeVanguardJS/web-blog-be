function successResponse (res, data, message = 'Success') {
  return res.status(200).json({
    status: true, // success or error
    data, // any, maybe object or array
    message, // any
    errors: [] // array
  })
}
function errorResponse (res, message = 'Error', errors = [], statusCode = 400) {
  return res.status(statusCode).json({
    status: false,
    data: null,
    message,
    errors
  })
}

module.exports = {
  successResponse,
  errorResponse
}
