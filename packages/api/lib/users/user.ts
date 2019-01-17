import { hash, hashFunc } from ".";

export enum Role {
  none,
  Admin
}

export class User {
  constructor(
    public userID: number,
    public personID: number,
    public userName: string,
    public pwdHash: string,
    public salt: string,
    public ablaufDatum: string,
    public role: Role
  ) {}

  public toSave() {
    return {
      ablaufDatum: this.ablaufDatum,
      personID: this.personID,
      pwdHash: this.pwdHash,
      role: this.role,
      salt: this.salt,
      userID: this.userID,
      userName: this.userName
    };
  }

  public changePWD(
    oldPWD: string,
    newPWD: string
  ): boolean {
    if (this.checkPWD(oldPWD)) {
      this.salt = hashFunc(`${this.pwdHash}${oldPWD}${Math.random()}${new Date().toISOString()}${newPWD}kjsfksjd`);
      this.pwdHash = hash(newPWD, this.salt);
      return true;
    } else {
      return false;
    }
  }

  public checkPWD(pwd: string): boolean {
    return hash(pwd, this.salt) === this.pwdHash;
  }

  public updateUser(gueltigBis: string, role: Role): boolean {
    this.ablaufDatum = gueltigBis;
    this.role = role;
    return true;
  }

  get isGueltig(): boolean {
    return new Date() <= new Date(this.ablaufDatum);
  }
}
