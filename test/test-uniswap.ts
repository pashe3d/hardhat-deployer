import {constants} from "ethers";
import IUniswapV2Pair from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import IUniswapV2Factory from "@uniswap/v2-core/build/IUniswapV2Factory.json";
import {abi} from "@uniswap/v2-periphery/build/WETH9.json";
import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json";
import IUniswapV2ERC20 from "@uniswap/v2-core/build/IUniswapV2ERC20.json";
import {ethers} from "hardhat";

function eth(number: number) {
    return ethers.utils.parseEther(number.toString())
}

async function main() {
    let signer = await ethers.getSigners()
    signer = signer[0]

    // const { factory, Factory } = await deployFactory(signer, signer);
    // console.log("factory.address")
    // console.log(factory.address)
    //
    // const { weth9, WETH9 } = await deployWETH9(signer);
    // console.log("weth9.address")
    // console.log(weth9.address)

    // const { router, Router } = await deployRouter(signer, factory, weth9);
    // console.log("router.address")
    // console.log(router.address)

    // const Token = await ethers.getContractFactory("Token")
    // const token = await Token.deploy(eth(1000))
    // await token.deployed()
    //
    // console.log("token.address")
    // console.log(token.address)

    const factory = await ethers.getContractAt(
        IUniswapV2Factory.abi,
        "0x26988D06Ed02296ADf2B017F144d8D3c79fF6AC8",
        signer
    );
    //0xbAA4941e6ec530BC7a15967B247c87ede312c4e8
    const weth9 = await ethers.getContractAt(
        abi,
        "0x859a28b2Fa59c90B038D043ec414bc957377D41F",
        signer
    );
//0xF88a845FDfA7048D79Eb83ebC58c7CA45dc1Bb6D
    const router = await ethers.getContractAt(
        IUniswapV2Router02.abi,
        "0x3e927B52a9EcDBa04679ac5b6ed69574b35f301E",
        signer
    );
    const token1 = await ethers.getContractAt(
        IUniswapV2ERC20.abi,
        "0x203e6EE0214ef5722De21D49f3F829406714285F",
        signer
    );

    const token2 = await ethers.getContractAt(
        IUniswapV2ERC20.abi,
        "0x9Ed983df14F18B7398aF7A07D600595A45ce8A59",
        signer
    );


    // await weth9.approve(router.address, eth(1000))
    // await token1.approve(router.address, eth(1000))

    await router.addLiquidityETH(
        token1.address,
        eth(1000),
        eth(1000),
        eth(1),
        signer.address,
        constants.MaxUint256,
        {value: eth(1)}
    )
    // await router.addLiquidity(
    //     token1.address,
    //     token2.address,
    //     eth(1000),
    //     eth(1000),
    //     eth(1000),
    //     eth(1000),
    //     signer.address,
    //     constants.MaxUint256,
    // )
    const pairAddr = factory.getPair(token1.address, weth9.address);
    const pair = await ethers.getContractAt(
        IUniswapV2Pair.abi,
        pairAddr,
        signer
    );
    const {reserve0, reserve1} = await pair.getReserves();
    console.log(reserve0)
    console.log(reserve1)


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });