require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-ethers');
require('dotenv').config();
//require('@nomiclabs/hardhat-waffle');

const GOERLI_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.META_MASK_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	defaultNetwork: 'hardhat',
	networks: {
		goerli: {
			url: GOERLI_URL,
			accounts: [PRIVATE_KEY]
		}
	},
	solidity: '0.8.19'
};
