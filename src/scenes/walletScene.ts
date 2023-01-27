import 'phaser';
import {starknetConnect} from "../starknet-web3/starknet";
import {StarknetWindowObject} from "get-starknet";
import {config, scaleFactor} from "../game";

export default class WalletScene extends Phaser.Scene {
    static readonly SCENE_KEY = 'WALLET_SCENE'

    constructor() {
        super(WalletScene.SCENE_KEY)
    }

    create() {
        starknetConnect().then((starknetWindow: StarknetWindowObject) => {
            console.log(starknetWindow);
        });

        //let logo = this.add.image((config.width / 2), 628 / 2, 'logo').setScale(scaleFactor * 0.75);

        this.renderAssets();
    }

    renderAssets() {
        let button = this.add.image((config.width / 4), 150, 'button').setScale(scaleFactor);
    }
}
