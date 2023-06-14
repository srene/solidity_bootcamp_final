import { useState } from 'react';
import {ethers, Contract} from 'ethers';
import * as tokenJson from './assets/VideoMarketPlaceERC20Token.json';
import * as contractJson from './assets/VideoMarketPlace.json';

import { JsonRpcProvider } from "@ethersproject/providers";
import { useSigner } from 'wagmi';


//const TOKEN_ADDRESS = "0xD6e8505a609483f83Fa3432583033e9872716635";
const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export function TokenBalance() {
    const [data, setData] = useState(null);
	  const [isLoading, setLoading] = useState(true);
    const { data:signer} = useSigner();

    const [errorReason, setError] = useState(null);

    const provider = new JsonRpcProvider("https://goerli-rollup.arbitrum.io/rpc");
    //const provider = new ethers.providers.InfuraProvider("arbitrum-goerli",process.env.NEXT_PUBLIC_INFURA_API_KEY);

    const tokenContract = new Contract(TOKEN_ADDRESS, tokenJson.abi, provider);
    const contract = new Contract(CONTRACT_ADDRESS, contractJson.abi, provider);
    const fetchData = async () => {

    const balanceBN = await tokenContract.balanceOf(signer._address);
    const balance = ethers.utils.formatEther(balanceBN);
    console.log(balance);
    setData(balance);
    setLoading(false);
       };

    fetchData();


   async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    let amount = formData.get('amount');
    console.log("amount "+amount);
    await buyToken(signer, contract,  setError,  amount);
    
    
    //console.log(formData.get('selectedProposal')+"  "+formData.get("amount"));
  }
    
    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
          <form method="post" onSubmit={handleSubmit}>
          <b>VDT Balance:</b> {data}&nbsp; &nbsp;  &nbsp; 
              <input name="amount" size="3"/>&nbsp;  &nbsp; 
              <button type="submit">Buy Token</button>&nbsp;  &nbsp; 
              1 ETH - 10000 VDT
          </form>
        </div>
    );
    
  }

  async function buyToken(signer, contract,setError, amount){


    contract.connect(signer).purchaseTokens({ value: ethers.utils.parseUnits(amount)})
        .then((data) => {
          TokenBalance();
          console.log("Payment complete");
        }).catch((err) => {
         setError(err.reason); 
         console.log(err.reason);
        });
  }
 
