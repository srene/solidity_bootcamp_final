import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as VideoMarketPlace from './assets/VideoMarketPlace.json';
import { JsonRpcProvider } from "@ethersproject/providers";

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  signer: ethers.Signer;
  provider: JsonRpcProvider;
  contract: ethers.Contract;

  constructor(private configService: ConfigService){
    this.provider = new JsonRpcProvider("https://goerli-rollup.arbitrum.io/rpc");

    this.contract = new ethers.Contract(this.getContractAddress(),VideoMarketPlace.abi,this.provider);
    const pKey = this.configService.get<string>('PRIVATE_KEY');

    const wallet = new ethers.Wallet(pKey);
    this.signer = wallet.connect(this.provider);

  }
  getContractAddress() {
    const contractAddress = this.configService.get<string>('CONTRACT_ADDRESS');
    return contractAddress;
  }

  async getVideoList() {
    const videoCount=4;
    console.log(videoCount);

    let index=0;
    let response="{";
    while(true){
      try{
        const list = await this.contract.listings(index);
        console.log(`Video added ${list.nftId} from ${list.seller} price ${ethers.utils.formatUnits(list.price)} uri:${list.uri}`);
        index++;
        let url = `https://${list.uri}.ipfs.w3s.link/metadata.json`;
        let settings = { method: "Get" };
        response+='"'+list.uri+'":';
        const res = await fetch(url, settings);
        const json = await res.json();
        response+=JSON.stringify(json)+",";           
              // do something with JSON
      } catch(err){
        response = response.slice(0, -1) //'abcde'
        response+="}";
        //console.log("no more videos");
        console.log(response)
        break;
      }
    }

    return response;
  }
}
