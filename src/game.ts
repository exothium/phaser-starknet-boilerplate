import 'phaser';
import MainScene from "./scenes/mainScene";
import WalletScene from "./scenes/walletScene";

export const config = {
    type: Phaser.AUTO,
    backgroundColor: '#101032',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [MainScene, WalletScene],
    scaleMode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    antialias: true,
};

export const scaleFactor = config.width / 1200;

const game = new Phaser.Game(config);
