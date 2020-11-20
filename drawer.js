class Drawer {
  constructor() {
    this.init()
    this.width = CANVAS_WIDTH
    this.height = CANVAS_HEIGHT
  }

  init() {
    this.gameContext = document.getElementById('centerCanvas').getContext('2d')
    this.leftContext = document.getElementById('leftCanvas').getContext('2d')
    this.rightContext = document.getElementById('rightCanvas').getContext('2d')
  }
  resetBoard() {
    this.gameContext.fillStyle = '#fff'
    this.gameContext.fillRect(0, 0, this.width, this.height)

    this.gameContext.strokeStyle = '#e8e8e8'
    this.gameContext.beginPath()
    for (let i = 1; i < GAME_HEIGHT; i++) {
      this.gameContext.moveTo(0, CELL_SIZE * i)
      this.gameContext.lineTo(CANVAS_WIDTH, CELL_SIZE * i)
    }
    for (let j = 1; j < GAME_WIDTH; j++) {
      this.gameContext.moveTo(CELL_SIZE * j, 0)
      this.gameContext.lineTo(CELL_SIZE * j, CANVAS_HEIGHT)
    }
    this.gameContext.stroke()
  }
  drawCell(row, col, color) {
    if (color && color.length >= 4 && color[0] === '#') {
      this.gameContext.fillStyle = color
    } else {
      this.gameContext.fillStyle = '#1F618D'
    }
    this.gameContext.fillRect(col * CELL_SIZE + 1, row * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2)
  }
  drawBoard(board) {
    for (let i = 0; i < board.data.length; i++) {
      for (let j = 0; j < board.data[i].length; j++) {
        if (board.data[i][j]) this.drawCell(i, j, board.data[i][j])
      }
    }
  }
  drawPiece(piece) {
    if (piece.canExist())
      piece.cells.forEach((cell) => {
        this.drawCell(cell.row, cell.col, cell.color)
      })
  }
  drawInfo(info) {
    this.leftContext.fillStyle = 'white'
    this.leftContext.fillRect(0, 0, LEFT_CONTENT_WIDTH, LEFT_CONTENT_HEIGHT)
    this.leftContext.font = '30px Comic Sans MS'
    this.leftContext.fillStyle = 'red'
    this.leftContext.textAlign = 'center'
    this.leftContext.fillText(info.point, LEFT_CONTENT_WIDTH / 2, LEFT_CONTENT_HEIGHT / 2)
  }
}
