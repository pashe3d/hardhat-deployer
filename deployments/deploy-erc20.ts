const hre = require("hardhat");
const { ethers } = hre;

function eth(number: number) {
    return ethers.utils.parseEther(number.toString())
}

async function main() {
    const Token = await ethers.getContractFactory("Token")
    const token = await Token.deploy(eth(1000))
    await token.deployed();

    return {
        token,
        Token
    }


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });