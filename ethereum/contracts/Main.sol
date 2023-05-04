pragma solidity ^0.7.0;

contract MainContract {
    address public manager;
    // address[] public deployedRequests;//records instance of the request
    // address payable[] public requestAddress;
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

    // function acceptRequest(//deployRequest
    //     address hsptl,
    //     uint256 amt
    // ) public payable returns (address) {
    //     require(msg.sender == manager);
    //     uint256 weiVal = amt * (10**18); // ether to wei
    //     address newRequestAddress = address(new RequestContract{value: weiVal}(manager,address(this), hsptl, amt)); //creating new instance of the Request contract
    //     deployedRequests.push(newRequestAddress); // push that instance of Request to deployedRequests array
    //     return address(newRequestAddress); //return the address of the deployed Request
    // }

    event RequestCreated(address indexed requestAddress);

    function createRequest(address hospital, uint256 amount) public payable {
        require(msg.sender == manager);
        RequestContract newRequest = new RequestContract{value: amount}(msg.sender, address(this), hospital, amount);
        // deployedRequests.push(address(newRequest));
        emit RequestCreated(address(newRequest));
    }

    function finalizeRequest(RequestContract _request) external {
        require(msg.sender == manager);
        RequestContract(_request).finalize();
        // delete requestAddress[_request];
    }

    function destroyRequest(RequestContract _request) external {
        require(msg.sender == manager);
        RequestContract(_request).destroy();
        // delete requestAddress[_request];
    }
}

contract RequestContract {
    address public manager;
    address public main;
    address public hospital;
    uint256 public amount;


    constructor(
        address mngr,
        address _main,
        address hsptl,
        uint256 amt
    ) payable {
        manager = mngr;
        main=_main;
        main = msg.sender;
        hospital = hsptl;
        amount = amt;
    }
    
    function getBalance() public view returns (uint256) {
        return amount;
        }

    function getHospital() public view returns (address) {
        return hospital;
        }

    function finalize() public payable {
        require(msg.sender == main);
        // payable(hospital).transfer(address(this).balance); // transfer the entire balance of the contract to the hospital address
        selfdestruct(payable(hospital)); // self-destruct the contract and send any remaining funds to the hospital address
    }

    function destroy() external {
        require(msg.sender == main);
        selfdestruct(payable(main)); // destroying contract and sending back the money to main contract
    }
}
