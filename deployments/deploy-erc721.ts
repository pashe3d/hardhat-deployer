const hre = require("hardhat");
const {ethers} = hre;

function eth(number: number) {
    return ethers.utils.parseEther(number.toString())
}

async function main() {
    let signer = await ethers.getSigner()
    const Token = await ethers.getContractFactory("MyNFTToken")
    const token = await Token.deploy(signer.address, 'MyNFTToken', 'MNFTT')
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