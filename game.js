class Game {
  constructor() {
    this.init()
    this.initKeyboard()
    this.startGame()
  }

  init() {
    this.gameInterval = INIT_GAME_INTERVAL

    this.drawer = new Drawer()
    this.board = new Board(this)
    this.piece = new Piece(this)
    this.info = {
      point: 0,
    }
  }

  initKeyboard() {
    document.addEventListener('keydown', (event) => {
      // this.playSound()
      switch (event.code) {
        case 'ArrowLeft':
          this.piece.moveLeft()
          this.playSound('switch10')
          break
        case 'ArrowRight':
          this.piece.moveRight()
          this.playSound('switch10')
          break
        case 'ArrowDown':
          this.piece.moveDown()
          break
        case 'ArrowUp':
          this.piece.rotate()
          this.playSound('switch19')
          break
        case ('Space', 'Enter'):
          if (this.piece.jumpDown()) {
            this.playSound('click2')
            this.info.point += 1
          }
          break
      }
    })
  }

  startGame() {
    setInterval(() => {
      this.drawer.resetBoard()
      this.drawer.drawBoard(this.board)
      this.drawer.drawPiece(this.piece)
      this.drawer.drawInfo(this.info)
    }, FPS)
    this.loop()
  }
  loop() {
    setTimeout(() => {
      if (this.piece.canMoveDown()) {
        this.piece.moveDown()
      } else {
        this.board.appendPiece(this.piece)
        var point = this.board.check(this.piece)
        if (point > 0) {
          this.info.point += Math.pow(2, point * 2)
          this.playSound('powerUp2')
        }
        this.piece = new Piece(this)
      }
      if (this.piece.canExist()) {
        this.loop()
      }
    }, this.gameInterval)
  }

  playSound(file) {
    var audio = new Audio('audio/' + file + '.ogg')
    audio.play()
  }
}

const g = new Game()
