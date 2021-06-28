import Phaser, { Tweens, Geom } from "phaser"
import EnemyDataTable from "../dataTable/EnemyDataTable"
import AnimKey from "../Keys/AnimKeys"
import Tower from "../classes/Tower"
//적은 자신만의 
//1. 트윈 애니메이션(길 따라가는거)
//2. 이동속도, 체력

export default class Enemy
{
    private destroyMark=false;
    private isAlive=true;
    private isDeathAnimPlay=false;
    private targeted=false;
    private hp;
    private velocity;
    private collisionRad=24;
    private follower={t:0,vec:new Phaser.Math.Vector2()};
    private runImage!:Phaser.GameObjects.Sprite;
    private runAnimKey;
    private deathAnimKey;
    private tweenAnim!: Tweens.Tween;
    private collisionCircle!:Phaser.Geom.Circle;
    //private collisionCircleDebug!:Phaser.GameObjects.Graphics;
    private TowersTargetingMe=[];
    private isBleedingDebuf=false;
    private debufTime=0.0;
    private bleedingDmg=0.5;
    private deathSound!:Phaser.Sound.BaseSound;

    static scene: Phaser.Scene;
    static path: Phaser.Curves.Path;
    constructor(key)
    {
        this.hp=EnemyDataTable[key]["hp"];
        this.velocity=EnemyDataTable[key]["velocity"];
        this.deathSound=Enemy.scene.sound.add(EnemyDataTable[key]["soundKey"],{volume:1.2});
        this.runImage=Enemy.scene.add.sprite(60,0,EnemyDataTable[key]["runImage"],0);
       
        //death 애니메이션은 객체의 hp가 0일때 실행시킨다.
        console.log(EnemyDataTable[key]["runAnimKey"]);
        this.runAnimKey=EnemyDataTable[key]["runAnimKey"];
        this.deathAnimKey=EnemyDataTable[key]["DeathAnimKey"];
        this.runImage.play(this.runAnimKey);
        this.collisionCircle=new Phaser.Geom.Circle(60,0,this.collisionRad);
        //this.collisionCircleDebug=Enemy.scene.add.graphics();
        
        this.tweenAnim=Enemy.scene.add.tween(
            {
                targets: this.follower,
                t: 1,
                ease: 'Linear',
                duration: this.velocity,
                repeat:0,
                onComplete:()=>{
                    this.destroyMark=true;
                    // if (this.isAlive)
                    //     this.runImage.destroy();
                    // else
                    //     this.deathImage.destroy();
                }
            }
            );
    }
    update(time)
    {
        if (!this.isAlive)
        {
            if(!this.isDeathAnimPlay)
            {
                this.deathSound.play();
                this.runImage.play(this.deathAnimKey,false);
                this.runImage.on('animationcomplete',()=>{this.destroyMark=true;}); 
                this.isDeathAnimPlay=true;
            }
        }
        //만약 죽은 상태라면 죽음 애니메이션을 플레이 시키고 죽음 사운드를 플레이.
        //this.collisionCircleDebug.clear();

        if(this.isAlive)
        {
            if(this.isBleedingDebuf)
            {
                this.debufTime+=time;
                this.declineHP(this.bleedingDmg);
            }
            if(this.debufTime>=1500)
            {
                this.debufTime=0.0;
                this.isBleedingDebuf=false;
                this.runImage.setTint(0xffffff);
            }
            Enemy.path.getPoint(this.follower.t, this.follower.vec);

     
            this.runImage.x=this.follower.vec.x;
            this.runImage.y=this.follower.vec.y;
            //this.collisionCircleDebug.lineStyle(2, 0xffff00);
            this.collisionCircle.x=this.follower.vec.x;
            this.collisionCircle.y=this.follower.vec.y;
            //this.collisionCircleDebug.strokeCircleShape(this.collisionCircle);
            
            
            for(let i=0;i<this.TowersTargetingMe.length;++i)
            {
                if(this.TowersTargetingMe[i])
                {
                    if(!Phaser.Geom.Intersects.CircleToCircle(this.collisionCircle, this.TowersTargetingMe[i].getCollisionCircle()))
                    {
                        this.TowersTargetingMe[i].setHasTarget(false);
                        this.TowersTargetingMe.splice(i,1);
                        console.log("end overlap!!!");
                        break;
                    }
                }
            }
        }
        //만약 자신을 지목한 타워와 더 이상 겹치지 않는다면 더 이상 타겟된 상태가 아님.
        //적 자체는 여러 타워에 지목될 수 있음.
        //만약 객체가 타워의 공격범위를 벗어나면 타워에게 새로운 타겟을 찾으라고 알려줌.(setHasTarget)
    }

    

    getDestroyMark()
    {
        return this.destroyMark;
    }

    getIsAlive()
    {
        return this.isAlive;
    }

    getCollisionCircle()
    {
        return this.collisionCircle;
    }

    setTower(tower)
    {
        this.TowersTargetingMe.push(tower);
    }

    setTweenTimeScale(timeScale)
    {
        this.tweenAnim.setTimeScale(timeScale);
        if(timeScale===2)
            this.bleedingDmg=1;
        else this.bleedingDmg=0.5;
    }

    destroyAsset()
    {
        this.runImage.destroy();
        //this.collisionCircleDebug.destroy();
        this.deathSound.destroy();
    }

    declineHP(hp)
    {
        this.hp-=hp;
        if(this.hp<=0.0)
        {
            this.isAlive=false;
            for(let i=0;i<this.TowersTargetingMe.length;++i)
            {
                this.TowersTargetingMe[i].setHasTarget(false);
            }
        }
    }

    activateDebuf()
    {
        this.runImage.setTint(0xff0000);
        this.isBleedingDebuf=true;
    }
}