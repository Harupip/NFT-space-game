import { ThirdwebNftMedia, useAddress, useContract, useNFT, useNFTs } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import styles from "../src/styles/Home.module.css";
import { CHARACTER_ADDRESS, SHIPS_ADDRESS, Space_ADDRESS } from "../const/contractAddress";
import { concat } from "ethers/lib/utils";
import config from "../src/space/config";

/**
 * This component shows the:
 * - Currently equipped miner character (right now there is just one (token ID 0))
 * - Currently equipped character's Ship
 */
export default function CurrentGear() {
  const address = useAddress();

  const { contract:shipContract } = useContract(SHIPS_ADDRESS);
  const { contract:spaceContract } = useContract(Space_ADDRESS);
  const { contract:characterContract } = useContract(CHARACTER_ADDRESS);
  const { data: playerNft } = useNFT(characterContract, 1);
  const [Ship, setShip] = useState("");


  useEffect(() => {
    (async () => {
      if (!address) return;

      const p = (await spaceContract.call(
        "playerShip",
        address
      ));
        
      // Now we have the tokenId of the equipped Ship, if there is one, fetch the metadata for it
      if (p.isData) {
        const ShipMetadata = await shipContract.get(p.value);
        setShip(ShipMetadata);
        console.log(ShipMetadata.metadata.id);
        console.log();
        if (ShipMetadata.metadata.id > -1) {
          localStorage.setItem(config.checkShip, ShipMetadata.metadata.id);
        }
      }
    })();
  }, [address, spaceContract, shipContract]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 className={`${styles.noGapTop} `}>Equipped Items</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* Currently equipped player */}
        <div style={{ outline: "1px solid grey", borderRadius: 16 }}>
          {playerNft && (
            <ThirdwebNftMedia metadata={playerNft?.metadata} height={64} width={68} />
          )}
        </div>
        {/* Currently equipped Ship */}
        <div
          style={{ outline: "1px solid grey", borderRadius: 16, marginLeft: 8 }}
        >
          {Ship && (
            // @ts-ignore
            <ThirdwebNftMedia metadata={Ship.metadata} height={64} width={68} />
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 24,
        }}
      >
      </div>
    </div>
  );
}