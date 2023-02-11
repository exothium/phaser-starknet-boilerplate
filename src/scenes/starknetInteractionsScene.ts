import 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import {config} from "../game";
import UIPlugins from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import ScrollablePanel = UIPlugins.ScrollablePanel;
import FixWidthSizer = UIPlugins.FixWidthSizer;
import DefaultButton from "../gameUIs/buttons/defaultButton";

export default class StarknetInteractionsScene extends Phaser.Scene {
    static readonly SCENE_KEY = 'STARKNET_INTERACTIONS_SCENE'
    rexUI: RexUIPlugin;
    private _panel: ScrollablePanel;
    private _paddingPercentage = 0.1;
    private _panelWidth: number = config.width - (config.width * this._paddingPercentage * 2);
    private _panelHeight: number = config.height - (config.height * this._paddingPercentage * 2);
    private _panelButtonWidth: number = ((this._panelWidth) / 3) - (15 + (15/2));
    private _fixWidthSizer: FixWidthSizer;

    constructor() {
        super(StarknetInteractionsScene.SCENE_KEY)
    }

    get panel(): UIPlugins.ScrollablePanel {
        return this._panel;
    }

    set panel(value: UIPlugins.ScrollablePanel) {
        this._panel = value;
    }


    create() {
        this.renderPanel();
    }

    renderPanel() {
        this._panel = this.rexUI.add.scrollablePanel({
            x: config.width / 2,
            y: config.height / 2,
            width: this._panelWidth,
            height: this._panelHeight,
            scrollMode: 0,
            background: (this.add as any).rexRoundRectangle({
                x: config.width * this._paddingPercentage,
                y: config.height * this._paddingPercentage,
                width: this._panelWidth,
                height: this._panelHeight,
                radius: 20,
                color: 0x111926,
                alpha: 0.85,
                strokeColor: 0x28286E,
                strokeWidth: 2,
            }),
            panel: {
                child: this.panelChilds(),
            },
        }).layout();
    }

    panelChilds() {
        this._fixWidthSizer = this.rexUI.add.fixWidthSizer({
            space: {
                left: 15,
                right: 15,
                top: 15,
                bottom: 15,
                item: 15,
                line: 15,
            },
        });

        this._fixWidthSizer.add(this.panelButton('ERC20', () => { this.scene.start('ERC20_SCENE'); }));
        this._fixWidthSizer.add(this.panelButton('ERC721'));
        this._fixWidthSizer.add(this.panelButton('Coming Soon'));
        this._fixWidthSizer.add(this.panelButton('Coming Soon'));
        this._fixWidthSizer.add(this.panelButton('Coming Soon'));
        this._fixWidthSizer.add(this.panelButton('Coming Soon'));
        this._fixWidthSizer.add(this.panelButton('Coming Soon'));

        return this._fixWidthSizer;
    }

    panelButton(text: string = 'TEXT NOT SET', onClick?: Function) {
        return this.add.existing(new DefaultButton(this, text, 0, 0, this._panelButtonWidth, 'medium', onClick));

    }



}
