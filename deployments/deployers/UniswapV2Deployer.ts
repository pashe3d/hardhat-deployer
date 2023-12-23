import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import deployFactory from "./deployFactory";
import deployRouter from "./deployRouter";
import deployWETH9 from "./deployWETH9";
import Interface from "../interfaces/Interface";

export class UniswapV2Deployer {
  public Interface = Interface;
  public async deploy(signer: SignerWithAddress) {
    const { factory, Factory } = await deployFactory(signer, signer);
    const { weth9, WETH9 } = await deployWETH9(signer);
    const { router, Router } = await deployRouter(signer, factory, weth9);
    return {
      weth9,
      WETH9,
      factory,
      Factory,
      router,
      Router,
    };
  }
}
