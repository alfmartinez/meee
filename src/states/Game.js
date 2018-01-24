/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init (levelData) {
    this.levelData = levelData;
  }
  preload () {}

  create () {
    const x = this.game.world.centerX
    const y = this.game.world.centerY
    const meee = this.game.add.sprite(x,y,'meee')
    meee.anchor.setTo(0.5)
    var appearTween = game.add.tween(meee.scale)
    appearTween.from({x:0,y:0}, 1000, Phaser.Easing.Linear.None);
    appearTween.start();
  }
}
