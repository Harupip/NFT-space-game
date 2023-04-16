import React from "react";
import {
  useAddress,
  useClaimNFT,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";

//import styles from ".../styles/style.css";
import { CHARACTER_ADDRESS } from "../const/contractAddress";

export default function MintContainer() {
  const address = useAddress();

  return (
    <div>
      <h1>Edition Drop</h1>

      <p>Claim your Character NFT to start playing!</p>

      <div>
        <img src="./mine.gif" style={{ height: 200 }} />
      </div>

      <div>
        <Web3Button
          colorMode="dark"
          contractAddress= {CHARACTER_ADDRESS}
          action={(contract) => contract.erc1155.claim(0, 1)}
        >
          Claim
        </Web3Button>
      </div>
    </div>
  );
}