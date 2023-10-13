import web3 from "./web3";
import mainContract from './build/MainContract.json'

const main = new web3.eth.Contract(
  mainContract.abi,
  //"Contract address here"
  //Remember, in order to use the latest deployment of the contract, you'll have to manually paste the deployed contract address in above line.
);

export default main;
