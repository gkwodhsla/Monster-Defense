import Phaser, { Sound } from 'phaser'
import ImageKeys from '../Keys/ImageKeys'
import AnimKeys from '../Keys/AnimKeys'
import SceneKeys from '../Keys/SceneKeys'
import SoundKeys from '../Keys/SoundKeys'

export default class Loading extends Phaser.Scene
{
    constructor()
    {
        super(SceneKeys.LOADING);
    }

    preload()
    {
        this.load.image(ImageKeys.GRASS,"MainGame/Tile/grass.png");
        this.load.image(ImageKeys.SAND,"MainGame/Tile/sand.png");
        this.load.spritesheet(ImageKeys.FLYDEATH,"MainGame/Enemy/FlyDeath.png",{frameWidth:150,frameHeight:150});
        this.load.spritesheet(ImageKeys.FLYRUN,"MainGame/Enemy/FlyRun.png",{frameWidth:150,frameHeight:150});
        this.load.spritesheet(ImageKeys.GOBLINDEATH,"MainGame/Enemy/GoblinDeath.png",{frameWidth:150,frameHeight:150});
        this.load.spritesheet(ImageKeys.GOBLINRUN,"MainGame/Enemy/GoblinRun.png",{frameWidth:150,frameHeight:150});
        this.load.spritesheet(ImageKeys.MARTIALDEATH,"MainGame/Enemy/MartialDeath.png",{frameWidth:200,frameHeight:200});
        this.load.spritesheet(ImageKeys.MARTIALRUN,"MainGame/Enemy/MartialRun.png",{frameWidth:200,frameHeight:200});
        this.load.spritesheet(ImageKeys.MUSHDEATH,"MainGame/Enemy/MushDeath.png",{frameWidth:150,frameHeight:150});
        this.load.spritesheet(ImageKeys.MUSHRUN,"MainGame/Enemy/MushRun.png",{frameWidth:150,frameHeight:150});
        this.load.spritesheet(ImageKeys.SKELETONDEATH,"MainGame/Enemy/SkeletonDeath.png",{frameWidth:150,frameHeight:150});
        this.load.spritesheet(ImageKeys.SKELETONRUN,"MainGame/Enemy/SkeletonWalk.png",{frameWidth:150,frameHeight:150});
        //몬스터 이미지 로드
        this.load.image(ImageKeys.BIGSTONETOWER1,"MainGame/Tower/bigstone1.png");
        this.load.image(ImageKeys.BIGSTONETOWER2,"MainGame/Tower/bigstone2.png");
        this.load.image(ImageKeys.BIGSTONETOWER3,"MainGame/Tower/bigstone3.png");
        this.load.image(ImageKeys.FIRETOWER1,"MainGame/Tower/fire1.png");
        this.load.image(ImageKeys.FIRETOWER2,"MainGame/Tower/fire2.png");
        this.load.image(ImageKeys.FIRETOWER3,"MainGame/Tower/fire3.png");
        this.load.image(ImageKeys.SPIKETOWER1,"MainGame/Tower/spike1.png");
        this.load.image(ImageKeys.SPIKETOWER2,"MainGame/Tower/spike2.png");
        this.load.image(ImageKeys.SPIKETOWER3,"MainGame/Tower/spike3.png");
        this.load.image(ImageKeys.STONETOWER1,"MainGame/Tower/stone1.png");
        this.load.image(ImageKeys.STONETOWER2,"MainGame/Tower/stone2.png");
        this.load.image(ImageKeys.STONETOWER3,"MainGame/Tower/stone3.png");
        //타워 이미지 로드
        this.load.image(ImageKeys.BIGSTONEBULLET,"MainGame/Bullet/bigStoneBullet.png");
        this.load.image(ImageKeys.FIREBULLET,"MainGame/Bullet/fireBullet.png");
        this.load.image(ImageKeys.SPIKEBULLET,"MainGame/Bullet/spikeBullet.png");
        this.load.image(ImageKeys.STONEBULLET,"MainGame/Bullet/stoneBullet.png")
        //총알 이미지 로드
        this.load.image(ImageKeys.HEART,"MainGame/UI/heart.png");
        this.load.image(ImageKeys.GOLD,"MainGame/UI/gold.png");
        this.load.image(ImageKeys.BUILDBUTTONUP,"MainGame/UI/buildButtonUp.png");
        this.load.image(ImageKeys.BUILDBUTTONDOWN,"MainGame/UI/buildButtonDown.png");
        this.load.image(ImageKeys.CHARACTERSELECTIONWINDOW,"MainGame/UI/characterSelection.png");
        this.load.image(ImageKeys.CANCELBUTTON,"MainGame/UI/cancel.png");
        this.load.image(ImageKeys.OLDSCROLL,"MainGame/UI/oldScrolll.png");
        this.load.image(ImageKeys.DEMOLITIONBUTTONDOWN,"MainGame/UI/demolitionButtonDown.png");
        this.load.image(ImageKeys.DEMOLITIONBUTTONUP,"MainGame/UI/demolitionButtonUp.png");
        this.load.image(ImageKeys.UPGRADEBUTTONDOWN,"MainGame/UI/upgradeButtonDown.png");
        this.load.image(ImageKeys.UPGRADEBUTTONUP,"MainGame/UI/upgradeButtonUp.png");
        this.load.image(ImageKeys.PLAYBUTTON,"MainGame/UI/playButton.png");
        this.load.image(ImageKeys.ACCELBUTTON,"MainGame/UI/accelButton.png");
        //UI에 쓰일 이미지 로드
        this.load.image(ImageKeys.EndBG,'EndGame/background.png');
        this.load.image(ImageKeys.RIBBON,'EndGame/ribbon.png');
        this.load.image(ImageKeys.RESTARTNORMAL,'EndGame/restartNormal.png');
        this.load.image(ImageKeys.RESTARTCLICKED,'EndGame/restartClicked.png');
        this.load.image(ImageKeys.NEXTNORMAL,'EndGame/nextNormal.png');
        this.load.image(ImageKeys.NEXTCLICKED,'EndGame/nextClicked.png');
        this.load.image(ImageKeys.GODDESSBACK,'EndGame/goddessBack.png');
        this.load.image(ImageKeys.SUN,'EndGame/sun.png');
        //엔딩씬
        this.load.audio(SoundKeys.BACKGROUNDSOUND,'Sound/backgroundSound.mp3');
        this.load.audio(SoundKeys.BATDIESOUND,'Sound/batDie.mp3');
        this.load.audio(SoundKeys.GOBLINDIESOUND,'Sound/goblinDeath.mp3');
        this.load.audio(SoundKeys.MARTIALDIESOUND,'Sound/martialDie.mp3');
        this.load.audio(SoundKeys.MONSTERDIESOUND,'Sound/monsterDeath.mp3');
        this.load.audio(SoundKeys.TOWERSOUND,'Sound/catapult.mp3');
        //사운드로드

        this.load.setPath('spine/');
        //this.load.spine(AnimKeys.LOADINGANIM,'로딩01.json','로딩01.atlas');
        
        this.load.spine(AnimKeys.PARTICLEANIM,'particle.json','particle.atlas');
        this.load.spine(AnimKeys.GODDESSANIM,'성공화면01.json','성공화면01.atlas');

        this.add.image(0,0,ImageKeys.LOADINGBG).setOrigin(0.0,0.0);
        this.add.spine(0,0,"LoadingAnim","Loading",true);
        let percentText = this.make.text({
            x: 360,
            y: 120,
            text: '0%',
            style: {
              font: '40px monospace',
              fill: '#000000'
            }
          });

        this.load.on('progress',  (value)=>  {
            percentText.setText(Phaser.Math.CeilTo(value*100) + '%');
            });
        this.load.on('complete',   ()=>  {
            this.scene.start(SceneKeys.MAINGAME);
            });
    }


    create()
    {
        this.anims.create(
            {
                key:AnimKeys.FLYDEATHANIM,
                frames:this.anims.generateFrameNumbers(ImageKeys.FLYDEATH,
                    {
                        start:0,
                        end:3,
                    }),
                repeat:0,
                frameRate:10
            });
        this.anims.create(
            {
                key:AnimKeys.FLYRUNANIM,
                frames:this.anims.generateFrameNumbers(ImageKeys.FLYRUN,
                    {
                        start:0,
                        end:7,
                    }),
                repeat:-1,
                frameRate:10
            });
        this.anims.create(
            {
                key:AnimKeys.GOBLINDEATHANIM,
                frames:this.anims.generateFrameNumbers(ImageKeys.GOBLINDEATH,
                    {
                        start:0,
                        end:3,
                    }),
                repeat:0,
                frameRate:10
            });
        this.anims.create(
            {
                key:AnimKeys.GOBLINRUNANIM,
                frames:this.anims.generateFrameNumbers(ImageKeys.GOBLINRUN,
                    {
                        start:0,
                        end:7,
                    }),
                repeat:-1,
                frameRate:10
            });
        this.anims.create(
            {
                key:AnimKeys.MARTIALDEATHANIM,
                frames:this.anims.generateFrameNumbers(ImageKeys.MARTIALDEATH,
                    {
                        start:0,
                        end:6,
                    }),
                repeat:0,
                frameRate:10
            });
        this.anims.create(
            {
                key:AnimKeys.MARTIALRUNANIM,
                frames:this.anims.generateFrameNumbers(ImageKeys.MARTIALRUN,
                    {
                        start:0,
                        end:7,
                    }),
                repeat:-1,
                frameRate:10
            });
        this.anims.create(
            {
                key:AnimKeys.MUSHDEAETHANIM,
                frames:this.anims.generateFrameNumbers(ImageKeys.MUSHDEATH,
                    {
                        start:0,
                        end:6,
                    }),
                repeat:0,
                frameRate:10
            });
        this.anims.create(
            {
                key:AnimKeys.MUSHRUNANIM,
                frames:this.anims.generateFrameNumbers(ImageKeys.MUSHRUN,
                    {
                        start:0,
                        end:7,
                    }),
                repeat:-1,
                frameRate:10
            });
        this.anims.create(
            {
                key:AnimKeys.SKELETONDEATHANIM,
                frames:this.anims.generateFrameNumbers(ImageKeys.SKELETONDEATH,
                    {
                        start:0,
                        end:4,
                    }),
                repeat:0,
                frameRate:10
            });
        this.anims.create(
                {
                    key:AnimKeys.SKELETONRUNANIM,
                    frames:this.anims.generateFrameNumbers(ImageKeys.SKELETONRUN,
                        {
                            start:0,
                            end:4,
                        }),
                    repeat:-1,
                    frameRate:10
                });
        
    }

    update(deltaTime)
    {
        this.scene.start(SceneKeys.MAINGAME);
    }
}