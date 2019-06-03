import { user } from './user';
import { sha3_512 } from 'js-sha3';


export class authKey {
  public authToken: string
  public ablaufTime: Date = new Date()
  public wrongCounter = 0

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

  reactivate(pin: string) {
    let tmpDate = new Date()
    if(tmpDate.getTime() - this.ablaufTime.getTime() < 3*60*60*1000) {
      if (pin === this.user.pin) {
        this.extend()
        return
      }
    }
    this.wrongCounter = this.wrongCounter + 1
    if (this.wrongCounter >= 3) {
      this.authToken = sha3_512(
        'authKey_123' +
          this.user.pwdHash +
          this.user.userName +
          this.user.userGroup.bezeichnung +
          new Date().toISOString() +
          Math.random()
      )
    }
    throw 'Not Reactable - Zu Spät'
  }
}
