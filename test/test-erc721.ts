import MyNFTToken from "../artifacts/contracts/MyNFTToken.sol/MyNFTToken.json";
import {ethers} from "hardhat";

function eth(number: number) {
    return ethers.utils.parseEther(number.toString())
}

async function main() {
    let signer = await ethers.getSigner()
    let nonce = await ethers.provider.getTransactionCount(signer.address);
    const myNFTToken = await ethers.getContractAt(
        MyNFTToken.abi,
        "0x737209fb3e04B9259F3108D358EE7A848AC2fd3f",
        signer
    );
    const symbol = await myNFTToken.symbol()
    const owner = await myNFTToken.owner()
    const nft = await myNFTToken.safeMint(
        signer.address,
        3,
        "https://ipfs.io/ipfs/Qmbuh556HuUasiLDtHuMxtGvgzQzx2Y1x4WGoaJFk2EXxH",
        {nonce:nonce}
    )
    console.log(nft.hash)
    const receipt = await nft.wait()
    console.log(receipt)



}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });