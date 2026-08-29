export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = DomainException.name;
    Object.setPrototypeOf(this, DomainException.prototype);
  }
}
