import BulkSender from "../artifacts/contracts/BulkSender.sol/BulkSender.json";
import MyERC20Token from "../artifacts/contracts/MyERC20Token.sol/MyERC20Token.json";
const { ethers } = require("hardhat");

function eth(number: number) {
    return ethers.parseEther(number.toString())
}

async function main() {
    let signer = await ethers.getSigners()
    signer = signer[0]
    const bulkSend = await ethers.getContractAt(
        BulkSender.abi,
        "0x81697235F0DA4086d54AD3E5738D30d730af934d",
        signer
    );
    const token = await ethers.getContractAt(
        MyERC20Token.abi,
        "0x9Ed983df14F18B7398aF7A07D600595A45ce8A59",
        signer
    );
    let nonce = await ethers.provider.getTransactionCount(signer.address);
    const resultApprove =  await token.approve(
        "0x81697235F0DA4086d54AD3E5738D30d730af934d",
        eth(100000000000000000),
        {nonce:nonce}
    )
    nonce = await ethers.provider.getTransactionCount(signer.address);
    const result_send = await bulkSend.bulkSendToken(
        "0x9Ed983df14F18B7398aF7A07D600595A45ce8A59",
        [
            signer.address,
            signer.address
        ],
        [
            "0xd1aA331dcc0fe7Be597a14146b61Be1967ECF893",
            "0xCf21e0195535B6e58a64caecCD8d59Ae4772ea52"
        ],
        [
            eth(100),
            eth(200)
        ],
        {nonce:nonce}
    )
    console.log(result_send.hash)
    const receipt = await result_send.wait()
    console.log(receipt)



}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });