require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');

const {API_URL, PRIVATE_KEY} = process.env;

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.6.6",
                settings: {
                    optimizer: {enabled: true, runs: 1000000}
                }
            },
            {
                version: "0.8.20",
                settings: {
                    optimizer: {enabled: true, runs: 1000000}
                },
            },
        ],
    },
    defaultNetwork: "sepolia",
    networks: {
        hardhat: {},
        sepolia: {
            url: API_URL,
            gasPrice:250000000000,
            gasLimit:1000000,
            accounts: [`0x${PRIVATE_KEY}`,"0xc42cc30a140dcfbfbe0e17dc390b269276f3f5816158d05a7f47a0701bf75948"]
        },
        tbsc: {
            url: "https://bsc-testnet.public.blastapi.io",
            gasPrice:30000000000,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        mumbai: {
            url: "https://polygon-mumbai-bor.publicnode.com",
            accounts: [`0x${PRIVATE_KEY}`]
        }
    },
}