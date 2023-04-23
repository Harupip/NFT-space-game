import {
    ThirdwebNftMedia,
    useActiveClaimCondition,
    useContract,
    useMetadata,
    Web3Button,
  } from "@thirdweb-dev/react";
  import { ethers } from "ethers";
  import React from "react";
  import { SHIPS_ADDRESS } from "../const/contractAddress";
  import styles from "../src/styles/Home.module.css";

  export default function ShopItem(item, key) {
  const { contract:shipContract } = useContract(SHIPS_ADDRESS);
    const { data: claimCondition } = useActiveClaimCondition(
      shipContract,
      item.item.metadata.id
    );
    return (
      <div className={styles.nftBox} key={item.item.metadata.id} name={item.item.metadata.id}>
        <ThirdwebNftMedia
          metadata={item.item.metadata}
          className={`${styles.nftMedia} ${styles.spacerTop}`}
          width="100%"
          height={ 64 }
        />
        <h3 style={{
          textAlign:"center",
        }}>{item.item.metadata.name}</h3>
        <p style={{
          textAlign: "center",
        }}>
          Price:{" "}
          <b>
            {claimCondition && ethers.utils.formatUnits(claimCondition?.price)}{" "}
            SPACE
          </b>
        </p>
        
        <div className={styles.smallMargin}>
          <Web3Button
            colorMode="dark"
            contractAddress={SHIPS_ADDRESS}
            action={(contract) => contract.erc1155.claim(id, 1)}
            onSuccess={() => alert("Purchased!")}
            onError={(error) => alert(error)}
          >
            Buy
          </Web3Button>
        </div>
      </div>
    );
  }