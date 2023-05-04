import web3 from "./web3";
import mainContract from './build/MainContract.json'

const main = new web3.eth.Contract(
  mainContract.abi,
  "0x52a451C9f72382E760dF6372fb94Ca91D4f1415e"
);

export default main;