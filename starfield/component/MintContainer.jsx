import React from "react";
import {
  useAddress,
  useClaimNFT,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import styles from "../src/styles/Home.module.css";
import { CHARACTER_ADDRESS } from "../const/contractAddress";

export default function MintContainer() {
  const address = useAddress();

  return (
    <div className={styles.collectionContainer} style={{
      margin: "auto"
    }}>
      <h1>Edition Drop</h1>

      <p>Claim your Character NFT to start playing!</p>

      <div className={`${styles.nftBox} ${styles.spacerBottom}`} >
        <img src="../resources/spaceguy.gif" style={{ height: 200, width: "100%" }} />
      </div>

      <div>
        <Web3Button
          colorMode="dark"
          className={styles.smallMargin}
          contractAddress= {CHARACTER_ADDRESS}
          action={(contract) => contract.erc1155.claim(1, 1)}
        >
          Claim
        </Web3Button>
      </div>
    </div>
  );
}