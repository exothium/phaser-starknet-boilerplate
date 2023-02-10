import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin.js";

export default class DefaultButton extends Label {
    rexUI: RexUIPlugin;
    private _background : RoundRectanglePlugin;
    private _displayText : Phaser.GameObjects.Text;
    private _enabled : boolean = true;

    constructor(scene, text : string = '', x : number = 0, y : number = 0, width : number = 0, size : 'small' | 'medium' | 'large' = 'medium',  onClick?) {
        let textSize : number = 20;
        switch (size) {
            case 'small':
                textSize = 15;
                break;
            case 'medium':
                textSize = 20;
                break;
            case 'large':
                textSize = 25;
                break;
        }

        let displayText = scene.add.text(x, y, text, {
            fontSize: textSize + 'px',
        }).setOrigin(0.5).setDepth(10);

        let background = (scene.add as any).rexRoundRectangle({
            x: x,
            y: y,
            width: width,
            height: textSize*2,
            color: 0x28286E,
            radius: 10,
            strokeColor: 0xF34C0B,
            strokeWidth: 2,
        });

        super(scene, {
            width: width,
            height: textSize*2,
            space: {
                left: textSize - 5,
                right: textSize - 5,
                top: textSize - 5,
                bottom: textSize - 5,
            },
            align: 'center',
            background: background,
            text: displayText,
        });


        this.background = background;
        this.displayText = displayText;
        this.background.setInteractive().setDepth(9)
            .on('pointerdown', () => {this.handleClick(onClick || null)})
            .on('pointerover', () => {this.handleOver()})
            .on('pointerout', () => {this.handleOut()})
        ;
        scene.add.existing(this);
    }

    get background(): RoundRectanglePlugin {
        return this._background;
    }

    set background(value: RoundRectanglePlugin) {
        this._background = value;
    }

    get displayText(): Phaser.GameObjects.Text {
        return this._displayText;
    }

    set displayText(value: Phaser.GameObjects.Text) {
        this._displayText = value;
    }

    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {
        this._enabled = value;
    }

    handleClick(onClick) {
        onClick && onClick();
    }

    handleOver() {
        this.enabled && this._background.setFillStyle(0x28286E, 0.5);
    }

    handleOut() {
        this.enabled && this._background.setFillStyle(0x28286E, 1);
    }

    enable() {
        this.enabled = true;
        this.background.setFillStyle(0x28286E, 1);
    }

    disable() {
        this.enabled = false;
        this.background.setFillStyle(0x28286E, 0.5);
    }
}
