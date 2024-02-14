
const { upgrades,ethers }= require("hardhat");

async function main() {
    let signer = await ethers.getSigners()
    signer = signer[0]
    const wayV1 = await ethers.getContractFactory(
        "WayV1"
    );
    console.log("Deploying ERC20UpgradableV1...");
    const contract = await upgrades.deployProxy(wayV1, [signer.address], {
        initializer: "initialize",
        kind: "transparent",
    });
    await contract.deployed();
    console.log("way v1 deployed to:", contract.address);
}

main().then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });