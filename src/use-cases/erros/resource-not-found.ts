export class resourceNOtFoundError extends Error {
  constructor() {
    super("Resource not found");
  }
}
