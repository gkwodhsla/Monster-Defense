import Phaser from "phaser"
import Enemy from "../classes/Enemy"
import ImageKeys from '~/Keys/ImageKeys';

export default class Bullet
{
    private destroyMark=false;
    private velocity=0.5;
    private angularVelocity=0.1;
    private attackPower;
    private AccelerationFactor=1;


    private bulletImage!:Phaser.GameObjects.Image;
    private bulletImageKey!:ImageKeys;
    private CollisionCircle!:Phaser.Geom.Circle;
    private targetEnemy!:Enemy
    private bulletDir!:Phaser.Math.Vector2;

    static scene:Phaser.Scene;

    constructor(velocity, attackPower, enemyClass, bulletImageKey, x, y, scale, circleRad)
    {
        //this.velocity=velocity;
        this.attackPower=attackPower;
        this.targetEnemy=enemyClass;
        this.bulletImage=Bullet.scene.add.image(x,y,bulletImageKey).setScale(scale,scale);
        this.bulletImageKey=bulletImageKey;
        this.CollisionCircle=new Phaser.Geom.Circle(x,y,circleRad);
        this.bulletDir=new Phaser.Math.Vector2(0,0);
    }

    update(elapsedTime)
    {
        let enemyCollisionCircle=this.targetEnemy.getCollisionCircle();
        this.bulletDir.x=enemyCollisionCircle.x-this.bulletImage.x;
        this.bulletDir.y=enemyCollisionCircle.y-this.bulletImage.y;
        this.bulletDir.normalize();

        this.bulletImage.x+=this.bulletDir.x*this.velocity*elapsedTime*this.AccelerationFactor;
        this.bulletImage.y+=this.bulletDir.y*this.velocity*elapsedTime*this.AccelerationFactor;
        this.CollisionCircle.x=this.bulletImage.x;
        this.CollisionCircle.y=this.bulletImage.y;
        this.bulletImage.rotation+=this.angularVelocity;

        if(Phaser.Geom.Intersects.CircleToCircle(this.CollisionCircle, enemyCollisionCircle))
        {
            this.targetEnemy.declineHP(this.attackPower);
            if(this.bulletImageKey===ImageKeys.SPIKEBULLET)
                this.targetEnemy.activateDebuf();
            if(this.bulletImageKey===ImageKeys.BIGSTONEBULLET)
            {
                for(let i=0;i<Bullet.scene.enemyArr.length;++i)
                {
                    if(Bullet.scene.enemyArr[i]!==null)
                    {
                        if(Phaser.Geom.Intersects.CircleToCircle(this.CollisionCircle, Bullet.scene.enemyArr[i].getCollisionCircle()))
                        {
                            Bullet.scene.enemyArr[i].declineHP(this.attackPower);
                        }
                    }
                }
            }
            //만약 큰 돌 타워라면 주변적에게 데미지를 같이 입힌다.
            this.destroyMark=true;
        }
    }

    getDestroyMark()
    {
        return this.destroyMark;
    }

    destroyBulletImg()
    {
        this.bulletImage.destroy();
    }

    setAccelerationFactor(factor)
    {
        this.AccelerationFactor=factor;
    }
}