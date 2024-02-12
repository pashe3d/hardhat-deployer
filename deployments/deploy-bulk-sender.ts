const { ethers } = require("hardhat");

async function main() {
    let signer = await ethers.getSigners();
    signer = signer[0];
    let nonce = await ethers.provider.getTransactionCount(signer.address);

    const Token = await ethers.getContractFactory("BulkSender")
    const token = await Token.deploy({nonce:nonce})
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