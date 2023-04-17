import web3 from "./web3";
import Request from "./build/RequestContract.json";

export default (address) => {
  return new web3.eth.Contract(JSON.parse(Request.interface), address);
};
