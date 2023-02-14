import {starknet, starknetConnect, starknetDisconnect} from "../starknet/starknet";
import {StarknetWindowObject} from "get-starknet";
import {config, scaleFactor} from "../game";
import {truncateString} from "../utils/utils";
import DefaultButton from "../gameUIs/buttons/defaultButton";

export default class MainScene extends Phaser.Scene {
    static readonly SCENE_KEY = 'MAIN_SCENE'
    private _logo: Phaser.GameObjects.Image;
    private _starknetInteractButton: DefaultButton;
    private _connectButton: DefaultButton;
    private _disconnectButton: DefaultButton;
    private _welcomeText: Phaser.GameObjects.Text;

    constructor() {
        super(MainScene.SCENE_KEY);
    }

    get welcomeText(): Phaser.GameObjects.Text {
        return this._welcomeText;
    }

    set welcomeText(value: Phaser.GameObjects.Text) {
        this._welcomeText = value;
    }

    get starknetInteractButton(): DefaultButton {
        return this._starknetInteractButton;
    }

    set starknetInteractButton(value: DefaultButton) {
        this._starknetInteractButton = value;
    }

    get logo(): Phaser.GameObjects.Image {
        return this._logo;
    }

    set logo(value: Phaser.GameObjects.Image) {
        this._logo = value;
    }

    get connectButton(): DefaultButton {
        return this._connectButton;
    }

    set connectButton(value: DefaultButton) {
        this._connectButton = value;
    }

    get disconnectButton(): DefaultButton {
        return this._disconnectButton;
    }

    set disconnectButton(value: DefaultButton) {
        this._disconnectButton = value;
    }

    preload() {
        this.load.image('logo', 'assets/phaser-starknet-logo.png');
        this.load.image('button', 'assets/button.jpg');
    }

    create() {
        this.input.setDefaultCursor('url(assets/cursors/cursor.cur), pointer');
        this.renderAssets();
        this.checkStarknetStatus();
    }

    update() {
        if(starknet) {
            this.welcomeText.setText('Welcome ' + truncateString(starknet.selectedAddress, 12) + ' to the Phaser-Starknet-Boilerplate!');
        } else {
            this.welcomeText.setText('Welcome to the Phaser-Starknet-Boilerplate!');
        }
    }

    checkStarknetStatus() {
        starknetConnect({modalMode: 'neverAsk'}).then((starknetWindow: StarknetWindowObject) => {
            if (starknetWindow) {
                this.starknetInteractButton.enable();
                this.disconnectButton.enable();
            } else {
                this.starknetInteractButton.disable();
                this.disconnectButton.disable();
            }
        });
    }

    renderAssets() {
        this.renderLogo();
        this.renderWelcomeText();
        this.renderStarknetInteractButton();
        this.renderStarknetConnectButton();
        this.renderStarknetDisconnectButton();
    }

    renderLogo() {
        this.logo = this.add.image((config.width / 2), config.height / 2, 'logo').setScale(scaleFactor * 0.5);
    }

    renderWelcomeText() {
        this.welcomeText = this.add.text((config.width / 2), config.height - 250, 'Welcome to the Phaser-Starknet-Boilerplate!', {
            fontSize: scaleFactor * 20 + 'px',
            color: '#ffffff',
            wordWrap: {width: config.width - 2 * 10},
            fontFamily: 'MBold',
        }).setOrigin(0.5, 0.5);
    }

    renderStarknetInteractButton() {
        this.starknetInteractButton = this.add.existing(new DefaultButton(this, 'Starknet Interactions', ( config.width / 4), config.height - 100, (config.width / 4 - 10), 'large', () => {
            starknetConnect().then((starknetWindow: StarknetWindowObject) => {
                if(starknetWindow) {
                    this.scene.start('STARKNET_INTERACTIONS_SCENE');
                }
            });
        }));
    }

    renderStarknetConnectButton() {
        //button Starknet Connect
        this.connectButton = this.add.existing(new DefaultButton(this, 'Connect Wallet', (config.width / 4 * 2), config.height - 100, (config.width / 4 - 10), 'large', () => {
            starknetConnect().then((starknetWindow: StarknetWindowObject) => {
                if(starknetWindow) {
                    this.starknetInteractButton.enable();
                    this.disconnectButton.enable();
                }
            });
        }));
    }

    renderStarknetDisconnectButton() {
        this.disconnectButton = this.add.existing(new DefaultButton(this, 'Disconnect Wallet', (config.width / 4 * 3), config.height - 100, (config.width / 4 - 10), 'large', () => {
            starknetDisconnect().then((starknetWindow: StarknetWindowObject) => {
                if(!starknetWindow) {
                    this.starknetInteractButton.disable();
                    this.disconnectButton.disable();
                }
            });
        }));
    }
}
