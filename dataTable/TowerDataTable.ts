import ImageKeys from "../Keys/ImageKeys"
import TowerKeys from "../Keys/TowerKeys"

const TowerDataTable={
    "BigStoneTower1":{"attackPower":30,"range":90,"attackRate":1000,"price":200,"towerImage":ImageKeys.BIGSTONETOWER1,"bulletImage":ImageKeys.BIGSTONEBULLET,
    "bulletScale":0.8,"bulletRad":40,"upgradeKey":TowerKeys.BIGSTONETOWER2,"upgradeFee":350},
    "BigStoneTower2":{"attackPower":35,"range":130,"attackRate":900,"price":100,"towerImage":ImageKeys.BIGSTONETOWER2,"bulletImage":ImageKeys.BIGSTONEBULLET,
    "bulletScale":0.8,"bulletRad":40,"upgradeKey":TowerKeys.BIGSTONETOWER3,"upgradeFee":650},
    "BigStoneTower3":{"attackPower":40,"range":180,"attackRate":700,"price":100,"towerImage":ImageKeys.BIGSTONETOWER3,"bulletImage":ImageKeys.BIGSTONEBULLET,
    "bulletScale":0.8,"bulletRad":40,"upgradeKey":"NONE","upgradeFee":0},
    "FireTower1":{"attackPower":150,"range":120,"attackRate":1500,"price":400,"towerImage":ImageKeys.FIRETOWER1,"bulletImage":ImageKeys.FIREBULLET,
    "bulletScale":0.5,"bulletRad":30,"upgradeKey":TowerKeys.FIRETOWER2,"upgradeFee":750},
    "FireTower2":{"attackPower":200,"range":180,"attackRate":1500,"price":100,"towerImage":ImageKeys.FIRETOWER2,"bulletImage":ImageKeys.FIREBULLET,
    "bulletScale":0.5,"bulletRad":30,"upgradeKey":TowerKeys.FIRETOWER3,"upgradeFee":1400},
    "FireTower3":{"attackPower":250,"range":240,"attackRate":1500,"price":100,"towerImage":ImageKeys.FIRETOWER3,"bulletImage":ImageKeys.FIREBULLET,
    "bulletScale":0.5,"bulletRad":30,"upgradeKey":"NONE","upgradeFee":0},
    "SpikeTower1":{"attackPower":5,"range":160,"attackRate":2000,"price":100,"towerImage":ImageKeys.SPIKETOWER1,"bulletImage":ImageKeys.SPIKEBULLET,
    "bulletScale":1,"bulletRad":20,"upgradeKey":TowerKeys.SPIKETOWER2,"upgradeFee":250},
    "SpikeTower2":{"attackPower":5,"range":220,"attackRate":2000,"price":100,"towerImage":ImageKeys.SPIKETOWER2,"bulletImage":ImageKeys.SPIKEBULLET,
    "bulletScale":1,"bulletRad":20,"upgradeKey":TowerKeys.SPIKETOWER3,"upgradeFee":500},
    "SpikeTower3":{"attackPower":5,"range":320,"attackRate":2000,"price":100,"towerImage":ImageKeys.SPIKETOWER3,"bulletImage":ImageKeys.SPIKEBULLET,
    "bulletScale":1,"bulletRad":20,"upgradeKey":"NONE","upgradeFee":0},
    "StoneTower1":{"attackPower":10,"range":120,"attackRate":1000,"price":50,"towerImage":ImageKeys.STONETOWER1,"bulletImage":ImageKeys.STONEBULLET,
    "bulletScale":0.5,"bulletRad":20,"upgradeKey":TowerKeys.STONETOWER2,"upgradeFee":150},
    "StoneTower2":{"attackPower":10,"range":160,"attackRate":700,"price":100,"towerImage":ImageKeys.STONETOWER2,"bulletImage":ImageKeys.STONEBULLET,
    "bulletScale":0.5,"bulletRad":20,"upgradeKey":TowerKeys.STONETOWER3,"upgradeFee":400},
    "StoneTower3":{"attackPower":10,"range":200,"attackRate":300,"price":100,"towerImage":ImageKeys.STONETOWER3,"bulletImage":ImageKeys.STONEBULLET,
    "bulletScale":0.5,"bulletRad":20,"upgradeKey":"NONE","upgradeFee":0}
};
export default  TowerDataTable;



//돌 타워는 일반적인 타워임
//스파이크 타워는 출혈효과를 입힘
//파이어타워는 단일 대상에게 엄청난 데미지를 줌
//큰 돌 타워는 다수의 적에게 데미지를 줌


//큰돌은 스케일을 0.8 rad는 40으로한다. 큰돌은 적 여러명에게 큰 데미지를 입힌다. 발사속도가 제일 느리다.
//파이어볼은 스케일을 0.5로 rad는 30으로 한다.
//스파이크볼은 스케일은 그대로하고 rad는 20으로 한다.
//돌은 스케일을 0.5로 rad는 20으로 한다. 딱히 주는 효과는 없다. 공격력은 약하지만 공격속도가 매우빠르다.