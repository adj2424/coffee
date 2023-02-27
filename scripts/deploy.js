const { ethers } = require('hardhat');

async function main() {
	const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deployed();

	const temp = await simpleStorage.retrieve();
	console.log(temp);

	const res = await simpleStorage.store(7);
	await res.wait(1);
	const temp2 = await simpleStorage.retrieve();
	console.log(temp2);
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
