import Phaser, { NONE, Math } from 'phaser'
import ImageKeys from '../Keys/ImageKeys'
import AnimKeys from '../Keys/AnimKeys'
import SceneKeys from '../Keys/SceneKeys'
import SoundKeys from '../Keys/SoundKeys'
import EnemyKeys from '../Keys/EnemyKeys'
import TowerKeys from '../Keys/TowerKeys'
import Enemy from '../classes/Enemy'
import Tower from '../classes/Tower'
import Bullet from '../classes/Bullet'
import Builder from '../classes/Builder'


export default class MainGame extends Phaser.Scene
{   
    tempTime=0.0;
    accTime=0.0;
    path;
    tileMap;
    enemyArr=[];
    towerArr=[];
    bulletArr=[];
    private tileWidth=20;
    private tileHeight=15;
    curMoney=100;
    curLife;
    private isAccelMode=false;
    private currentWaveMaxEnemy=1;
    //웨이브 맥시멈 에너미는 2n-1씩 늘어난다.
    //초기에는 약한 적 위주로 나온다. 하지만 갈수록 강한 놈들이 섞인다.
    private waveReward=100;
    //매 웨이브마다 5씩 증가한다.
    private spawnTime=1500;
    //매 10 웨이브마다 스폰타임이 100씩 감소한다.
    private currentWave=1;
    private isWaveRunning=false;
    private playButton!:Phaser.GameObjects.Image;
    private lifeText!:Phaser.GameObjects.Text;
    private moneyText!:Phaser.GameObjects.Text;
    private waveText!:Phaser.GameObjects.Text;

    private BGMusic!:Phaser.Sound.BaseSound;

    
    


    constructor()
    {
        super(SceneKeys.MAINGAME);
    }

    create()
    {
        this.BGMusic = this.sound.add(SoundKeys.BACKGROUNDSOUND,{loop:true,volume:0.1});
        this.BGMusic.play();
        this.tileMap=new Array(this.tileHeight);

        for(let i=0;i<this.tileHeight;++i)
        {
            this.tileMap[i]=new Array(this.tileWidth);
            this.tileMap[i].fill(0,0,this.tileWidth);
        }
        this.tempTime=0.0;
        this.accTime=0.0;
        this.enemyArr=[];
        this.towerArr=[];
        this.bulletArr=[];
        this.tileWidth=20;
        this.tileHeight=15;
        this.curMoney=100;
        this.curLife=30;
        this.currentWaveMaxEnemy=1;
        //웨이브 맥시멈 에너미는 2n-1씩 늘어난다.
        //초기에는 약한 적 위주로 나온다. 하지만 갈수록 강한 놈들이 섞인다.
        this.waveReward=100;
        //매 웨이브마다 6씩 증가한다.
        this.spawnTime=1500;
        //매 10 웨이브마다 스폰타임이 감소한다.
        this.currentWave=1;
        this.isWaveRunning=false;
        this.SetPath();
        let tileSizeWidth=this.scale.width/this.tileWidth;
        let tileSizeHeight=this.scale.height/this.tileHeight;

        for(let i=0;i<this.tileHeight;++i)
        {
            for(let j=0;j<this.tileWidth;++j)
            {
                let img;
                if(this.tileMap[i][j]==0)
                {
                    img = this.add.image(j*tileSizeWidth,i*tileSizeHeight,ImageKeys.GRASS);
                }
                else if(this.tileMap[i][j]==1)
                {
                    img = this.add.image(j*tileSizeWidth,i*tileSizeHeight,ImageKeys.SAND);
                }
                let ratioX=tileSizeWidth/img.width;
                let ratioY=tileSizeHeight/img.height;
                img.scaleX=ratioX;
                img.scaleY=ratioY;
                img.setOrigin(0.0,0.0);          
            }
        }
        //여기까지 맵 세팅
        this.path = new Phaser.Curves.Path(60, 0);
        this.path.lineTo(57, 459);
        this.path.lineTo(259, 461);
        this.path.lineTo(259, 177);
        this.path.lineTo(617,177);
        this.path.lineTo(617,579);
        //적이 지나다니는 path를 만든다.
        
        Enemy.scene=this;
        Enemy.path=this.path;
        //Enemy 클래스에서 전역적으로 사용하는 Scene과 Path를 초기화 해준다.
        Tower.scene=this;
        //Tower 클래스에서 전역적으로 사용하는 scene을 초기화 한다.
        Bullet.scene=this;
        //Bullet 클래스에서 전역적으로 사용하는 scene을 초기화 한다.
        
        this.add.image(this.scale.width-200,30,ImageKeys.HEART).setScale(0.1,0.1);
        this.add.image(this.scale.width-200,100,ImageKeys.GOLD).setScale(0.1,0.1);
        this.lifeText=this.add.text(this.scale.width-100,30,this.curLife.toString());
        
        this.lifeText.font = "Arial";
        this.lifeText.setOrigin(0.5, 0.5);
        this.lifeText.setFontSize(30);
        this.lifeText.setColor("red");
        this.moneyText= this.add.text(this.scale.width-100,100, this.curMoney.toString());
        this.moneyText.font = "Arial";
        this.moneyText.setOrigin(0.5, 0.5);
        this.moneyText.setFontSize(30);
        this.moneyText.setColor("gold");
        //돈, 생명력을 추가한다.

        Builder.scene=this;
        Builder.tileSizeWidth=tileSizeWidth;
        Builder.tileSizeHeight=tileSizeHeight;
        Builder.failText=this.add.text(300,500,"NOT ENOUGH MONEY!!!");
        Builder.failText.setFont("bold")
        Builder.failText.scale=1.2;
        Builder.failText.setColor("white");
        Builder.failText.alpha=0.0;

        let towerBuilder=new Builder();
        //타워 건설자를 추가한다.

        this.currentWave=1;
        this.playButton = this.add.image(this.scale.width/2,this.scale.height/2,ImageKeys.PLAYBUTTON).setDepth(10.0).setAlpha(1.0);
        this.playButton.setInteractive();
        this.playButton.on("pointerdown",()=>{this.isWaveRunning=true;this.playButton.alpha=0.0;this.waveText.setText("Wave: " + this.currentWave.toString());
            this.enemyArr=[];this.bulletArr=[];});
        //플레이버튼을 추가한다. 이 버튼을 누르면 새 웨이브가 시작된다.
        this.waveText = this.add.text(this.scale.width/2-100,0,"Wave: "+this.currentWave.toString());
        this.waveText.setFontSize(50);
        //현재 몇 번째 웨이브인지 알려준다.
        this.createDoubleSpeedSystem();
        //배속 시스템을 추가한다.
        
    }

    update(deltaTime)
    {
        let time=deltaTime-this.tempTime;
        if(this.isAccelMode)time*=2;
        //배속모드이면 시간이 2배가된다.
        this.tempTime=deltaTime;
        if(this.isWaveRunning)
        {
            this.accTime+=time;
            if(this.accTime>this.spawnTime && this.enemyArr.length<this.currentWaveMaxEnemy)
            {
                this.accTime=0.0;
                if(this.currentWave<4)
                    this.enemyArr.push(new Enemy(EnemyKeys.FLY));
                else if(4<=this.currentWave&&this.currentWave<9)
                {
                    let val=Math.Between(0,1);
                    if(val==0) this.enemyArr.push(new Enemy(EnemyKeys.FLY));
                    else this.enemyArr.push(new Enemy(EnemyKeys.GOBLIN));
                }
                else if(9<=this.currentWave&&this.currentWave<14)
                {
                    let val=Math.Between(0,2);
                    if(val==0) this.enemyArr.push(new Enemy(EnemyKeys.FLY));
                    else if(val==1)this.enemyArr.push(new Enemy(EnemyKeys.GOBLIN));
                    else this.enemyArr.push(new Enemy(EnemyKeys.SKELETON));
                }
                else if(14<=this.currentWave&&this.currentWave<20)
                {
                    let val=Math.Between(0,3);
                    if(val==0) this.enemyArr.push(new Enemy(EnemyKeys.FLY));
                    else if(val==1)this.enemyArr.push(new Enemy(EnemyKeys.GOBLIN));
                    else if(val==2)this.enemyArr.push(new Enemy(EnemyKeys.SKELETON));
                    else this.enemyArr.push(new Enemy(EnemyKeys.MARTIAL));
                }
                else
                {
                    let val=Math.Between(0,4);
                    if(val==0) this.enemyArr.push(new Enemy(EnemyKeys.FLY));
                    else if(val==1)this.enemyArr.push(new Enemy(EnemyKeys.GOBLIN));
                    else if(val==2)this.enemyArr.push(new Enemy(EnemyKeys.SKELETON));
                    else if(val==3)this.enemyArr.push(new Enemy(EnemyKeys.MARTIAL));
                    else this.enemyArr.push(new Enemy(EnemyKeys.MUSHROOM));
                }
            }

            for(let i=0;i<this.enemyArr.length;++i)
            {
                if(this.enemyArr[i]!==null)
                {
                    this.enemyArr[i].update(time);
                    if(this.isAccelMode) this.enemyArr[i].setTweenTimeScale(2);
                    else this.enemyArr[i].setTweenTimeScale(1);
                }
            }
            //적 배열을 순회하면서 null이 아니라면 업데이트를 호출한다.
            //만약 배속모드가 참이라면 길을 따라가는 트윈 애니메이션의 속도를 2배로 만들어준다.

            for(let i=0;i<this.enemyArr.length;++i)
            {
                if(this.enemyArr[i]!==null&&this.enemyArr[i].getDestroyMark())
                {
                    if(this.enemyArr[i].getIsAlive())
                    {
                        --this.curLife;
                        if(this.curLife<=0)
                        {
                            this.scene.start(SceneKeys.ENDGAME);
                            this.BGMusic.stop();
                        }
                    }
                    this.lifeText.setText(this.curLife.toString());
                    this.enemyArr[i].destroyAsset();
                    this.enemyArr[i]=null;
                }
            }
            //적 배열을 순회하다 만약에 적이 죽었다고 마킹되어있으면 사용하는 애셋을 날리고 null로 바꿔준다.

            let isAllEnemyEliminated=true;
            for(let i=0;i<this.enemyArr.length;++i)
            {
                if(this.enemyArr[i]!==null)
                {
                    isAllEnemyEliminated=false;
                    break;
                }
            }
            if(isAllEnemyEliminated&&this.enemyArr.length===this.currentWaveMaxEnemy)
            {
                this.isWaveRunning=false;
                this.playButton.alpha=1.0;
                this.curMoney+=this.waveReward;
                ++this.currentWave;
                this.waveReward+=6;
                this.currentWaveMaxEnemy=2*this.currentWave-1;
                this.moneyText.setText(this.curMoney.toString());
                if(this.spawnTime>700)
                    this.spawnTime-=50;
                // if(this.currentWave%10===0)
                //     this.spawnTime-=150;
            }
            //만약 적이 다 죽어서 배열이 전부 null이 되면 웨이브 보상을 지급하고
            //다음 웨이브 난이도를 세팅해준다.
        }
        //만약 웨이브가 진행중이고 적 배열의 렝스가 맥시멈 적 수 보다 적다면 계속해서 적을 스폰 해준다.

        
        
        for(let i=0;i<this.towerArr.length;++i)
        {
            if(this.towerArr[i]!==null)
            {
                this.towerArr[i].update(time);

            }
        }

        for(let i=0;i<this.bulletArr.length;++i)
        {
            if(this.bulletArr[i]!==null)
            {
                this.bulletArr[i].update(time);
                if(this.isAccelMode)this.bulletArr[i].setAccelerationFactor(2);
                else this.bulletArr[i].setAccelerationFactor(1);
            }
        }
        //총알을 순회하면서 null이 아니라면 업데이트 해준다.
        for(let i=0;i<this.bulletArr.length;++i)
        {
            if(this.bulletArr[i]!==null&&this.bulletArr[i].getDestroyMark())
            {
                this.bulletArr[i].destroyBulletImg();
                this.bulletArr[i]=null;
            }
        }
        //총알을 순회하면서 destoryMark가 되어있다면 제거한다.
    }

    SetPath()
    {
        for(let i=0;i<12;++i)
            this.tileMap[i][1]=1;
        for(let i=0;i<5;++i)
            this.tileMap[11][i+2]=1;
        for(let i=10;i>4;--i)
            this.tileMap[i][6]=1;
        for(let i=0;i<10;++i)
            this.tileMap[4][i+6]=1;
        for(let i=5;i<this.tileHeight;++i)
            this.tileMap[i][15]=1;
    }

    createDoubleSpeedSystem()
    {
        let normalSpeedButton = this.add.image(this.scale.width-40,50,ImageKeys.PLAYBUTTON).setScale(0.27);
        normalSpeedButton.setTint(0x00ffff)
        let doubleSpeedButton = this.add.image(this.scale.width-40,100,ImageKeys.ACCELBUTTON).setScale(0.3);
        normalSpeedButton.setInteractive();
        normalSpeedButton.on("pointerdown",()=>
        {
            this.isAccelMode=false;
            normalSpeedButton.setTint(0x00ffff)
            doubleSpeedButton.setTint(0xffffff);
        });
        doubleSpeedButton.setInteractive();
        doubleSpeedButton.on("pointerdown",()=>
        {
            this.isAccelMode=true;
            normalSpeedButton.setTint(0xffffff)
            doubleSpeedButton.setTint(0x00ffff);
        })
    }

    
}