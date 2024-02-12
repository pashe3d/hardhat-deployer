const { ethers, upgrades } = require("hardhat");
import ERC20UpgradableV1 from "../artifacts/contracts/ERC20UpgradableV1.sol/ERC20UpgradableV1.json";

async function main() {
    let signer = await ethers.getSigners()
    signer = signer[0]
    const ERC20UpgradableV1Contract = await ethers.getContractAt(
        ERC20UpgradableV1.abi,
        "0xd02E2f99e3CD972fEb2487A6B01e27395C6A528b",
        signer
    );
    const ERC20UpgradableV2 = await ethers.getContractFactory(
        "ERC20UpgradableV2"
    );
    console.log("Upgrading ERC20UpgradableV1...");
    await upgrades.upgradeProxy(
        "0xd02E2f99e3CD972fEb2487A6B01e27395C6A528b",
        ERC20UpgradableV2
    );
    console.log("Upgraded Successfully");
}

main().then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });