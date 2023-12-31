require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

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
            gasPrice:30000000000,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        tbsc: {
            url: "https://bsc-testnet.public.blastapi.io",
            gasPrice:30000000000,
            accounts: [`0x${PRIVATE_KEY}`]
        }
    },
}