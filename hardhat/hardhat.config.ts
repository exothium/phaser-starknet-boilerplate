import { HardhatUserConfig } from "hardhat/types";
import "@shardlabs/starknet-hardhat-plugin";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
    solidity: "0.6.12",
    starknet: {
        network: "integrated-devnet",
        venv: "active"
    },
    networks: {
        integratedDevnet: {
            url: "http://127.0.0.1:5050",
            venv: "active",
            args: ["--gas-price", "2000000000", "--fork-network", "alpha-goerli", "--seed", "42"],
            stdout: "STDOUT", // <- logs stdout to the terminal
            stderr: "STDERR"  // <- logs stderr to the terminal
        },
        hardhat: {}
    }
};

export default config;
