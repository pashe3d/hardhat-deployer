import MyNFTToken from "../artifacts/contracts/MyNFTToken.sol/MyNFTToken.json";
import {ethers} from "hardhat";

function eth(number: number) {
    return ethers.utils.parseEther(number.toString())
}

async function main() {
    let signer = await ethers.getSigner()

    const myNFTToken = await ethers.getContractAt(
        MyNFTToken.abi,
        "0x737209fb3e04B9259F3108D358EE7A848AC2fd3f",
        signer
    );
    const symbol = await myNFTToken.symbol()
    const owner = await myNFTToken.owner()
    const nft = await myNFTToken.safeMint(
        signer.address,
        1,
        "https://ipfs.io/ipfs/QmU1fFJj7K8DB3WG6yW2q5CPPV4TLksBRfCTV8BUzKd8pr",
    )
    console.log(nft)


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });