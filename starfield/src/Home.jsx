import {
    ConnectWallet,
    useAddress,
    useContract,
    useMetamask,
  } from "@thirdweb-dev/react";
  import React from "react";
//   import CurrentGear from "./component/CurrentGear";
  import LoadingSection from "../component/LoadingSection";
  import OwnedGear from "../component/OwnedGear";
  import Rewards from "../component/Rewards";
  import Shop from "../component/Shop";
import { CHARACTER_ADDRESS, SHIPS_ADDRESS, SPACES_ADDRESS, Space_ADDRESS } from "../const/contractAddress";
import styles from "./styles/Home.module.css";
import CurrentGear from "../component/CurrentGear";

  export default function HomeShop() {
    const address = useAddress();

    const { contract:SpaceContract } = useContract(Space_ADDRESS);
    const { contract:CharacterContract } = useContract(
        CHARACTER_ADDRESS,
        "edition-drop"
    );
    const { contract:ShipContract } = useContract(
        SHIPS_ADDRESS,
        "edition-drop"
    );

    const { contract:tokenContract } = useContract(SPACES_ADDRESS);

    if (!address) {
        return (
          <div className={styles.container}>
            <ConnectWallet colorMode="dark" />
          </div>
        );
      }


      return (
        <div className={styles.container} >
          { SpaceContract &&
          CharacterContract &&
          tokenContract &&
          ShipContract ? (
            <div className={styles.mainSection} style={{
              marginTop:"20px"
            }}>
              <CurrentGear />
              <Rewards />
            </div>
          ) : (
            <LoadingSection />
          )}
    
          <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />
    
          {ShipContract && SpaceContract ? (
            <>
              <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>
                Your Owned Ships
              </h2>
              <div
                style={{
                  width: "100%",
                  minHeight: "10rem",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <OwnedGear/>
              </div>
            </>
          ) : (
            <LoadingSection />
          )}
    
          <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />
    
          {ShipContract && tokenContract ? (
            <>
              <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>Shop</h2>
              <div
                style={{
                  width: "100%",
                  minHeight: "10rem",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <Shop />
              </div>
            </>
          ) : (
            <LoadingSection />
          )}
        </div>
      );
    
}