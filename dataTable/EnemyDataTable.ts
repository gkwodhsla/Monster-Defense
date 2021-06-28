import ImageKeys from "../Keys/ImageKeys"
import AnimKeys from "../Keys/AnimKeys"
import SoundKeys from "../Keys/SoundKeys"
import EnemyKeys from "../Keys/EnemyKeys"

const EnemyDataTable={
    "enemyFly":{"hp":30,"velocity":15000,"runImage":ImageKeys.FLYRUN,"deathImage":ImageKeys.FLYDEATH,"runAnimKey":AnimKeys.FLYRUNANIM,"DeathAnimKey":AnimKeys.FLYDEATHANIM,
    "soundKey":SoundKeys.BATDIESOUND},
    "enemyGoblin":{"hp":200,"velocity":30000,"runImage":ImageKeys.GOBLINRUN,"deathImage":ImageKeys.GOBLINDEATH,"runAnimKey":AnimKeys.GOBLINRUNANIM,"DeathAnimKey":AnimKeys.GOBLINDEATHANIM,
    "soundKey":SoundKeys.MONSTERDIESOUND},
    "enemyMartial":{"hp":150,"velocity":9000,"runImage":ImageKeys.MARTIALRUN,"deathImage":ImageKeys.MARTIALDEATH,"runAnimKey":AnimKeys.MARTIALRUNANIM,"DeathAnimKey":AnimKeys.MARTIALDEATHANIM,
    "soundKey":SoundKeys.MARTIALDIESOUND},
    "enemyMush":{"hp":1000,"velocity":55000,"runImage":ImageKeys.MUSHRUN,"deathImage":ImageKeys.MUSHDEATH,"runAnimKey":AnimKeys.MUSHRUNANIM,"DeathAnimKey":AnimKeys.MUSHDEAETHANIM,
    "soundKey":SoundKeys.MONSTERDIESOUND},
    "enemySkeleton":{"hp":350,"velocity":28000,"runImage":ImageKeys.SKELETONRUN,"deathImage":ImageKeys.SKELETONDEATH,"runAnimKey":AnimKeys.SKELETONRUNANIM,"DeathAnimKey":AnimKeys.SKELETONDEATHANIM,
    "soundKey":SoundKeys.MONSTERDIESOUND}
};

export default  EnemyDataTable;

//날아다니는 몬스터는 속도가 빠르다. 대신 피통이 적다
//고블린은 딱 중간 정도의 몬스터이다.
//마셜맨은 속도도 빠르지만 피통도 적지 않다.
//버섯맨은 속도는 느리지만 피통이 어마어마하다.
//스켈레톤은 고블린 보다 피통이 많다.