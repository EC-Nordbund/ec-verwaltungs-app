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

  public toSave(): any {
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
}
