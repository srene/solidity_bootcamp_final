import { ethers } from "hardhat";
import { VideoMarketPlace__factory } from "../typechain-types";

import { JsonRpcProvider } from "@ethersproject/providers";

import * as dotenv from "dotenv";
dotenv.config();

const BET_FEE = 0.01;
const TOKEN_RATIO = 1;
const price = "0.01";
const uri = "bafybeifrv64tgejxhzb6qxz7wazpojrhjcent2nvbk6tff7pzbxkzcjznq";

async function main() {

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  const provider = new JsonRpcProvider("https://goerli-rollup.arbitrum.io/rpc");

  const lastBlock = await  provider?.getBlock("latest");
  console.log(`Connected to the blocknumber ${lastBlock?.number}`)

  const signer = wallet.connect(provider);
  console.log(`Connected to the address ${signer.address}`);



  const videoDappContractFactory = new VideoMarketPlace__factory(signer);

  const tokenContract = await videoDappContractFactory.attach(process.env.CONTRACT_ADDRESS);

  console.log(`The contract connected at the address ${tokenContract.address}`)

  
  const createTx = await tokenContract.connect(signer).createListing(ethers.utils.parseEther(price),uri)
  const createTxReceipt = await createTx.wait();

  console.log(`Transaction completed at block ${createTxReceipt.blockNumber} with hash ${createTxReceipt.blockHash}`);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});