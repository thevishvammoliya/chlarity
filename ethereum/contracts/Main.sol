pragma solidity ^0.7.0;

contract MainContract {
    address public manager;
    RequestContract[] public deployedRequests;//records instance of the request
    address payable[] public requestAddress;
    uint256 public minimumContribution;
    mapping(address => bool) public donors;
   // mapping(Request => address) public requestAddress;// will be used ro get address of many requests deploed by Main

    constructor() {
        minimumContribution = 740000000000000;
        manager = msg.sender;
    }

    function Donate() public payable {
        require(msg.value > minimumContribution);
        donors[msg.sender] = true;
    }


    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function acceptRequest(//deployRequest
        address hsptl,
        string memory desc,
        uint256 amt
    ) public payable {
        require(msg.sender == manager);
        uint256 weiVal = amt * (10**18); // ether to wei
        RequestContract newRequest = new RequestContract{value: weiVal}(manager,address(this), hsptl, desc, amt); //creating new instance of the Request contract
        deployedRequests.push(newRequest); // push that instance of Request to deployedRequests array
        requestAddress.push(payable(address(newRequest))); // push the adddress of the newRequest into requestAddress array
        // address payable requestAddress = payable(address (newRequest)); //converted newRequest address to payable and assigned it to a variable requestAddress
        // payable(address(newRequest)).transfer(amt); // transfer the requested amount along with finalising the request
        //requestAddress[newRequest] = address(newRequest);
    }

    function getDeployedRequests() public view returns (address payable[] memory) {
        return requestAddress;
    }


    function destroy(RequestContract _request) external {
        require(msg.sender == manager);
        _request.destroy();
        // delete requestAddress[_request];
    }
}

contract RequestContract {
    address public manager;
    address public main;
    address public hospital;
    string public description;
    uint256 public amount;


    constructor(
        address mngr,
        address _main,
        address hsptl,
        string memory desc,
        uint256 amt
    ) payable {
        manager = mngr;
        main=_main;
        main = msg.sender;
        hospital = hsptl;
        description = desc;
        amount = amt;
    }

    function finalizeRequest() public payable {
        require(msg.sender == manager);
        uint256 weiVal = amount * (10**18); //ether to wei
        // require(_To == hospital); //address must be payable to transfer money to it
        payable(hospital).transfer(weiVal); //send money to hospital
        amount -= amount;
        //self destruct this request after finalazing the request
    }

    function getDescription() public view returns (string memory) {
        return description;
        }
    
    function getBalance() public view returns (uint256) {
        return amount;
        }

    function getHospital() public view returns (address) {
        return hospital;
        }

    function destroy() external {
        selfdestruct(payable(main)); // destroying contract and sending back the money to main contract
    }
}
