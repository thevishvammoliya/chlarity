const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const MainContract = require("./build/MainContract.json");

const provider = new HDWalletProvider(
  "sand clap meadow salon lift spirit eyebrow west poverty wait sing toss",
  // remember to change this to your own phrase!
  "https://sepolia.infura.io/v3/0188afced4a942cd84979c3adb9c9ae7"
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
