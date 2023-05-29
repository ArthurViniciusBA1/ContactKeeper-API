import { randomUUID } from 'crypto';

export class User {
  readonly id: string;
  fullName: string;
  email: string;
  telephone: string;
  createdAt: string;
  password: string;

  constructor() {
    this.id = randomUUID();
  }
}
