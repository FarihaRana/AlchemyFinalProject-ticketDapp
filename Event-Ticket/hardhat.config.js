require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();
// const SHARDEUM_RPC = process.env.SHARDEUM_RPC;
// const privateKey = process.env.PRIVATE_KEY;

//while testing use this config----------------------------------------------------

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.19",
// };

//while deploying use this config---------------------------------------------------

module.exports = {
  defaultNetwork: "sphinx",
  networks: {
    hardhat: {},
    sphinx: {
      url: SHARDEUM_RPC,
      accounts: [privateKey],
      chainId: 8081,
    }
  },

  solidity: {
    //configure solidity version for compilation
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
}