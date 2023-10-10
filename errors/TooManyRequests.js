export default class TooManyRequests extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 429;
  }
}
