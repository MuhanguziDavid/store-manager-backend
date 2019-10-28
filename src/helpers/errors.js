class Errors {
  static errorHandler (response, statusCode, error) {
    return response.status(statusCode).json({
      success: false,
      error
    });;
  }
}

export default Errors;
