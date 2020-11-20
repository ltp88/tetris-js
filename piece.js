// Tetromino
class Piece {
  constructor(game) {
    this.PIECES = [
      // [
      //   [
      //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //   ],
      // ],
      // [
      //   [
      //     [1, 1, 1],
      //     [1, 1, 1],
      //     [1, 1, 1],
      //   ],
      // ],
      [
        [
          [1, 1],
          [1, 1],
        ],
      ],
      [[[1, 1, 1, 1]], [[1], [1], [1], [1]]],
      [
        [
          [1, 1, 0],
          [0, 1, 1],
        ],
        [
          [0, 1],
          [1, 1],
          [1, 0],
        ],
      ],
      [
        [
          [0, 1, 1],
          [1, 1, 0],
        ],
        [
          [1, 0],
          [1, 1],
          [0, 1],
        ],
      ],
      [
        [
          [1, 0],
          [1, 0],
          [1, 1],
        ],
        [
          [1, 1, 1],
          [1, 0, 0],
        ],
        [
          [1, 1],
          [0, 1],
          [0, 1],
        ],
        [
          [0, 0, 1],
          [1, 1, 1],
        ],
      ],
      [
        [
          [0, 1],
          [0, 1],
          [1, 1],
        ],
        [
          [1, 0, 0],
          [1, 1, 1],
        ],
        [
          [1, 1],
          [1, 0],
          [1, 0],
        ],
        [
          [1, 1, 1],
          [0, 0, 1],
        ],
      ],
    ]
    this.game = game
    this.row = 0
    this.col = 0
    this.init()
  }

  init() {
    this.datas = this.PIECES[Math.floor(Math.random() * this.PIECES.length)]
    this.pos = Math.floor(Math.random() * this.datas.length)
    this.data = this.datas[this.pos]
    this.col = Math.floor((GAME_WIDTH - this.data.length) / 2)
    this.initCells()
  }
  initCells() {
    this.cells = []
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        if (this.data[i][j]) this.cells.push(new Cell(this.game, this.row + i, this.col + j, COLORS[Math.floor(Math.random() * COLORS.length)]))
      }
    }
  }
  cellFromData(data) {
    var cells = []
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j]) cells.push(new Cell(this.game, this.row + i, this.col + j, COLORS[Math.floor(Math.random() * COLORS.length)]))
      }
    }
    return cells
  }
  rotate() {
    var pos = this.pos + 1
    if (pos >= this.datas.length) pos = 0
    const data = this.datas[pos]
    const cells = this.cellFromData(data)
    for (let i = 0; i < this.cells.length; i++) {
      if (!cells[i].canExist()) return false
    }
    this.pos = pos
    this.data = data
    this.cells = cells
    // this.initCells()
    return true
  }
  canMoveDown() {
    for (let i = 0; i < this.cells.length; i++) {
      if (!this.cells[i].canMoveDown()) return false
    }
    return true
  }
  moveDown() {
    if (!this.canMoveDown()) return
    this.row++
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].moveDown()
    }
    return true
  }
  moveLeft() {
    for (let i = 0; i < this.cells.length; i++) {
      if (!this.cells[i].canMoveLeft()) return false
    }
    this.col--
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].moveLeft()
    }
    return true
  }
  moveRight() {
    for (let i = 0; i < this.cells.length; i++) {
      if (!this.cells[i].canMoveRight()) return false
    }
    this.col++
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].moveRight()
    }
    return true
  }
  jumpDown() {
    if (!this.canMoveDown()) return false
    while (this.canMoveDown()) this.moveDown()
    return true
  }
  numOfRow() {
    return this.data.length
  }

  canExist() {
    for (let i = 0; i < this.cells.length; i++) {
      if (!this.cells[i].canExist()) return false
    }
    return true
  }
}
