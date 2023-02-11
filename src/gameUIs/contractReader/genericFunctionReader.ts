import ContainerLite from "phaser3-rex-plugins/plugins/gameobjects/container/containerlite/ContainerLite";
import BBCodeText from "phaser3-rex-plugins/plugins/gameobjects/tagtext/bbcodetext/BBCodeText";
import TagText from "phaser3-rex-plugins/plugins/gameobjects/tagtext/tagtext/TagText";


export default class GenericFunctionReader extends ContainerLite {
    private _scene: Phaser.Scene;
    private _background: any;
    private _text: Phaser.GameObjects.Text;
    private _contractFunctionAbi: any;
    private _padding: number = 10;
    private _functionIdentifierTag: TagText;

    constructor(scene, x: number = 0, y: number = 0, width: number = 0, height: number = 0, contractFunctionAbi: any) {
        super(scene, x, y, width, height);
        this._scene = scene;
        this._contractFunctionAbi = contractFunctionAbi;

        this.constructBackground();
        this.constructText();

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
}