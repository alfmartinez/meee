/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init (levelData) {
    this.levelData = levelData
  }

  preload () {}

  create () {

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.others = this.game.add.group(this.game, 'others', true, true)

    this.createMeee()

    var appearTween = this.game.add.tween(this.meee.scale)
    appearTween.from({x: 0, y: 0}, 1000, Phaser.Easing.Linear.None)
    appearTween.onComplete.addOnce(this.enterOther, this)
    appearTween.start()
  }

  createMeee () {
    const x = this.game.world.centerX
    const y = this.game.world.centerY
    this.meee = this.game.add.sprite(x, y, 'meee')
    this.meee.setHealth(100)
    this.game.physics.enable(this.meee, Phaser.Physics.ARCADE)
    this.meee.body.setCircle(25)
    this.meee.anchor.setTo(0.5)
    this.meee.body.onCollide = new Phaser.Signal()
    this.meee.body.onCollide.add(this.interact, this)
    this.meee.inputEnabled = true
    this.meee.body.immovable = true
    this.meee.events.onInputDown.add(function () {
      const angle = this.game.physics.arcade.angleToPointer(this.other) * 180 / Math.PI
      this.other.body.moveTo(this.otherStepSize, this.otherStepDuration, angle)
    }, this)
  }

  enterOther () {
    this.other = this.others.create(51, 51, 'other')
    this.other.body.setCircle(50)
    this.other.inputEnabled = true

    this.others.setAll('body.collideWorldBounds', true)
    this.otherStepSize = 1000
    this.otherStepDuration = 100
    this.other.body.moveTo(this.otherStepSize, this.otherStepDuration, 0)
    this.other.body.onMoveComplete.add(this.moveOtherRandom, this)

    this.other.events.onInputDown.add(function () {
      console.log('OK')
      const angle = this.game.physics.arcade.angleToPointer(this.meee) * 180 / Math.PI
      this.other.body.moveFrom(this.otherStepSize, this.otherStepDuration, angle)
    }, this)
  }

  moveOtherRandom () {
    const newAngle = this.other.body.angle * 180 / Math.PI + 30 * Math.random() - 15
    this.other.body.moveTo(this.otherStepSize, this.otherStepDuration, newAngle)
  }

  update () {
    this.game.physics.arcade.collide(this.meee, this.others)

    if (this.meee.alive) {
      if (this.other) {
        const distance = this.game.physics.arcade.distanceBetween(this.meee, this.other, false, true)
        if (distance < 100) {
          this.meee.frame = 1
        } else if (distance > 200) {
          this.meee.frame = 0
        } else {
          this.meee.frame = 2
        }
      }
    } else {
      this.state.start('GameOver', true, false, this.levelData)
    }

  }

  interact (meee, other) {
    this.other.body.moveFrom(this.otherStepSize, this.otherStepDuration, this.otherAngle)
  }
}
