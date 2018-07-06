class routerHistory {
  pathHistory: Array<{
    route: string
    beschreibung: string
  }> = []

  pathHistory_r: Array<{
    route: string
    beschreibung: string
  }> = []

  r() {
    this.pathHistory_r = this.pathHistory.reverse()
  }
}

const inst = new routerHistory()

export default inst

export const addRoute = (
  path: string,
  beschreibung: string
) => {
  inst.pathHistory.push({
    route: path,
    beschreibung: beschreibung
  })
  inst.r()
}
