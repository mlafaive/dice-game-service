export default class HttpError extends Error {
  public readonly status: number = 500;
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
  }
}

export class NotFoundError extends HttpError {
  public readonly status: number = 404;
}

export class BadRequestError extends HttpError {
  public readonly status: number = 400;
}

export class AuthenticationError extends HttpError {
  public readonly status: number = 401;
}

export class AuthorizationError extends HttpError {
  public readonly status: number = 403;
}

export class InternalServerError extends HttpError {
  public readonly status: number = 500;
}