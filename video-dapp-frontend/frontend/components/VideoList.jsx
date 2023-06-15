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

	return (
		<>
		<p></p>
		<h1>
		Videos
		</h1>
		<Table tbodyData={txdata}/> 
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
	let title=[];
	let desc=[];
	let jpg=[];
	let video=[];
	{Object.keys(tbodyData).forEach(function (key){
		Object.keys(tbodyData[key]).forEach(function (key2){
			desc.push(tbodyData[key][key2].desc);
			title.push(tbodyData[key][key2].title);
			jpg.push("https://"+tbodyData[key][key2].uri+".ipfs.w3s.link/"+tbodyData[key][key2].jpg);
			video.push("https://"+tbodyData[key][key2].uri+".ipfs.w3s.link/"+tbodyData[key][key2].video);

		})
	})}
	return (

		<table>
	
	
		  {title.map((item,index)=>{
			return (
				<>
			<tr class="div-1">{item} {desc[index]} <button>Buy video</button></tr>
			 </>
			)
			})}
	
		</table>
	
	  );
  }



  