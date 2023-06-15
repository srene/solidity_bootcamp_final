import { useSigner } from 'wagmi';
import { useState, useEffect } from 'react';



export function VideosList(){
	const [loading, setLoading] = useState(true);
	const [txdata, setTxData] = useState(null);
	
	if(loading){
		requestVideos(setLoading,setTxData);

		return (
			<>
			<p></p>
			<h1>
			Videos
			</h1>
			<p>Loading Videos...</p>
			</>
		)
	}
	if(txdata){
		for (let item in txdata) {
			for(let it in txdata[item]){
				const resp = txdata[item][it];
				//console.log(txdata[item][it]);
				console.log(resp.title);
			}
		}
	}
	return (
		<>
		<p></p>
		<h1>
		Videos
		</h1>
		</>
		)
	
}


function requestVideos(setLoading,setTxData){
	console.log("requesting videos");
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-type': 'application/json'}
	};
	fetch('http://localhost:3001/get-video-list', requestOptions)
		.then(response => response.json())
		.then((data) => {
			setTxData(data);
			setLoading(false);
	});

  }

function Table({tbodyData}) {
	console.log({tbodyData});
  }