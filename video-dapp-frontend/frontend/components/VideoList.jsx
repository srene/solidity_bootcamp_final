import { useSigner } from 'wagmi';
import { useState, useEffect } from 'react';

export function VideosList(){

    const [data, setTxData] = useState(null);
	console.log("reloading")
	if(!data){
		requestVideos(setTxData);

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
	return (
		<>
		<p></p>
		<h1>
		Videos
		</h1>
		<p>Not loading</p>
		</>
		)
	
}

function requestVideos(setTxData){
	console.log("executing")
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-type': 'application/json'}
	};
	console.log(requestOptions)
	fetch('http://localhost:3001/get-video-list', requestOptions)
		.then(response => response.json())
		.then((data) => {
			console.log(JSON.stringify(data));
			setTxData(data);
	});
  }