import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useSigner, useNetwork, useBalance } from 'wagmi';
import { TokenBalance } from "./Token";
import { VideosList } from "./VideoList";

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					NFTflix
				</h1>
			</header>

			<div className={styles.buttons_container}>
			<PageBody></PageBody>
			</div>
			<div className={styles.footer}>
				Solidity bootcamp - Sergi Rene - Final project
			</div>
		</div>
	);
}

function PageBody(){
	return (
		<>
		<WalletInfo></WalletInfo>
		</>
	)
}

function WalletInfo(){
	const {data: signer, isError, isLoading } = useSigner();
	const { chain, chains } = useNetwork();
	if(signer) return (
		<>
		<p><b>Wallet info</b></p>
		<p>Account: {signer._address} <WalletBalance></WalletBalance> {chain.name} network</p>
		<TokenBalance></TokenBalance>
		<VideosList></VideosList>

		</>
	)
	if(isLoading) return (
		<>
		<p>Wait a while, the wallet is loading</p>
		</>	
	)
	return (
		<>
		<p>Please, connect to Arbitrum Goerli</p>
		</>
	)
}



function WalletBalance(){
	const { data: signer} = useSigner();
	const { data, isError, isLoading } = useBalance({address: signer._address,
	})
	if(isLoading) return (
		<div>
			Fetching balance..
		</div>
	)
	if(isError) return (
		<div>
			Error fetching balance.
		</div>
	)
	return (
		<div>
			Balance: {data?.formatted} {data?.symbol}
		</div>
	)
}