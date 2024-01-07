const hre = require("hardhat");
const { ethers } = hre;

function eth(number: number) {
    return ethers.utils.parseEther(number.toString())
}

async function main() {
    let signer = await ethers.getSigner()
    let nonce = await ethers.provider.getTransactionCount(signer.address);

    const Token = await ethers.getContractFactory("MyERC20Token")
    const token = await Token.deploy("WAY","WAY",{nonce:nonce})
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