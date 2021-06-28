import Phaser from "phaser"
import ImageKeys from "../Keys/ImageKeys"
import TowerKeys from "../Keys/TowerKeys"
import TowerDataTable from '../dataTable/TowerDataTable'
import Tower from './Tower';

export default class Builder
{
    private isBuildMode=false;
    private canBuild=false;
    private towerCoordX=0.0;
    private towerCoordY=0.0;
    
    private BuildTowerKey!:TowerKeys;
    private towerSelectionWindow!:Phaser.GameObjects.Image;
    private cancelButton!:Phaser.GameObjects.Image;
    private bigStoneTransparent!:Phaser.GameObjects.Image;
    private fireTransparent!:Phaser.GameObjects.Image;
    private spikeTransparent!:Phaser.GameObjects.Image;
    private stoneTransparent!:Phaser.GameObjects.Image;
    private explainWindow!:Phaser.GameObjects.Image;
    
    private selectionWindowContainer!:Phaser.GameObjects.Container;
    private selectionWindowUp!:Phaser.Tweens.Tween;
    private selectionWindowDown!:Phaser.Tweens.Tween;
    private explanationWindowShow!:Phaser.Tweens.Tween;
    private explanationWindowHide!:Phaser.Tweens.Tween;
    //private showBuildFailMsg!:Phaser.Tweens.Tween;
    

    static scene;
    static tileSizeWidth;
    static tileSizeHeight;
    static failText:Phaser.GameObjects.Text;
    static showbuildFailMsg:Phaser.Tweens.Tween;

    private bigStonePriceText!:Phaser.GameObjects.Text;
    private firePriceText!:Phaser.GameObjects.Text;
    private spikePriceText!:Phaser.GameObjects.Text;
    private stonePriceText!:Phaser.GameObjects.Text;

    private bigStoneExplane!:Phaser.GameObjects.Text;
    private fireExplane!:Phaser.GameObjects.Text;
    private spikeExplane!:Phaser.GameObjects.Text;
    private stoneExplane!:Phaser.GameObjects.Text;

    constructor()
    {
        this.towerSelectionWindow=Builder.scene.add.image(0, 0,ImageKeys.CHARACTERSELECTIONWINDOW).setScale(0.5,0.4);
        this.explainWindow=Builder.scene.add.image(1500,500,ImageKeys.OLDSCROLL).setScale(1,0.7).setAlpha(1.0);
        this.cancelButton = Builder.scene.add.image(200,-30,ImageKeys.CANCELBUTTON);
        
        this.selectionWindowContainer=Builder.scene.add.container(250,Builder.scene.scale.height+60);
        this.selectionWindowContainer.add(this.towerSelectionWindow);
        this.selectionWindowContainer.add(this.cancelButton);
        this.cancelButton.setInteractive();
        this.cancelButton.on("pointerdown",()=>{this.selectionWindowDown.play();buildButtonDown.depth=1.0,buildButtonUp.depth=2.0;this.explanationWindowHide.play()});
        
        this.bigStoneTransparent=Builder.scene.add.image(0,0,ImageKeys.BIGSTONETOWER1).setScale(0.25,0.25).setAlpha(0).setDepth(3.0);
        this.fireTransparent=Builder.scene.add.image(0,0,ImageKeys.FIRETOWER1).setScale(0.25,0.25).setAlpha(0).setDepth(3.0);
        this.spikeTransparent=Builder.scene.add.image(0,0,ImageKeys.SPIKETOWER1).setScale(0.25,0.25).setAlpha(0).setDepth(3.0);
        this.stoneTransparent=Builder.scene.add.image(0,0,ImageKeys.STONETOWER1).setScale(0.25,0.25).setAlpha(0).setDepth(3.0);

        this.bigStoneExplane=Builder.scene.add.text(500,420,"This tower can attack\nmultiple enemy.\n\nMedium attack speed.\n\nMedium attack power.\n\nNarrow attack range");
        this.bigStoneExplane.setColor("black");
        this.bigStoneExplane.setFontSize(20);
        this.bigStoneExplane.setAlpha(0.0);

        this.fireExplane=Builder.scene.add.text(500,420,"This tower is prepared \ndisaster for enemy.\n\nLowest attack speed.\n\nHighest attack power.\n\nMedium attack range");
        this.fireExplane.setColor("black");
        this.fireExplane.setFontSize(20);
        this.fireExplane.setAlpha(0.0);
        
        this.spikeExplane=Builder.scene.add.text(500,420,"This tower makes \nenemy bleeding.\nThe bleeding effect\ndoesn't cumulative.\nMedium attack speed.\nLowest attack power.\n\nHighest attack range");
        this.spikeExplane.setColor("black");
        this.spikeExplane.setFontSize(20);
        this.spikeExplane.setAlpha(0.0);

        this.stoneExplane=Builder.scene.add.text(500,420,"This tower has no\nfeature.\n\nHighest attack speed.\n\nLowest attack power.\n\nMedium attack range");
        this.stoneExplane.setColor("black");
        this.stoneExplane.setFontSize(20);
        this.stoneExplane.setAlpha(0.0);

        let bigTowerSelectionImg = Builder.scene.add.image(-120,0,ImageKeys.BIGSTONETOWER1).setScale(0.5,0.5)
        bigTowerSelectionImg.setInteractive();
        bigTowerSelectionImg.on("pointerdown",()=>{
            this.BuildTowerKey=TowerKeys.BIGSTONETOWER1;
            if(Tower.scene.curMoney-TowerDataTable[this.BuildTowerKey]['price']>=0)
            {
                this.isBuildMode=true;
                this.bigStoneTransparent.alpha=0.5;
                this.fireTransparent.alpha=0.0;
                this.spikeTransparent.alpha=0.0;
                this.stoneTransparent.alpha=0.0;
            }
            else
            {
                Builder.showbuildFailMsg.play();
            }
            this.selectionWindowDown.play();
            this.explanationWindowHide.play();
        });
        bigTowerSelectionImg.on("pointermove",()=>{this.bigStoneExplane.setAlpha(1.0);});
        bigTowerSelectionImg.on("pointerout",()=>{this.bigStoneExplane.setAlpha(0.0);});

        this.selectionWindowContainer.add(bigTowerSelectionImg);
        let fireTowerSelectionImg = Builder.scene.add.image(-35,0,ImageKeys.FIRETOWER1).setScale(0.5,0.5);
        fireTowerSelectionImg.setInteractive();
        fireTowerSelectionImg.on("pointerdown",()=>
            {
                this.BuildTowerKey=TowerKeys.FIRETOWER1;
                if(Tower.scene.curMoney-TowerDataTable[this.BuildTowerKey]['price']>=0)
                {
                    this.isBuildMode=true;
                    this.bigStoneTransparent.alpha=0.0;
                    this.fireTransparent.alpha=0.5;
                    this.spikeTransparent.alpha=0.0;
                    this.stoneTransparent.alpha=0.0;
                }
                else
                {
                    Builder.showbuildFailMsg.play();
                }
                this.selectionWindowDown.play();
                this.explanationWindowHide.play();
            });
        fireTowerSelectionImg.on("pointermove",()=>{this.fireExplane.setAlpha(1.0);});
        fireTowerSelectionImg.on("pointerout",()=>{this.fireExplane.setAlpha(0.0);});

        this.selectionWindowContainer.add(fireTowerSelectionImg);
        let spikeTowerSelectionImg=Builder.scene.add.image(45,0,ImageKeys.SPIKETOWER1).setScale(0.5,0.5);
        spikeTowerSelectionImg.setInteractive();
        spikeTowerSelectionImg.on("pointerdown",()=>
        {
            this.BuildTowerKey=TowerKeys.SPIKETOWER1;
            if(Tower.scene.curMoney-TowerDataTable[this.BuildTowerKey]['price']>=0)
            {
                this.isBuildMode=true;
                this.bigStoneTransparent.alpha=0.0;
                this.fireTransparent.alpha=0.0;
                this.spikeTransparent.alpha=0.5;
                this.stoneTransparent.alpha=0.0;
            }
            else
            {
                Builder.showbuildFailMsg.play();
            }
            this.selectionWindowDown.play();
            this.explanationWindowHide.play();
        });
        spikeTowerSelectionImg.on("pointermove",()=>{this.spikeExplane.setAlpha(1.0);});
        spikeTowerSelectionImg.on("pointerout",()=>{this.spikeExplane.setAlpha(0.0);});

        
        this.selectionWindowContainer.add(spikeTowerSelectionImg);
        let stoneTowerSelectionImg=Builder.scene.add.image(125,0,ImageKeys.STONETOWER1).setScale(0.5,0.5);
        stoneTowerSelectionImg.setInteractive();
        stoneTowerSelectionImg.on("pointerdown",()=>
        {
            this.BuildTowerKey=TowerKeys.STONETOWER1;
            if(Tower.scene.curMoney-TowerDataTable[this.BuildTowerKey]['price']>=0)
            {
                this.isBuildMode=true;
                this.bigStoneTransparent.alpha=0.0;
                this.fireTransparent.alpha=0.0;
                this.spikeTransparent.alpha=0.0;
                this.stoneTransparent.alpha=0.5;
            }
            else
            {
                Builder.showbuildFailMsg.play();
            }
            this.selectionWindowDown.play();
            this.explanationWindowHide.play();
        });        
        stoneTowerSelectionImg.on("pointermove",()=>{this.stoneExplane.setAlpha(1.0);});
        stoneTowerSelectionImg.on("pointerout",()=>{this.stoneExplane.setAlpha(0.0);});


        this.selectionWindowContainer.add(stoneTowerSelectionImg);

        this.createTweens();

        let buildButtonUp = Builder.scene.add.image(55,Builder.scene.scale.height-50,ImageKeys.BUILDBUTTONUP).setScale(0.8,0.8);
        buildButtonUp.depth=2.0;
        buildButtonUp.setInteractive();
        buildButtonUp.on("pointerdown",()=>{buildButtonUp.depth=1.0;buildButtonDown.depth=2.0;});

        let buildButtonDown = Builder.scene.add.image(55,Builder.scene.scale.height-48,ImageKeys.BUILDBUTTONDOWN).setScale(0.8,0.8);
        buildButtonDown.depth=1.0;
        buildButtonDown.setInteractive();
        buildButtonDown.on("pointerout",()=>{buildButtonUp.depth=2.0;buildButtonDown.depth=1.0;});
        buildButtonDown.on("pointerup",()=>{
            buildButtonUp.depth=2.0;buildButtonDown.depth=1.0;this.selectionWindowUp.play();this.selectionWindowContainer.depth=3.0;
            this.explanationWindowShow.play();
        });

        this.bigStonePriceText = Builder.scene.add.text(-140,30, TowerDataTable[TowerKeys.BIGSTONETOWER1]["price"]).setDepth(10.0);
        this.bigStonePriceText.setFontSize(20);
        this.bigStonePriceText.setColor("gold");
        this.selectionWindowContainer.add(this.bigStonePriceText);

        this.firePriceText = Builder.scene.add.text(-55,30, TowerDataTable[TowerKeys.FIRETOWER1]["price"]).setDepth(10.0);
        this.firePriceText.setFontSize(20);
        this.firePriceText.setColor("gold");
        this.selectionWindowContainer.add(this.firePriceText);
        
        this.spikePriceText = Builder.scene.add.text(25,30, TowerDataTable[TowerKeys.SPIKETOWER1]["price"]).setDepth(10.0);
        this.spikePriceText.setFontSize(20);
        this.spikePriceText.setColor("gold");
        this.selectionWindowContainer.add(this.spikePriceText);

        this.stonePriceText = Builder.scene.add.text(110,30, TowerDataTable[TowerKeys.STONETOWER1]["price"]).setDepth(10.0);
        this.stonePriceText.setFontSize(20);
        this.stonePriceText.setColor("gold");
        this.selectionWindowContainer.add(this.stonePriceText);

        
        Builder.scene.input.on("pointermove",(pointer)=>
        {
            if(this.isBuildMode)
            {
                let find=false;
                for(let i=0;i<Builder.scene.tileHeight;++i)
                {
                    for(let j=0;j<Builder.scene.tileWidth;++j)
                    {
                        if((j*Builder.tileSizeWidth<=pointer.x&&pointer.x<=(j+1)*Builder.tileSizeWidth)&&
                        (i*Builder.tileSizeHeight<=pointer.y&&pointer.y<=(i+1)*Builder.tileSizeHeight))
                        {
                            if(Builder.scene.tileMap[i][j]==0)
                            {
                                this.bigStoneTransparent.setTint(0x228B22);
                                this.fireTransparent.setTint(0x228B22);
                                this.spikeTransparent.setTint(0x228B22);
                                this.stoneTransparent.setTint(0x228B22);
                                this.canBuild=true;
                            }
                            else
                            {
                                this.bigStoneTransparent.setTint(0xff0000);
                                this.fireTransparent.setTint(0xff0000);
                                this.spikeTransparent.setTint(0xff0000);
                                this.stoneTransparent.setTint(0xff0000);
                                this.canBuild=false;
                            }
                            this.bigStoneTransparent.x=j*Builder.tileSizeWidth+Builder.tileSizeWidth/2;
                            this.bigStoneTransparent.y=i*Builder.tileSizeHeight+Builder.tileSizeHeight/2;
                            this.fireTransparent.x=j*Builder.tileSizeWidth+Builder.tileSizeWidth/2;
                            this.fireTransparent.y=i*Builder.tileSizeHeight+Builder.tileSizeHeight/2;
                            this.spikeTransparent.x=j*Builder.tileSizeWidth+Builder.tileSizeWidth/2;
                            this.spikeTransparent.y=i*Builder.tileSizeHeight+Builder.tileSizeHeight/2;
                            this.stoneTransparent.x=j*Builder.tileSizeWidth+Builder.tileSizeWidth/2;
                            this.stoneTransparent.y=i*Builder.tileSizeHeight+Builder.tileSizeHeight/2;
                            this.towerCoordX=j*Builder.tileSizeWidth+Builder.tileSizeWidth/2;
                            this.towerCoordY=i*Builder.tileSizeHeight+Builder.tileSizeHeight/2;
                            find=true;
                            break;
                        }
                    }
                    if(find) break;
                }
            }
        });

        Builder.scene.input.on("pointerdown",(pointer)=>
        {
            if(this.isBuildMode&&pointer.leftButtonDown()&&this.canBuild)
            {
                if(Tower.scene.curMoney-TowerDataTable[this.BuildTowerKey]['price']>=0)
                {
                    Tower.scene.curMoney-=TowerDataTable[this.BuildTowerKey]['price'];
                    Tower.scene.moneyText.setText(Tower.scene.curMoney);
                    let i=(this.towerCoordY-Builder.tileSizeHeight/2)/Builder.tileSizeHeight;
                    let j=(this.towerCoordX-Builder.tileSizeWidth/2)/Builder.tileSizeWidth;
                    Tower.scene.tileMap[i][j]=2;
                    Tower.scene.towerArr.push(new Tower(this.towerCoordX,this.towerCoordY,this.BuildTowerKey,Tower.scene.towerArr.length,i,j));
                    this.isBuildMode=false;
                    this.canBuild=false;
                    this.bigStoneTransparent.alpha=0;
                    this.fireTransparent.alpha=0;
                    this.spikeTransparent.alpha=0;
                    this.stoneTransparent.alpha=0;
                }
            }
        })

        Builder.scene.input.keyboard.on('keydown_ESC', ()=>{
            if(this.isBuildMode)
            {
                this.isBuildMode=false;
                this.canBuild=false;
                this.bigStoneTransparent.alpha=0;
                this.fireTransparent.alpha=0;
                this.spikeTransparent.alpha=0;
                this.stoneTransparent.alpha=0;
            }
        }, Builder.scene);
        }





    
    createTweens()
    {
        this.selectionWindowUp=Builder.scene.add.tween(
            {
                targets:this.selectionWindowContainer,
                y:Builder.scene.scale.height-60,
                duration:450,
                ease: 'Bounce'
            });
        this.selectionWindowUp.pause();

        this.selectionWindowDown=Builder.scene.add.tween(
            {
                targets:this.selectionWindowContainer,
                y:Builder.scene.scale.height+60,
                duration:300,
                ease: 'Sine.easeIn'
            });
        this.selectionWindowDown.pause();

        this.explanationWindowShow=Builder.scene.add.tween(
            {
                targets:this.explainWindow,
                x:Builder.scene.scale.width-160,
                duration:350,
                ease: 'Bounce'
            }
        );
        this.explanationWindowShow.pause();

        this.explanationWindowHide=Builder.scene.add.tween(
            {
                targets:this.explainWindow,
                x:Builder.scene.scale.width+700,
                duration:350,
                ease: 'Sine.easeIn'
            }
        )
        this.explanationWindowHide.pause();
        
        Builder.showbuildFailMsg=Builder.scene.add.tween(
            {
                targets:Builder.failText,
                alpha:1.0,
                duration:1000,
                ease: 'Sine.easeInOut',
                onComplete:()=>{Builder.failText.alpha=0.0;}
            }
        )
        Builder.showbuildFailMsg.pause();
    }
}