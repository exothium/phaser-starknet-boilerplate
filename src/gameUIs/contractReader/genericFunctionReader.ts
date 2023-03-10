import ContainerLite from "phaser3-rex-plugins/plugins/gameobjects/container/containerlite/ContainerLite";
import BBCodeText from "phaser3-rex-plugins/plugins/gameobjects/tagtext/bbcodetext/BBCodeText";
import TagText from "phaser3-rex-plugins/plugins/gameobjects/tagtext/tagtext/TagText";
import DefaultButton from "../buttons/defaultButton";
import {starknet} from "../../starknet/starknet";
import {Contract} from "starknet";
import {config} from "../../game";
import GenericContractReader from "./genericContractReader";

export interface GenericFunctionReaderParams {
    scene: Phaser.Scene;
    x: number;
    y: number;
    width: number;
    contract: Contract;
    contractFunctionAbi: any;
    onUpdateSize?: (width: number, height: number, x: number, y: number) => void;
}


export default class GenericFunctionReader extends ContainerLite {
    private _scene: Phaser.Scene;
    private _background: any;
    private _text: Phaser.GameObjects.Text;
    private _contract: Contract;
    private _contractFunctionAbi: any;
    private _padding: number = 10;
    private _functionIdentifierTag: TagText;
    private _functionInteractButton: DefaultButton;
    private _particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private _particleEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
    private _onUpdateSize: (width: number, height: number, x: number, y: number) => void;

    constructor({scene, x, y, width, contract, contractFunctionAbi, onUpdateSize}: GenericFunctionReaderParams) {
        let height = contractFunctionAbi.inputs.length > 0 ? 150 : 100;
        super(scene, x, y, width, height);
        this._scene = scene;
        this._contract = contract;
        this._contractFunctionAbi = contractFunctionAbi;
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;

        this.constructBackground();
        this.constructText();
        this.constructFunctionInteractButton();
        this.constructParticles();
        this._onUpdateSize = onUpdateSize;

        scene.add.existing(this);
    }

    get text(): Phaser.GameObjects.Text {
        return this._text;
    }

    set text(value: Phaser.GameObjects.Text) {
        this._text = value;
    }

    get background(): any {
        return this._background;
    }

    set background(value: any) {
        this._background = value;
    }

    get contractFunctionAbi(): any {
        return this._contractFunctionAbi;
    }

    get contract(): Contract {
        return this._contract;
    }

    set contract(value: Contract) {
        this._contract = value;
    }

    set contractFunctionAbi(value: any) {
        this._contractFunctionAbi = value;
    }

    get padding(): number {
        return this._padding;
    }

    set padding(value: number) {
        this._padding = value;
    }

    get functionIdentifierTag(): TagText {
        return this._functionIdentifierTag;
    }

    set functionIdentifierTag(value: TagText) {
        this._functionIdentifierTag = value;
    }

    get functionInteractButton(): DefaultButton {
        return this._functionInteractButton;
    }

    set functionInteractButton(value: DefaultButton) {
        this._functionInteractButton = value;
    }

    get particles(): Phaser.GameObjects.Particles.ParticleEmitterManager {
        return this._particles;
    }

    set particles(value: Phaser.GameObjects.Particles.ParticleEmitterManager) {
        this._particles = value;
    }

    get particleEmitter(): Phaser.GameObjects.Particles.ParticleEmitter {
        return this._particleEmitter;
    }

    set particleEmitter(value: Phaser.GameObjects.Particles.ParticleEmitter) {
        this._particleEmitter = value;
    }


    constructBackground() {
        this.background = (this._scene.add as any).rexRoundRectangle({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            radius: 5,
            color: 0x2b2b2b,
            alpha: 1,
            strokeColor: 0x373737,
            strokeWidth: 2,
        }).setDepth(1);
        this.add(this.background);
    }

    constructText() {
        let string = this.contractFunctionAbi.name + '()';

        var tags = {
            functionName: {
                color: '#e1c461',
                //fontStyle: 'bold italic',
            },
            functionParenthesis: {
                color: '#acb7c1',
            },
            functionParameter: {
                color: '#5eabdc',
            }
        };

        console.log(JSON.stringify(this.contractFunctionAbi.inputs));


        let textContent = "<class='functionName'>" + this.contractFunctionAbi.name + "</class>";
        textContent += "<class='functionParenthesis'>(</class>";

        if (this.contractFunctionAbi.inputs.length == 0) {
            textContent += "<class='functionParenthesis'>)</class>";
        }

        for (let i = 0; i < this.contractFunctionAbi.inputs.length; i++) {
            textContent += "<class='functionParameter'>" + this.contractFunctionAbi.inputs[i].name + "</class>";
            if (i < this.contractFunctionAbi.inputs.length - 1) {
                textContent += ", ";
            } else {
                textContent += "<class='functionParenthesis'>)</class>";
            }
        }

        this.functionIdentifierTag = this._scene.add.existing(new TagText(this._scene, this.x + this.padding - (this.width / 2), this.y + this.padding - (this.height / 2), textContent, {
            fontSize: '20px',
            fontFamily: 'MRegular',
            align: 'left',
            /*wrap: {mode: 'char', width: 200},*/
            tags: tags
        })).setDepth(2);
        this.add(this.functionIdentifierTag);
    }

    constructFunctionInteractButton() {
        this.functionInteractButton = this._scene.add.existing(new DefaultButton(this._scene, 'Read', this.x, this.y - 30 + (this.height / 2), 100, 'medium',
            () => {
                this.openLogger();

                //this.particleEmitter.resume();
                this.contract.call(this.contractFunctionAbi.name).then((value) => {
                    console.log(value);
                    alert(value);
                });
            }));
        this.add(this.functionInteractButton);
    }

    constructParticles() {
        let emitZone = new Phaser.Geom.Rectangle(this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height);

        this.particles = this._scene.add.particles('flares').setDepth(5);

        this.particleEmitter = this.particles.createEmitter({
            name: 'emitter',
            frame: ['white'],
            speed: {min: -125, max: 25},
            lifespan: 2500,
            quantity: 1,
            scale: {min: 0, max: 0.025},
            alpha: {min: 1, max: 0},
            blendMode: 'ADD',
            emitZone: {source: emitZone},
            deathZone: {source: emitZone, type: 'on Leave'},
            tint: [0xffb75b, 0xffdead, 0x3eff87],
            radial: true,
        }).pause();
        this.add(this.particles);
    }

    openLogger() {
        this.setSize(this.width, this.height + 50);
        this.background.setSize(this.width, this.height + 50);
        this._onUpdateSize(this.width, this.height + 50, this.x, this.y);
    }

    updateParentSize() {

    }


}