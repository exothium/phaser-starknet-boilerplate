import {starknet, starknetConnect, starknetDisconnect} from "../starknet-web3/starknet";
import {StarknetWindowObject} from "get-starknet";
import {config, scaleFactor} from "../game";
import {truncateString} from "../utils/utils";

export default class MainScene extends Phaser.Scene {
    static readonly SCENE_KEY = 'MAIN_SCENE'
    private _logo: Phaser.GameObjects.Image;
    private _starknetInteractButton: Phaser.GameObjects.Image;
    private _starknetInteractButtonText: Phaser.GameObjects.Text;
    private _connectButton: Phaser.GameObjects.Image;
    private _connectButtonText: Phaser.GameObjects.Text;
    private _disconnectButton: Phaser.GameObjects.Image;
    private _disconnectButtonText: Phaser.GameObjects.Text;
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

    get starknetInteractButtonText(): Phaser.GameObjects.Text {
        return this._starknetInteractButtonText;
    }

    set starknetInteractButtonText(value: Phaser.GameObjects.Text) {
        this._starknetInteractButtonText = value;
    }

    get starknetInteractButton(): Phaser.GameObjects.Image {
        return this._starknetInteractButton;
    }

    set starknetInteractButton(value: Phaser.GameObjects.Image) {
        this._starknetInteractButton = value;
    }

    get logo(): Phaser.GameObjects.Image {
        return this._logo;
    }

    set logo(value: Phaser.GameObjects.Image) {
        this._logo = value;
    }

    get connectButtonText(): Phaser.GameObjects.Text {
        return this._connectButtonText;
    }

    set connectButtonText(value: Phaser.GameObjects.Text) {
        this._connectButtonText = value;
    }

    get connectButton(): Phaser.GameObjects.Image {
        return this._connectButton;
    }

    set connectButton(value: Phaser.GameObjects.Image) {
        this._connectButton = value;
    }

    get disconnectButtonText(): Phaser.GameObjects.Text {
        return this._disconnectButtonText;
    }

    set disconnectButtonText(value: Phaser.GameObjects.Text) {
        this._disconnectButtonText = value;
    }

    get disconnectButton(): Phaser.GameObjects.Image {
        return this._disconnectButton;
    }

    set disconnectButton(value: Phaser.GameObjects.Image) {
        this._disconnectButton = value;
    }

    preload() {
        this.load.image('logo', 'assets/phaser-starknet-logo.png');
        this.load.image('button', 'assets/button.jpg');
        this.load.glsl('stars', 'assets/shaders/stars.frag');
    }

    create() {
        this.input.setDefaultCursor('url(assets/cursors/cursor.cur), pointer');

        this.checkStarknetStatus();
        this.renderAssets();
    }

    update() {
        if(starknet) {
            this.disconnectButtonText.setText('Disconnect Wallet');
            console.log(starknet);
            this.welcomeText.setText('Welcome ' + truncateString(starknet.selectedAddress, 12) + ' to the Phaser-Starknet-Boilerplate!');
        } else {
            this.disconnectButtonText.setText('No Wallet Connected');
            this.welcomeText.setText('Welcome to the Phaser-Starknet-Boilerplate!');
        }
    }

    checkStarknetStatus() {
        starknetConnect({modalMode: 'neverAsk'}).then((starknetWindow: StarknetWindowObject) => {
            console.log(starknetWindow);
            if (starknetWindow.selectedAddress) {
                this.enableInteractButton();
            } else {
                this.disableInteractButton();
            }
        });
    }

    renderAssets() {
        this.renderShader();
        this.renderLogo();
        this.renderWelcomeText();
        this.renderStarknetInteractButton();
        this.renderStarknetConnectButton();
        this.renderStarknetDisconnectButton();
    }

    renderLogo() {
        //logo
        this.logo = this.add.image((config.width / 2), 628 / 2, 'logo').setScale(scaleFactor * 0.5);
    }

    renderShader() {
        //stars shader
        this.add.shader('stars', 0, 0, config.width, config.height).setOrigin(0);
    }

    renderWelcomeText() {
        this.welcomeText = this.add.text((config.width / 2), config.height - 250, 'Welcome to the Phaser-Starknet-Boilerplate!', {
            fontSize: scaleFactor * 20 + 'px',
            color: '#ffffff',
            wordWrap: {width: config.width - 2 * 10}
        }).setOrigin(0.5, 0.5);
    }

    enableInteractButton() {
        this.starknetInteractButton.setInteractive();
        this.starknetInteractButton.clearTint();
    }

    disableInteractButton() {
        this.starknetInteractButton.disableInteractive();
        this.starknetInteractButton.setTint(0x808080);
    }

    renderStarknetInteractButton() {
        //button Starknet Interactions
        this.starknetInteractButton = this.add.image((config.width / 4), config.height - 100, 'button').setScale(scaleFactor);
        let buttonPadding = 5;
        this.starknetInteractButtonText = this.add.text(this.starknetInteractButton.x, this.starknetInteractButton.y, 'Starknet Interactions', {
            fontSize: scaleFactor * 20 + 'px',
            color: '#000000',
            wordWrap: {width: this.starknetInteractButton.width - 2 * buttonPadding}
        }).setOrigin(0.5, 0.5);
        this.starknetInteractButton.on('pointerover', () => {
            this.starknetInteractButtonText.setColor('#FFFFFF');
        });
        this.starknetInteractButton.on('pointerout', () => {
            this.starknetInteractButtonText.setColor('#000000');
        });
        this.starknetInteractButton.on('pointerdown', () => {
            this.starknetInteractButton.setTint(0xFF4F0B);
            this.starknetInteractButton.disableInteractive();
            starknetConnect().then((starknetWindow: StarknetWindowObject) => {
                console.log(starknetWindow);
                setTimeout(() => {
                    this.starknetInteractButton.clearTint();
                }, 100);
                this.starknetInteractButton.setInteractive();
                if(starknetWindow) {
                    this.scene.start('WALLET_SCENE');
                }
            });
        });
    }

    renderStarknetConnectButton() {
        //button Starknet Connect
        this.connectButton = this.add.image((config.width / 4 * 2), config.height - 100, 'button').setScale(scaleFactor);
        let buttonPadding = 5;
        this.connectButtonText = this.add.text(this.connectButton.x, this.connectButton.y, 'Connect Wallet', {
            fontSize: scaleFactor * 20 + 'px',
            color: '#000000',
            wordWrap: {width: this.connectButton.width - 2 * buttonPadding}
        }).setOrigin(0.5, 0.5);
        this.connectButton.setInteractive();
        this.connectButton.on('pointerover', () => {
            this.connectButtonText.setColor('#FFFFFF');
        });
        this.connectButton.on('pointerout', () => {
            this.connectButtonText.setColor('#000000');
        });
        this.connectButton.on('pointerdown', () => {
            this.connectButton.setTint(0xFF4F0B);
            this.connectButton.disableInteractive();
            starknetConnect().then((starknetWindow: StarknetWindowObject) => {
                console.log(starknetWindow);
                setTimeout(() => {
                    this.connectButton.clearTint();
                }, 100);
                this.connectButton.setInteractive();
                this.enableInteractButton();
            });
        });
    }

    renderStarknetDisconnectButton() {
        //button Starknet Disconnect
        this.disconnectButton = this.add.image((config.width / 4 * 3), config.height - 100, 'button').setScale(scaleFactor);
        let buttonPadding = 5;
        this.disconnectButtonText = this.add.text(this.disconnectButton.x, this.disconnectButton.y, 'No Wallet Connected', {
            fontSize: scaleFactor * 20 + 'px',
            color: '#000000',
            wordWrap: {width: this.disconnectButton.width - 2 * buttonPadding}
        }).setOrigin(0.5, 0.5);
        this.disconnectButton.setInteractive();
        this.disconnectButton.on('pointerover', () => {
            this.disconnectButtonText.setColor('#FFFFFF');
        });
        this.disconnectButton.on('pointerout', () => {
            this.disconnectButtonText.setColor('#000000');
        });
        this.disconnectButton.on('pointerdown', () => {
            this.disconnectButton.setTint(0xFF4F0B);
            starknetDisconnect({clearLastWallet: true}).then((starknetWindow: StarknetWindowObject) => {
                console.log(starknetWindow);
                setTimeout(() => {
                    this.disconnectButton.clearTint();
                    this.disableInteractButton();
                }, 100);
            });
        });
    }
}
