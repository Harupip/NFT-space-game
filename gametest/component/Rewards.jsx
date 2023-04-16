import React from "react";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useMetadata,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Space_ADDRESS, SPACES_ADDRESS } from "../const/contractAddress";
import AppGame from "../src/space/AppGame";

/**
 * This component shows the:
 * - Metadata of the token itself (mainly care about image)
 * - The amount this wallet holds of this wallet
 * - The amount this user can claim from the mining contract
 */
export default function Rewards() {
  const address = useAddress();
  const { contract } = useContract(SPACES_ADDRESS);
  const { contract:spaceContract } = useContract(Space_ADDRESS);

 // const { data: tokenMetadata } = useMetadata(SPACES_ADDRESS);
 const { data: tokenMetadata } = useMetadata(contract);
  const { data: currentBalance } = useTokenBalance(contract, address);
  //const data = await contract.call("calculateRewardsTime", address);
  //console.log(data);
  const { data: unclaimedAmount } = useContractRead(
    spaceContract,
    "calculateRewardsTime",
    address
  );
  return (
    
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {tokenMetadata && (
        <ThirdwebNftMedia
          // @ts-ignore
          metadata={tokenMetadata}
          height={ 40 }
        />
      )}
      <p>
        Balance: <b>{currentBalance?.displayValue}</b>
      </p>
      <p>
        Unclaimed:{" "}
        <b>{unclaimedAmount && ethers.utils.formatUnits(unclaimedAmount)}</b>
      </p>
      <div>
        <Web3Button
          contractAddress={Space_ADDRESS}
          action={(contract) => contract.call("claimTime")}
        >
          Claim
        </Web3Button>
        <button onClick={() => console.log(document.getElementsByClassName("score")[0].innerHTML)}></button>
      </div>
    </div>
  );
}