import Phaser, { Math } from "phaser"
import ImageKeys from "../Keys/ImageKeys"
import TowerDataTable from "../dataTable/TowerDataTable"
import Enemy from "../classes/Enemy"
import Bullet from "../classes/Bullet"
import Builder from "../classes/Builder"
import SoundKeys from '~/Keys/SoundKeys'

export default class Tower
{
    private attackPower;
    private range;
    private attackRate;
    private attackCooltime;
    private hasTarget=false;
    private isButtonShowed=false;
    private boolTemp=false;
    private bulletScale;
    private bulletRad;
    private index;
    private i;
    private j;
    private upgradeKey;
    private upgradeFee;
    private AccelerationFactor=1;

    private collisionCircle!:Phaser.Geom.Circle; 
    private towerImage!:Phaser.GameObjects.Image;
    private demolButton!:Phaser.GameObjects.Image;
    private upgradeButton!:Phaser.GameObjects.Image;
    private upgradePriceText!:Phaser.GameObjects.Text;
    
    private targetEnemy!:Enemy;
    
    private collisionCircleDebug!:Phaser.GameObjects.Graphics;
    private bulletImageKey;
    

    private showDemolButtonTween!:Phaser.Tweens.Tween;
    private showUpgradeButtonTween!:Phaser.Tweens.Tween;
    private hideDemolButtonTween!:Phaser.Tweens.Tween;
    private hideUpgradeButtonTween!:Phaser.Tweens.Tween;
    private fireSound!:Phaser.Sound.BaseSound;
    

    static scene:Phaser.Scene;
    

    constructor(x,y,key,index,i,j)
    {
        this.fireSound=Tower.scene.sound.add(SoundKeys.TOWERSOUND,{volume:0.2});
        
        this.attackPower=TowerDataTable[key]["attackPower"];
        this.range=TowerDataTable[key]["range"];
        this.attackRate=TowerDataTable[key]["attackRate"];
        this.attackCooltime=0;
        this.index=index;
        this.i=i;
        this.j=j;
        this.upgradeKey=TowerDataTable[key]["upgradeKey"];
        this.upgradeFee=TowerDataTable[key]["upgradeFee"];

        this.upgradePriceText=Tower.scene.add.text(100,100,this.upgradeFee.toString()).setDepth(4.0)
        this.upgradePriceText.setAlpha(0.0);
        this.upgradePriceText.setScale(1.2);
        this.upgradePriceText.setFont("bold");
        this.upgradePriceText.setColor("yellow");

        this.towerImage = Tower.scene.add.image(x,y,TowerDataTable[key]["towerImage"]).setScale(0.25,0.25);
        this.towerImage.setInteractive();
        this.towerImage.on("pointerdown",()=>{console.log("one");this.showDemolButtonTween.play();this.showUpgradeButtonTween.play();this.isButtonShowed=true;
        this.boolTemp=true;this.demolButton.setInteractive();this.upgradeButton.setInteractive();this.collisionCircleDebug.alpha=1.0;});
        //타워를 누르면 타워 주변에 업그레이드 버튼과 철거 버튼이 등장한다.
        this.demolButton=Tower.scene.add.image(x,y,ImageKeys.DEMOLITIONBUTTONDOWN).setAlpha(0.0).setScale(0.5,0.5).setDepth(4.0);
        this.demolButton.on("pointerdown",()=>
        {
            Tower.scene.towerArr[this.index]=null;
            Tower.scene.tileMap[this.i][this.j]=0;
            this.towerImage.destroy();
            this.demolButton.destroy();
            this.upgradeButton.destroy();
            this.collisionCircleDebug.destroy();
            this.upgradePriceText.destroy();
            this.fireSound.destroy();
        });

        this.upgradeButton=Tower.scene.add.image(x,y,ImageKeys.UPGRADEBUTTONDOWN).setAlpha(0.0).setScale(0.5,0.5).setDepth(4.0);
        this.upgradeButton.on("pointerdown",()=>
        {
            if(this.upgradeKey!=="NONE")
            {
                if(Tower.scene.curMoney-this.upgradeFee>=0)
                {
                    let x=this.towerImage.x;
                    let y=this.towerImage.y;
                    this.towerImage.destroy();
                    this.towerImage=Tower.scene.add.image(x,y,TowerDataTable[this.upgradeKey]["towerImage"]).setScale(0.25,0.25);
                    Tower.scene.curMoney-=this.upgradeFee;
                    Tower.scene.moneyText.setText(Tower.scene.curMoney.toString());
                    this.upgradeFee=TowerDataTable[this.upgradeKey]["upgradeFee"];
                    this.attackPower=TowerDataTable[this.upgradeKey]["attackPower"];
                    this.range=TowerDataTable[this.upgradeKey]["range"];
                    this.attackRate=TowerDataTable[this.upgradeKey]["attackRate"];
                    this.upgradeKey=TowerDataTable[this.upgradeKey]["upgradeKey"];
                    this.collisionCircle.radius=this.range;
                    this.collisionCircleDebug.destroy();
                    this.collisionCircleDebug=Tower.scene.add.graphics();
                    this.collisionCircleDebug.lineStyle(2, 0x00ff00);
                    this.collisionCircleDebug.strokeCircleShape(this.collisionCircle);
                    this.collisionCircleDebug.alpha=0.0;
                    
                    console.log(this.upgradeKey,this.upgradeFee);
                    this.towerImage.setInteractive();
                    this.upgradePriceText.setText(this.upgradeFee.toString());
                    this.towerImage.on("pointerdown",()=>{console.log("one");this.showDemolButtonTween.play();this.showUpgradeButtonTween.play();this.isButtonShowed=true;
                    this.boolTemp=true;this.demolButton.setInteractive();this.upgradeButton.setInteractive();this.collisionCircleDebug.alpha=1.0;});
                }
                else
                {
                    Builder.showbuildFailMsg.play();
                }
            }
            if(this.upgradeKey==="NONE")
                this.upgradeFee=0;
        });

        this.bulletImageKey=TowerDataTable[key]["bulletImage"];
        this.bulletScale=TowerDataTable[key]["bulletScale"];
        this.bulletRad=TowerDataTable[key]["bulletRad"];
        this.collisionCircle=new Phaser.Geom.Circle(x,y,this.range);

        this.collisionCircleDebug=Tower.scene.add.graphics();
        this.collisionCircleDebug.lineStyle(2, 0x00ff00);
        this.collisionCircleDebug.strokeCircleShape(this.collisionCircle);
        this.collisionCircleDebug.alpha=0.0;
        this.createTween();
        Tower.scene.input.on("pointerdown",()=>
        {
            if(!this.isButtonShowed&&this.boolTemp)
            {
                this.hideDemolButtonTween.play();
                this.hideUpgradeButtonTween.play();
                this.boolTemp=false;
                this.collisionCircleDebug.alpha=0.0;
            }
            this.isButtonShowed=false;
        });
    }

    update(elapsedTime)
    {
        if(!this.hasTarget)
        {
            let closestIndex=99999999;
            let distance=99999999;
            for(let i=0;i<Tower.scene.enemyArr.length;++i)
            {
                if(Tower.scene.enemyArr[i]!=null&&Tower.scene.enemyArr[i].getIsAlive())
                {
                    if(Phaser.Geom.Intersects.CircleToCircle(this.collisionCircle,Tower.scene.enemyArr[i].getCollisionCircle()))
                    {
                        let temp=Tower.scene.enemyArr[i].getCollisionCircle();
                        let tempDist=(this.towerImage.x-temp.x)**2+(this.towerImage.y-temp.y)**2;
                        if(tempDist<distance)
                        {
                            distance=tempDist;
                            closestIndex=i;
                        }
                    }
                }
            }
            if(closestIndex!==99999999)
            {
                this.hasTarget=true;
                this.targetEnemy=Tower.scene.enemyArr[closestIndex];
                Tower.scene.enemyArr[closestIndex].setTower(this);
                console.log("Setting Target!");
            }
        }
        else
        {
            if(this.attackCooltime<=0.0)
            {
                this.attackCooltime=this.attackRate;
                Tower.scene.bulletArr.push(new Bullet(33,this.attackPower,this.targetEnemy,this.bulletImageKey,this.towerImage.x,this.towerImage.y,
                    this.bulletScale,this.bulletRad));
                if(!this.fireSound.isPlaying)
                    this.fireSound.play();
            }
        }
        this.attackCooltime-=elapsedTime*this.AccelerationFactor;
        //타겟이 있는 경우 총알을 쏜다.
    }
    
    getCollisionCircle()
    {
        return this.collisionCircle;
    }

    setHasTarget(hasTarget)
    {
        this.hasTarget=hasTarget;
    }

    setAccelerationFactor(factor)
    {
        this.AccelerationFactor=factor;
    }

    createTween()
    {
        this.showDemolButtonTween=Tower.scene.add.tween(
            {
                targets:this.demolButton,
                y:this.towerImage.y+50,
                alpha:1.0,
                duration:300,
                ease: 'Sine.easeInOut'
            }
        )
        this.showDemolButtonTween.pause();
        
        this.showUpgradeButtonTween=Tower.scene.add.tween(
            {
                targets:this.upgradeButton,
                y:this.towerImage.y-50,
                alpha:1.0,
                duration:300,
                ease: 'Sine.easeInOut',
                onComplete:()=>{this.upgradePriceText.setAlpha(1.0); this.upgradePriceText.x=this.towerImage.x-10; this.upgradePriceText.y=this.towerImage.y-100;}
            }
        )
        this.showUpgradeButtonTween.pause();
        
        this.hideDemolButtonTween=Tower.scene.add.tween(
            {
                targets:this.demolButton,
                y:this.towerImage.y,
                alpha:0,
                duration:300,
                ease: 'Sine.easeInOut'
            }
        )
        this.hideDemolButtonTween.pause();

        this.hideUpgradeButtonTween=Tower.scene.add.tween(
            {
                onUpdate:()=>{this.upgradePriceText.setAlpha(0.0); this.upgradePriceText.x=this.towerImage.x-10; this.upgradePriceText.y=this.towerImage.y-100;},
                targets:this.upgradeButton,
                y:this.towerImage.y,
                alpha:0,
                duration:300,
                ease: 'Sine.easeInOut'
            }
        )
        this.hideUpgradeButtonTween.pause();
    }
}