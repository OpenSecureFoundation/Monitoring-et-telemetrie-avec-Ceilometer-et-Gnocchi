import { RequestBody } from '../models/resquest.body';
import { User } from '../models/user';

export class Login {
  static readonly type = '[User] Login';
  constructor(public payload: { username: string; password: string }) {}
}

export class Logout {
  static readonly type = '[User] Logout';
  constructor() {}
}
