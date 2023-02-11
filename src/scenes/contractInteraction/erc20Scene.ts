import {config} from "../../game";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import erc20Mintable_abi from "../../starknet/contracts/abis/erc20Mintable_abi.json";
import {starknet} from "../../starknet/starknet";
import {Contract} from "starknet";
import GenericContractReadWriteTabs from "../../gameUIs/contractReader/genericContractReader";

export default class Erc20Scene extends Phaser.Scene {

    static readonly SCENE_KEY = 'ERC20_SCENE';
    rexUI: RexUIPlugin;
    private _paddingPercentage = 0.1;
    private _panelWidth: number = config.width - (config.width * this._paddingPercentage * 2);
    private _panelHeight: number = config.height - (config.height * this._paddingPercentage * 2);
    private _erc20Contract: Contract;

    constructor() {
        super(Erc20Scene.SCENE_KEY);
    }

    get erc20Contract(): Contract {
        return this._erc20Contract;
    }

    set erc20Contract(value: Contract) {
        this._erc20Contract = value;
    }

    create() {
        this.erc20ContractInit();
        this.renderPanel();
    }

    erc20ContractInit() {
        this.erc20Contract = new Contract(
            erc20Mintable_abi,
            '0x01a36fefddfe50896b1c050c890ceaa537182b10f41d25e5e88a5466c54ccd5c',
            starknet.account,
        );
    }

    renderPanel() {
        new GenericContractReadWriteTabs(this, config.width / 2, config.height / 2, this._panelWidth, this._panelHeight, this._paddingPercentage, this.erc20Contract);
    }
}
