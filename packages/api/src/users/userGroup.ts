export class userGroup {
  constructor(
    public userGroupID: number,
    public bezeichnung: string,
    public mutationRechte: Array<string>,
    public fieldAccess: Array<{
      table: string
      field: string
    }>
  ) { }
  
  toSave(): String {
    return JSON.stringify(this, null, 2)
  }
}
