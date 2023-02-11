import Tabs from "phaser3-rex-plugins/templates/ui/tabs/Tabs";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import {config} from "../../game";
import DefaultButton from "../defaultButton";
import UIPlugins from "phaser3-rex-plugins/templates/ui/ui-plugin";
import ScrollablePanel = UIPlugins.ScrollablePanel;
import {Contract} from "starknet";
import {getViewFunctionsFromAbi, getWriteFunctionsFromAbi} from "../../utils/utils";
import ContainerLite from "phaser3-rex-plugins/plugins/gameobjects/container/containerlite/ContainerLite";

export default class GenericContractReader extends Tabs {
    rexUI: RexUIPlugin;
    private _scrollablePanel: ScrollablePanel;
    private _readButton: DefaultButton;
    private _writeButton: DefaultButton;
    private _fixWidthSizer: UIPlugins.FixWidthSizer;
    private _viewFunctions: any;
    private _writeFunctions: any;

    constructor(scene, x: number = 0, y: number = 0, width: number = 0, height: number = 0, padding: number = 0, contract: Contract) {
        let viewFunctions = getViewFunctionsFromAbi(contract.abi);
        let writeFunctions = getWriteFunctionsFromAbi(contract.abi);

        /*contract.name(starknet.selectedAddress).then((name) => {
          console.log(name);
        });*/

        console.log(viewFunctions);

        let fixWidthSizer = scene.rexUI.add.fixWidthSizer({
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
        });

        for (let i = 0; i < viewFunctions.length; i++) {
            let containerHeight = 75;
            let containerWidth = width - 100;
            let containerX = (config.width / 2);
            let containerY = (config.height / 2) + (25 + 25 / 2);

            let container = new ContainerLite(scene, containerX, containerY, containerWidth, containerHeight);
            let background = (scene.add as any).rexRoundRectangle({
                x: containerX,
                y: containerY,
                width: containerWidth,
                height: containerHeight,
                radius: 5,
                color: 0x1F2937,
            }).setDepth(1);
            let text = scene.add.text(containerX, containerY - 25, viewFunctions[i].name, {
                fontSize: '20px',
                fill: '#9A6BCD',
            }).setDepth(2).setOrigin(0.5, 0.5);

            container.add(background);
            container.add(text);
            //create a mask between container and background from backgrounScene
            container.setMask(scene.get('BACKGROUND_SCENE').background.createGeometryMask());




            fixWidthSizer.add(container);
            fixWidthSizer.addNewLine();

            /*contract[viewFunctions[i].name](starknet.selectedAddress).then((value) => {
                console.log(value);
            });*/
        }

        fixWidthSizer.layout();

        /*fixWidthSizer.add(new DefaultButton(scene, 'Example', (config.width / 2 - 105), (config.height * padding + 50), 200, 'small'));
        fixWidthSizer.add(new DefaultButton(scene, 'Example', (config.width / 2 - 105), (config.height * padding + 50), 200, 'small'));*/


        let scrollablePanel = scene.rexUI.add.scrollablePanel({
            x: (config.width / 2),
            y: (config.height / 2) + (25 + 25 / 2),
            width: width - 100,
            height: height - 100,
            scrollMode: 0,
            background: (scene.add as any).rexRoundRectangle({
                x: x,
                y: y,
                width: width,
                height: height,
                color: 0x111926,
                alpha: 1,
                radius: 5,
            }),
            panel: {
                child: fixWidthSizer,
            },
        }).layout();
        let readButton = new DefaultButton(scene, 'Read', (config.width / 2 - 105), (config.height * padding + 50), 200, 'medium');
        let writeButton = new DefaultButton(scene, 'Write', (config.width / 2 + 105), (config.height * padding + 50), 200, 'medium');

        super(scene, {
            x: x,
            y: y,
            width: width,
            height: height,
            topButtons: [
                readButton,
                writeButton,
            ],
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
            panel: scrollablePanel
        });

        this.fixWidthSizer = fixWidthSizer;
        this.scrollablePanel = scrollablePanel;
        this.readButton = readButton;
        this.writeButton = writeButton;

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
}
