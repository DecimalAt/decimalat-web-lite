import { AddressLike, ContractRunner } from "ethers";
import { ERC20__factory } from "./typechain-types/factories/contracts/mocks/uniswapV2/test";

export async function getTokenName(tokenAddress: AddressLike, runner: ContractRunner) : Promise<string> {
    try {
        const token = ERC20__factory.connect(tokenAddress.toString(), runner);
        const name = await token.name();
        return name
    }catch(ex){
        console.log(ex);
        return "na"
    }
}