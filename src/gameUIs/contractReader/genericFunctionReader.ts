import ContainerLite from "phaser3-rex-plugins/plugins/gameobjects/container/containerlite/ContainerLite";


export default class GenericFunctionReader extends ContainerLite {
    private _scene: Phaser.Scene;
    private _background: any;
    private _text: Phaser.GameObjects.Text;

    constructor(scene, x: number = 0, y: number = 0, width: number = 0, height: number = 0, padding: number = 0) {
        super(scene, x, y, width, height);
        this._scene = scene;

        this.background = (scene.add as any).rexRoundRectangle({
            x: x,
            y: y,
            width: width,
            height: height,
            radius: 5,
            color: 0x1F2937,
            alpha: 1,
        }).setDepth(1);
        this.text = scene.add.text(x, y - 25, 'cenas', {
            fontSize: '20px',
            fill: '#F34C0B',
        }).setDepth(2).setOrigin(0.5, 0.5);

        this.add(this.text);
        this.add(this.text);
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
}