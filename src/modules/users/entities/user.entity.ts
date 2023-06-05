import { randomUUID } from 'crypto';
import { Exclude } from 'class-transformer';

export class User {
  readonly id: string;
  name: string;
  email: string;
  telephone: string;

  readonly created_at: string;
  patched_at: string;

  @Exclude()
  password: string;

  constructor() {
    this.created_at = new Date().toISOString();
    this.patched_at = new Date().toISOString();
  }
}
