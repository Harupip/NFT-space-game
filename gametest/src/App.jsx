import { ConnectWallet, useLogin, useAddress, useOwnedNFTs, useContract } from "@thirdweb-dev/react";
import "./styles/Home.css";
import "./styles/style.css";
import AppGame from "./space/AppGame.js";
import React from "react";
import { CHARACTER_ADDRESS } from "../const/contractAddress";
import { Route, Routes, useRoutes } from "react-router";
import { useNavigate } from "react-router-dom";
import MintContainer from "../component/MintContainer";
import Rewards from "../component/Rewards";
import OwnedGear from "../component/OwnedGear";
import Shop from "../component/Shop";


export default function Home() {
  const address = useAddress();
  // const router = useRoutes([
  //   { path: "/play", element: <AppGame />}
  // ]);
  const { contract } = useContract(CHARACTER_ADDRESS);
  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(
    contract,
    address,
  );

  if (!address) {
    return (
      
      <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://thirdweb.com/">thirdweb</a>!
        </h1>

        <p className="description">
          Get started by configuring your desired network in{" "}
          <code className="code">src/main.jsx</code>, then modify the{" "}
          <code className="code">src/App.jsx</code> file!
        </p>

        <div className="connect">
          <ConnectWallet />
        </div>
        
        <div>My wallet address is {address}</div>
      </main>
    </div>
     );
  }
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if (!ownedNFTs || error) {
    return <div>Error</div>
  }

  if (ownedNFTs.length === 0) {
    return (
      <div>
         <MintContainer />
      </div>
    );
  }
 // window.location.reload();
  return (
    <div>
      <Rewards />
      <Shop />
    </div>
  );
  
}
