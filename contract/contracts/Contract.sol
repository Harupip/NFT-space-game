// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "@thirdweb-dev/contracts/drop/DropERC1155.sol";
import "@thirdweb-dev/contracts/token/TokenERC20.sol";
import "@thirdweb-dev/contracts/openzeppelin-presets/utils/ERC1155/ERC1155Holder.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Space is ReentrancyGuard, ERC1155Holder {
    DropERC1155 public immutable shipNftCollection;
    TokenERC20 public immutable rewardsToken;

    constructor(DropERC1155 shipContractAddress, TokenERC20 SPACEcontractAddress) {
        shipNftCollection = shipContractAddress;
        rewardsToken = SPACEcontractAddress;
    }

    struct MapValue {
        bool isData;
        uint256 value;
    }

    mapping (address => MapValue) public playerShip;
    mapping (address => MapValue) public playerLastUpdate;
    mapping (address => MapValue) public playerScores;

    function calculateRewardsTime(address _player) 
        public
        view
        returns (uint256 _rewards) {
            if (!playerLastUpdate[_player].isData || !playerShip[_player].isData) {
                return 0;
            }

            uint256 timeDif = block.timestamp - playerLastUpdate[_player].value;

            uint256 rewards = timeDif * 10_000_000_000_000 * (playerShip[_player].value + 1);

            return rewards;
        }
    
    
    function calculateRewardsScore(address _player) 
        public
        view
        returns (uint256 _rewards) {
            if (!playerScores[_player].isData || !playerShip[_player].isData) {
                return 0;
            }

            uint256 rewards = playerScores[_player].value * 10_000_000_000_000 * (playerShip[_player].value + 1);

            return rewards;
        }
    

    function stakeTime(uint256 _tokenId) external nonReentrant {
        require(shipNftCollection.balanceOf(msg.sender, _tokenId) >= 1, "You must have at least 1 ship");

        if (playerShip[msg.sender].isData) {
            shipNftCollection.safeTransferFrom(address(this), msg.sender, playerShip[msg.sender].value, 1, "Return NFT");
        }

        uint256 reward = calculateRewardsTime(msg.sender);
        rewardsToken.transfer(msg.sender, reward);

        shipNftCollection.safeTransferFrom(msg.sender, address(this), _tokenId, 1, "Staking your ship");
         
        playerShip[msg.sender].value = _tokenId;
        playerShip[msg.sender].isData = true;

        playerLastUpdate[msg.sender].isData = true;
        playerLastUpdate[msg.sender].value = block.timestamp;
    }

    function stakeScore(uint256 _tokenId, uint256 score) external nonReentrant {
        require(shipNftCollection.balanceOf(msg.sender, _tokenId) >= 1, "You must have at least 1 ship");

        if (playerShip[msg.sender].isData) {
            shipNftCollection.safeTransferFrom(address(this), msg.sender, playerShip[msg.sender].value, 1, "Return NFT");
        }

        uint256 reward = calculateRewardsScore(msg.sender);
        rewardsToken.transfer(msg.sender, reward);

        shipNftCollection.safeTransferFrom(msg.sender, address(this), _tokenId, 1, "Staking your ship");
         
        playerShip[msg.sender].value = _tokenId;
        playerShip[msg.sender].isData = true;

        playerScores[msg.sender].isData = true;
        playerScores[msg.sender].value = score;
    }

    function withdrawScore(uint256 score) external nonReentrant {
        require(playerShip[msg.sender].isData, "You must have at least 1 ship");

        uint256 reward = calculateRewardsScore(msg.sender);
        rewardsToken.transfer(msg.sender, reward);

        shipNftCollection.safeTransferFrom(address(this), msg.sender, playerShip[msg.sender].value, 1, "Return your ship");
         
        playerShip[msg.sender].isData = false;

        playerScores[msg.sender].isData = true;
        playerScores[msg.sender].value = score;

    }

    function withdrawTime() external nonReentrant {
        require(playerShip[msg.sender].isData, "You must have at least 1 ship");

        uint256 reward = calculateRewardsTime(msg.sender);
        rewardsToken.transfer(msg.sender, reward);

        shipNftCollection.safeTransferFrom(address(this), msg.sender, playerShip[msg.sender].value, 1, "Return your ship");
         
        playerShip[msg.sender].isData = false;

        playerLastUpdate[msg.sender].isData = true;
        playerLastUpdate[msg.sender].value = block.timestamp;

    }

    function claimTime() external nonReentrant {
        uint256 reward = calculateRewardsTime(msg.sender);
        rewardsToken.transfer(msg.sender, reward);

        playerLastUpdate[msg.sender].isData = true;
        playerLastUpdate[msg.sender].value = block.timestamp;
    }

    function claimScore(uint256 score) external nonReentrant {
	    playerScores[msg.sender].value = score;
        uint256 reward = calculateRewardsScore(msg.sender);
        rewardsToken.transfer(msg.sender, reward);

        playerScores[msg.sender].isData = true;
        playerScores[msg.sender].value = 0;
    }
}