import { ethers } from 'ethers';
import abi from '../utils/Coffee.json';
import { useEffect, useState } from 'react';

const Coffee = () => {
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const contractABI = abi.abi;
	// contract deployed at 0xfCeC1d6789591396751fFA4653fca4213Bd26d73

	const getContract = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) return;
			// provider / connection to block chain
			const provider = new ethers.providers.Web3Provider(ethereum); // gets rpc url from metamask
			// signer / wallet
			const signer: any = provider.getSigner(); // returns wallet from provider which is metamask
			// contract interaction
			const contract = new ethers.Contract('0xfCeC1d6789591396751fFA4653fca4213Bd26d73', contractABI, signer);
			return contract;
		} catch (error) {
			console.log(error);
		}
	};

	const getMemos = async () => {
		try {
			const contract = await getContract();
			const memos = await contract?.getMemos();
			setMessages(memos);
		} catch (error) {
			console.log(error);
		}
	};

	const buyCoffee = async () => {
		try {
			const contract = await getContract();
			await contract?.buyCoffee(name, message, { value: ethers.utils.parseEther('.001') });
			console.log('successfully bought coffee');
		} catch (error) {
			console.log(error);
		}
	};

	const withdraw = async () => {
		try {
			const contract = await getContract();
			await contract?.withdrawAll();
			console.log('successfully withdrew');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getMemos();
	}, []);

	return (
		<>
			<h4>Name</h4>
			<input onChange={e => setName(e.target.value)} type="text" />
			<h4>Message</h4>
			<input onChange={e => setMessage(e.target.value)} type="text" />
			<button onClick={buyCoffee}>send .001eth</button>
			<button onClick={withdraw}>withdraw</button>
			<h2>Memos</h2>
			{messages.map((message: any, index) => {
				const { 1: name, 2: msg, 3: timestamp } = message;
				return (
					<div key={index}>
						<p key={index}>{msg}</p>
						<p>{`from: ${name} at ${new Date(timestamp * 1000)}`}</p>
					</div>
				);
			})}
		</>
	);
};

export default Coffee;
