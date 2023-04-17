import web3 from "./web3";
import mainContract from './build/MainContract.json'

const main = new web3.eth.Contract(
  mainContract.abi,
  "0x4600D647E0Cc74a816b27b37082f3Dadb6350bE8"
);

export default main;