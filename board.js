class Board {
  constructor(game) {
    this.data = []
    for (let i = 0; i < GAME_HEIGHT; i++) {
      this.data[i] = Array(GAME_WIDTH).fill(0)
    }
  }

  appendPiece(piece) {
    piece.cells.forEach((cell) => {
      this.data[cell.row][cell.col] = cell.color ? cell.color : '1'
    })
  }

  check(piece) {
    let point = 0
    for (let i = 0; i < piece.numOfRow(); i++) {
      if (this.checkRow(piece.row + i)) {
        point++
        this.data.splice(piece.row + i, 1)
        this.data.splice(0, 0, Array(GAME_WIDTH).fill(0))
      }
    }
    return point
  }

  checkRow(row) {
    if (row < 0 || row >= this.data.length) return false
    for (let i = 0; i < this.data[row].length; i++) {
      if (!this.data[row][i]) return false
    }
    return true
  }
}
