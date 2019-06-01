import { userGroup } from './userGroup';
import { userGroups } from '.';

interface fieldAlowed {
  table: string
  field: string
}

export class user {
  public userGroup: userGroup

  constructor(
    public userID: number,
    public personID: number,
    public userName: string,
    public pwdHash: string,
    public salt: string,
    public ablaufDatum: string,
    public userGroupID: number,
    public pin: string
  ) {
    this.userGroup = userGroups.filter(
      v => v.userGroupID === userGroupID
    )[0]
  }

  toSave(ohnePWD: boolean = false): string {
    if (ohnePWD) {
      return JSON.stringify(
        {
          userID: this.userID,
          personID: this.personID,
          userName: this.userName,
          ablaufDatum: this.ablaufDatum,
          userGroupID: this.userGroupID,
          pin: this.pin
        },
        null,
        2
      )
    } else {
      return JSON.stringify(
        {
          userID: this.userID,
          personID: this.personID,
          userName: this.userName,
          pwdHash: this.pwdHash,
          salt: this.salt,
          ablaufDatum: this.ablaufDatum,
          userGroupID: this.userGroupID,
          pin: this.pin
        },
        null,
        2
      )
    }
  }
  public checkAlowedFileds(
    args: fieldAlowed | Array<fieldAlowed>
  ): boolean {
    // return true
    if (args instanceof Array) {
      return this._checkAlowedFileds(args)
    } else {
      return this._checkAlowedFileds([args])
    }
  }
  private _checkAlowedFileds(
    args: Array<fieldAlowed>
  ): boolean {
    args.map(singleCheck => {
      return (
        this.userGroup.fieldAccess.filter(value => {
          if (
            value.field !== '*' &&
            value.field !== singleCheck.field
          ) {
            return false
          }
          if (
            value.table !== '*' &&
            value.table !== singleCheck.table
          ) {
            return false
          }
          return true
        }).length > 0
      )
    })
    return true
  }
}
export default user
