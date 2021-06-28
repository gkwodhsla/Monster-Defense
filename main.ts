import Phaser, { Physics } from 'phaser'

import Loading from '../src/scenes/Loading'
import MainGame from '../src/scenes/MainGame'
import EndGame from '../src/Scenes/EndGame'
import PreLoading from '../src/Scenes/Preloading'

import 'phaser/plugins/spine/dist/SpinePlugin'

const config: Phaser.Types.Core.GameConfig=
{
    type:Phaser.AUTO,
    width: 800,
    height: 600,
    physics:
    {
        default:'arcade',
        arcade:
        {
            gravity:{y:200},
            debug: true
        }
    },
    scene: [PreLoading, Loading, MainGame, EndGame],
    plugins:{
        scene:[
            {
                key:'SpinePlugin',plugin: window.SpinePlugin,mapping:'spine'
            }
        ]
    }
    
}

export default new Phaser.Game(config)