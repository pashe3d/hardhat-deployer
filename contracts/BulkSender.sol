pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address to, uint256 value) external;

    function transferFrom(address from, address to, uint256 value) external;

    function balanceOf(address tokenOwner) external returns (uint balance);

}

contract BulkSender {
    address public owner;
    constructor() {
        owner = msg.sender;
    }

    function bulkSendToken(IERC20 _token, address[] memory _from, address[] memory  _to, uint256[] memory _values) public
    {
        require(msg.sender == owner, "Invalid Permission");
        require(_to.length == _values.length && _from.length == _values.length, "Invalid inputs");
        for (uint256 i = 0; i < _to.length; i++) {
            _token.transferFrom(_from[i], _to[i], _values[i]);
        }
    }
}