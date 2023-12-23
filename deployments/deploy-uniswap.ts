import {UniswapV2Deployer} from "./deployers/UniswapV2Deployer";

const hre = require("hardhat");
const { ethers } = hre;

function eth(number: number) {
    return ethers.utils.parseEther(number.toString())
}

async function main() {
    let signer = await ethers.getSigners()
    signer = signer[0]

    const deployer = new UniswapV2Deployer();
    const result = await deployer.deploy(signer);

    const factory = result.factory;
    console.log("factory address")
    console.log(factory.address)

    const router = result.router;
    console.log("router address")
    console.log(router.address)

    const weth9 = result.weth9;
    console.log("weth9 address")
    console.log(weth9.address)


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });