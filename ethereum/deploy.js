const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const MainContract = require("./build/MainContract.json");

const provider = new HDWalletProvider(
  //"Remove Comment from this line and Replace this text with your Wallet phrase",
  //First account from this wallet willbe used to deploy the contracts
  // "Also uncomment this line, Your Testnet API endpint here"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(MainContract.abi)
    .deploy({ data: MainContract.evm.bytecode.object })
    .send({ gas: "1400000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
