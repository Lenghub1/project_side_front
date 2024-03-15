interface ErrorData {
  message?: string;
}

class ApiError extends Error {
  public statusCode: number | undefined;
  public data: ErrorData | undefined;
  constructor(
    message: string,
    statusCode: number | undefined,
    data: ErrorData | undefined
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  // we can add any common function here. e.g.:
  isConflict() {
    return this.statusCode === 409;
  }
}

export default ApiError;
