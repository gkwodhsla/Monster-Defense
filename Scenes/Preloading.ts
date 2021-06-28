import Phaser, { Sound } from 'phaser'
import ImageKeys from '../Keys/ImageKeys'
import AnimKeys from '../Keys/AnimKeys'
import SceneKeys from '../Keys/SceneKeys'

export default class Preloading extends Phaser.Scene
{
    constructor()
    {
        super(SceneKeys.PRELOAD);
    }

    preload()
    {
        this.load.image(ImageKeys.LOADINGBG,'Loading/Background.png')

        this.load.setPath('spine/');
        this.load.spine(AnimKeys.LOADINGANIM,'로딩01.json','로딩01.atlas');

        this.load.on('complete',   ()=>  {
            this.scene.start(SceneKeys.LOADING);
            });
    }
}