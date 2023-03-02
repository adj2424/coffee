const { ethers } = require('hardhat');

async function main() {
	// get the contract factory
	const CoffeeFactory = await ethers.getContractFactory('Coffee');
	// deploy the contract
	const coffee = await CoffeeFactory.deploy();
	console.log('deploying...');
	await coffee.deployed();
	console.log('deployed to address:', coffee.address);

	/*
	// buy coffee
	// first signer is the owner because initially it is the deployer
	const [owner, signer1, signer2] = await ethers.getSigners();
	// signer will buy coffee, uses optional parameter to send value
	await coffee.connect(signer1).buyCoffee('bob', 'epic!', { value: ethers.utils.parseEther('1') });
	await coffee.connect(signer2).buyCoffee('joe', 'good job!', { value: ethers.utils.parseEther('15') });

	// check balance of the contract
	console.log('---after buying coffee---');
	let balance = await ethers.provider.getBalance(signer1.address);
	console.log('signer balance:', ethers.utils.formatEther(balance));
	balance = await ethers.provider.getBalance(coffee.address);
	console.log('contract balance:', ethers.utils.formatEther(balance));

	// withdraw
	await coffee.connect(owner).withdrawAll();

	// check balance of the contract
	console.log('---after withdraw---');
	balance = await ethers.provider.getBalance(owner.address);
	console.log('owner balance:', ethers.utils.formatEther(balance));
	balance = await ethers.provider.getBalance(coffee.address);
	console.log('contract balance:', ethers.utils.formatEther(balance));

	// read messages
	console.log('---read messages---');
	const memos = await coffee.getMemos();
	memos.map(memo => console.log(`from: ${memo.name}-${memo.sender}, message: ${memo.message}, at : ${memo.timestamp}`));
	*/
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
