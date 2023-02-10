import 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin.js';
import ButtonPlugin from "phaser3-rex-plugins/plugins/button-plugin.js";
import MainScene from "./scenes/mainScene";
import StarknetScene from "./scenes/starknetScene";
import BackgroundScene from "./scenes/backgroundScene";
import Erc20Scene from "./scenes/contractInteraction/erc20Scene"


export const config = {
    type: Phaser.AUTO,
    backgroundColor: '#101032',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [BackgroundScene, MainScene, StarknetScene, Erc20Scene],
    scaleMode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    antialias: true,
    plugins: {
        scene: [
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
        ],
        global: [
            {
                key: "rexRoundRectanglePlugin",
                plugin: RoundRectanglePlugin,
                start: true
            },
            {
                key: 'rexButton',
                plugin: ButtonPlugin,
                start: true
            }
        ],
    },
};

export const scaleFactor = config.width / 1200;

const game = new Phaser.Game(config);
