import { User, hashFunc } from ".";

export class AuthKey {
  public authToken: string;
  private ablaufTime: Date|null = null;

  constructor(public user: User) {
    this.authToken = hashFunc(`authKey_123${user.pwdHash}${user.userName}${user.role}${new Date().toISOString()}${Math.random()}`);
    this.extend();
  }

  public extend() {
    if (this.isGueltig || this.ablaufTime === null) {
      const tempDate = new Date();
      tempDate.setTime(new Date().getTime() + 1000 * 60 * 35);
      this.ablaufTime = tempDate;
      return true;
    } else {
      return false;
    }
  }

  public get isGueltig(): boolean {
    return !!this.ablaufTime && (this.ablaufTime > new Date());
  }
}
