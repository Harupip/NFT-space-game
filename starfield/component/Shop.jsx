import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import ShopItem from "./ShopItem";
import { SHIPS_ADDRESS } from "../const/contractAddress";
import styles from "../src/styles/Home.module.css";

/**
 * This component shows the:
 * - All of the available pickaxes from the edition drop and their price.
 */
export default function Shop() {
  const { contract:shipContract } = useContract(SHIPS_ADDRESS);
  const { data: availableShips } = useNFTs(shipContract);
   // console.log(availableShips);
  return (
    <>
      <div className={styles.nftBoxGrid}>
        {availableShips?.map((p) => (
          <ShopItem
            shipContract={shipContract}
            item={p}
            key={p.metadata.id}
          />
        ))}
      </div>
    </>
  );
}