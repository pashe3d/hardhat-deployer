require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.6.6",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      gas: 30_000_000,
      gasLimit: 30_000_000,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
}