/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init (levelData) {
    this.levelData = levelData
  }

  preload () {}

  create () {
    const bannerText = 'Congratulations'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)
  }
}
