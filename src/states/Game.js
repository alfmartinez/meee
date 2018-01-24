/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init (levelData) {
    this.levelData = levelData;
  }
  preload () {}

  create () {
    const x = this.game.world.centerX-25
    const y = this.game.world.centerY-25
    this.game.add.sprite(x,y,'meee')
  }
}
