import Tabs from "phaser3-rex-plugins/templates/ui/tabs/Tabs";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import {config} from "../../game";
import DefaultButton from "../buttons/defaultButton";
import UIPlugins from "phaser3-rex-plugins/templates/ui/ui-plugin";
import ScrollablePanel = UIPlugins.ScrollablePanel;
import {Contract} from "starknet";
import {getViewFunctionsFromAbi, getWriteFunctionsFromAbi} from "../../utils/utils";
import ContainerLite from "phaser3-rex-plugins/plugins/gameobjects/container/containerlite/ContainerLite";
import GenericFunctionReader from "./genericFunctionReader";

export default class GenericContractReader extends Tabs {
    private _scene: Phaser.Scene;
    private _rexUI: RexUIPlugin;
    private _scrollablePanel: ScrollablePanel;
    private _readButton: DefaultButton;
    private _writeButton: DefaultButton;
    private _fixWidthSizer: UIPlugins.FixWidthSizer;
    private _viewFunctions: any;
    private _writeFunctions: any;

    constructor(scene, x: number = 0, y: number = 0, width: number = 0, height: number = 0, padding: number = 0, contract: Contract) {
        super(scene, {
            x: x,
            y: y,
            width: width,
            height: height,
            topButtons: [],
            background: (scene.add as any).rexRoundRectangle({
                x: config.width / 2,
                y: config.height / 2,
                width: width,
                height: height,
                radius: 20,
                color: 0x111926,
                alpha: 0.75,
                strokeColor: 0xF34C0B,
                strokeWidth: 2,
            }),
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
        });

        this._scene = scene;
        this._rexUI = scene.rexUI;

        this.readButton = new DefaultButton(scene, 'Read', (config.width / 2 - 105), (config.height * padding + 50), 200, 'medium');
        this.writeButton = new DefaultButton(scene, 'Write', (config.width / 2 + 105), (config.height * padding + 50), 200, 'medium');
        this.addTopButton(this.readButton);
        this.addTopButton(this.writeButton);

        this.constructFixWidthSizer(x, y, width, height);
        this.constructScrollablePanel(x, y, width, height);


        let viewFunctions = getViewFunctionsFromAbi(contract.abi);
        let writeFunctions = getWriteFunctionsFromAbi(contract.abi);

        /*contract.name(starknet.selectedAddress).then((name) => {
          console.log(name);
        });*/

        console.log(viewFunctions);
        for (let i = 0; i < viewFunctions.length; i++) {
            let containerHeight = 250;
            let containerWidth = width - 130;
            let containerX = (config.width / 2);
            let containerY = (config.height / 2) + (25 + 25 / 2);

            /*let container = new ContainerLite(scene, containerX, containerY, containerWidth, containerHeight);*/

            let background = (scene.add as any).rexRoundRectangle({
                x: containerX,
                y: containerY,
                width: containerWidth,
                height: containerHeight,
                radius: 5,
                color: 0x1F2937,
                alpha: 1,
            }).setDepth(1);
            let container = new GenericFunctionReader(scene, containerX, containerY, containerWidth, containerHeight, viewFunctions[i]);
            container.add(background);



            this.fixWidthSizer.add(container);
            this.fixWidthSizer.addNewLine();
            this.scrollablePanel.layout();

            /*contract[viewFunctions[i].name](starknet.selectedAddress).then((value) => {
                console.log(value);
            });*/
        }



        scene.add.existing(this);
    }

    get scrollablePanel(): UIPlugins.ScrollablePanel {
        return this._scrollablePanel;
    }

    set scrollablePanel(value: UIPlugins.ScrollablePanel) {
        this._scrollablePanel = value;
    }

    get writeButton(): DefaultButton {
        return this._writeButton;
    }

    set writeButton(value: DefaultButton) {
        this._writeButton = value;
    }

    get readButton(): DefaultButton {
        return this._readButton;
    }

    set readButton(value: DefaultButton) {
        this._readButton = value;
    }

    get fixWidthSizer(): UIPlugins.FixWidthSizer {
        return this._fixWidthSizer;
    }

    set fixWidthSizer(value: UIPlugins.FixWidthSizer) {
        this._fixWidthSizer = value;
    }

    constructScrollablePanel(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
        this.scrollablePanel = this._rexUI.add.scrollablePanel({
            x: (config.width / 2),
            y: (config.height / 2) + (25 + 25 / 2),
            width: width - 130,
            height: height - 130,
            scrollMode: 0,
            background: (this._scene.add as any).rexRoundRectangle({
                x: x,
                y: y,
                width: width,
                height: height,
                color: 0x202020,
                alpha: 1,
                radius: 15,
            }),
            space: {
                left: 15,
                right: 15,
                top: 15,
                bottom: 15,
            },
            slider: {
                track: {
                    width: 10,
                    color: 0x404040,
                    radius: 10,
                },
                thumb: {
                    width: 10,
                    height: 50,
                    radius: 10,
                    color: 0x888888,
                    alpha: 1,
                },
            },
            panel: {
                child: this.fixWidthSizer,
            },
        }).layout();
    }

    constructFixWidthSizer(x, y, width, height) {
        this.fixWidthSizer = this._rexUI.add.fixWidthSizer({
            x: x,
            y: y,
            space: {
                left: 15,
                right: 15,
                top: 15,
                bottom: 15,
                item: 15,
                line: 15,
            },
            width: width - 130,
        }).layout();
    }
}
