import Phaser from 'phaser'
import ImageKeys from '../Keys/ImageKeys'
import AnimKeys from '../Keys/AnimKeys'
import SceneKeys from '../Keys/SceneKeys'
import SoundKeys from '../Keys/SoundKeys'

export default class EndGame extends Phaser.Scene
{
    constructor()
    {
        super(SceneKeys.ENDGAME);
    }

    preload()
    {
        
    }


    create()
    {
        this.add.image(0,0,ImageKeys.EndBG).setOrigin(0,0);
        this.add.image(400,280,ImageKeys.RIBBON).setScale(0.8).depth=0.2;
        let button1 = this.add.image(400,350,ImageKeys.RESTARTNORMAL).setScale(0.5);
        let button1Clicekd=this.add.image(400,350,ImageKeys.RESTARTCLICKED).setScale(0.5);
        button1.depth=0.1;
        button1Clicekd.depth=0.0;

        
        button1.setInteractive();
        button1Clicekd.setInteractive();
        button1.on('pointerdown',()=>
        {
            button1.depth=0.0;
            button1Clicekd.depth=0.1;
        });
        button1Clicekd.on('pointerup',()=>
        {
            button1.depth=0.1;
            button1Clicekd.depth=0.0;
            this.scene.start(SceneKeys.MAINGAME)
        });

        
        this.input.on('pointerup',()=>
        {
            button1.depth=0.1;
            button1Clicekd.depth=0.0;
        });

        this.add.image(400,200,ImageKeys.GODDESSBACK).setScale(0.8).depth=0.0;

        this.add.spine(-390,-190,AnimKeys.PARTICLEANIM,'animation',true).depth=0.0;

        this.add.image(410,220,ImageKeys.SUN);

        this.add.spine(-80,-35,AnimKeys.GODDESSANIM,'animation',true).scale=0.6;
    }
}