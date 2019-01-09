import { User } from "./user";
import { sha3_512 } from "js-sha3";

export class AuthKey {
  public authToken: string;
  public ablaufTime: Date = new Date();

  constructor(public user: User) {
    this.authToken = sha3_512(
      "authKey_123" +
        user.pwdHash +
        user.userName +
        user.role +
        new Date().toISOString() +
        Math.random()
    );
    this.extend();
  }

  public extend() {
    this.ablaufTime = new Date();
    this.ablaufTime.setTime(new Date().getTime() + 1000 * 60 * 35);
  }
}
