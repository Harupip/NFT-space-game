import {
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useOwnedNFTs,
    Web3Button,
  } from "@thirdweb-dev/react";
import React from "react";
import { SHIPS_ADDRESS, Space_ADDRESS } from "../const/contractAddress";
  
  /**
   * This component shows the:
   * - ships the connected wallet has
   * - A stake button underneath each of them to equip it
   */
  export default function OwnedGear() {
    const address = useAddress();
    const { contract:shipContract } = useContract(SHIPS_ADDRESS);
    const { contract:spaceContract } = useContract(Space_ADDRESS);


    const { data: ownedShips, isLoading } = useOwnedNFTs(
      shipContract,
      address
    );
  
    // if (isLoading) {
    //   return <LoadingSection />;
    // }
  
    async function equip(id) {
      if (!address) return;
  
      // The contract requires approval to be able to transfer the ship
      const hasApproval = await shipContract.isApproved(
        address,
        Space_ADDRESS
      );
  
      if (!hasApproval) {
        await shipContract.setApprovalForAll(Space_ADDRESS, true);
      }
  
      await spaceContract.call("stakeTime", id);
  
      // Refresh the page
      window.location.reload();
    }
  
    return (
      <>
        <div >
          {ownedShips?.map((p) => (
            <div key={p.metadata.id.toString()}>
              <ThirdwebNftMedia
                metadata={p.metadata}
                height={64}
              />
              <h3>{p.metadata.name}</h3>
  
              <div >
                <Web3Button
                  colorMode="dark"
                  contractAddress={Space_ADDRESS}
                  action={() => equip(p.metadata.id)}
                >
                  Equip
                </Web3Button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }