import {connect, disconnect, StarknetWindowObject} from "get-starknet";
import {ConnectOptions, DisconnectOptions} from "get-starknet";
import { Contract, number, uint256, shortString } from "starknet";
import BN__default from 'bn.js';

const { toBN, toHex, bigNumberishArrayToDecimalStringArray, getHexString } = number;
const { bnToUint256, uint256ToBN } = uint256;
const { encodeShortString, decodeShortString } = shortString;

export let starknet : StarknetWindowObject | null;
let erc721Contract : Contract | null;

export function starknetConnect(options?: ConnectOptions) {
    return new Promise((resolve, reject) => {
        connect(options)
            .then((starknetProp) => {
                starknet = starknetProp;
                resolve(starknetProp);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function starknetDisconnect(options?: DisconnectOptions) {
    return new Promise<void>((resolve, reject) => {
        disconnect(options)
            .then(() => {
                starknet = null;
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}




