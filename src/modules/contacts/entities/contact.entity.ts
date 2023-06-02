export class Contact {
  readonly id: string;
  name: string;
  email: string;
  telephone: string;
  user_uuid: string;

  readonly created_at: string;
  patched_at: string;

  constructor() {
    this.created_at = new Date().toISOString();
    this.patched_at = new Date().toISOString();
  }
}
