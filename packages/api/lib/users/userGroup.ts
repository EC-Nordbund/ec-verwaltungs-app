export class userGroup {
  constructor(
    public userGroupID: number,
    public bezeichnung: string,
    public mutationRechte: string[],
    public fieldAccess: {
      table: string
      field: string
    }[]
  ) { }
  
  public toSave(): String {
    return JSON.stringify(this, null, 2);
  }
}
