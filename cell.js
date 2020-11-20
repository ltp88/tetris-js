class Cell {
  constructor(game, row, col, color) {
    this.game = game
    this.row = row
    this.col = col
    if (color && color.length > 3) {
      this.color = color
    }
  }
  canMoveDown() {
    if (this.row >= GAME_HEIGHT - 1) return false
    if (this.game.board.data[this.row + 1][this.col]) return false
    return true
  }
  moveDown() {
    if (this.canMoveDown()) this.row++
  }
  canMoveLeft() {
    if (this.col <= 0) return false
    if (this.game.board.data[this.row][this.col - 1]) return false
    return true
  }
  moveLeft() {
    if (this.canMoveLeft()) this.col--
  }
  canMoveRight() {
    if (this.col >= GAME_WIDTH - 1) return false
    if (this.game.board.data[this.row][this.col + 1]) return false
    return true
  }
  moveRight() {
    if (this.canMoveRight()) this.col++
  }

  canExist() {
    if (this.col < 0 || this.col >= GAME_WIDTH || this.row >= GAME_HEIGHT) return false
    if (this.game.board.data[this.row][this.col]) return false
    return true
  }
}
