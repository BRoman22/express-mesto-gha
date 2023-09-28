export class Error404 extends Error {
  constructor(message) {
    super(message);
    this.name = "error404";
    this.status = "404";
  }
}
