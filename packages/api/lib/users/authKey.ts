import { user } from './user';
import { sha3_512 } from 'js-sha3';


export class authKey {
  public authToken: string
  public ablaufTime: Date = new Date()

  constructor(public user: user) {
    this.authToken = sha3_512(
      'authKey_123' +
        user.pwdHash +
        user.userName +
        user.userGroup.bezeichnung +
        new Date().toISOString() +
        Math.random()
    )
    this.extend()
  }

  extend() {
    this.ablaufTime = new Date()
    this.ablaufTime.setTime(
      new Date().getTime() + 1000 * 60 * 35
    )
  }
}
