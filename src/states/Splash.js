import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init (levelData) {
    this.levelData = levelData;
  }

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('meee', 'assets/images/meee.svg', 50, 50)
    this.load.spritesheet('other', 'assets/images/other.svg', 100,100)
  }

  create () {
    this.state.start('Game', true, false, this.levelData)
  }
}
