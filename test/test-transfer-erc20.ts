import MyERC20Token from "../artifacts/contracts/MyERC20Token.sol/MyERC20Token.json";
import {ethers} from "hardhat";

function eth(number: number) {
    return ethers.utils.parseEther(number.toString())
}

async function main() {
    let signer = await ethers.getSigner()
    let nonce = await ethers.provider.getTransactionCount(signer.address);
    const myNFTToken = await ethers.getContractAt(
        MyERC20Token.abi,
        "0x2Ecf9fD774E7200086Fab51cDEcE6A4065f40107",
        signer
    );
    const tx = await myNFTToken.transfer(
        "0x17b8646e20F444ecDD5cef1f1fDC5F95c30f1946",
        eth(500000000),
        {nonce:nonce}
    )
    console.log(tx.hash)
    const receipt = await tx.wait()
    console.log(receipt)



}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });