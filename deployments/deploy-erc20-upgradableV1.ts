
const { upgrades,ethers }= require("hardhat");

async function main() {
    let signer = await ethers.getSigners()
    signer = signer[0]
    let nonce = await ethers.provider.getTransactionCount(signer.address);
    const ERC20UpgradableV1 = await ethers.getContractFactory(
        "ERC20UpgradableV1"
    );
    console.log("Deploying ERC20UpgradableV1...");
    const contract = await upgrades.deployProxy(ERC20UpgradableV1, [signer.address], {
        initializer: "initialize",
        kind: "transparent",
    });
    await contract.deployed();
    console.log("ERC20UpgradableV1 deployed to:", contract.address);
}

main().then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });