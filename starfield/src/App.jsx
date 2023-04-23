import { ConnectWallet, useLogin, useAddress, useOwnedNFTs, useContract } from "@thirdweb-dev/react";
import "./styles/Home.css";
import "./styles/style.css";
import AppGame from "./space/AppGame.js";
import React from "react";
import { CHARACTER_ADDRESS } from "../const/contractAddress";
import { Link, Routes, Route } from "react-router-dom";
import MintContainer from "../component/MintContainer";
import Rewards from "../component/Rewards";
import OwnedGear from "../component/OwnedGear";
import Shop from "../component/Shop";
import HomeShop from "./Home";
import CurrentGear from "../component/CurrentGear";
import config from "./space/config";
import LoadingSection from "../component/LoadingSection";


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

  function addCanva() {
    var addCanva = document.createElement("canvas");
    var bodyElement = document.getElementById("body");
    bodyElement.appendChild(addCanva);
  }
  
  function delTag() {
    const list = document.getElementById("roott");
    while(list.hasChildNodes()){
    list.removeChild(list.firstChild);
    }
    const canvasList = document.getElementsByTagName("canvas")[0];
    canvasList.remove();
  }

  function setLocal() {
    localStorage.setItem(config.coin, 0);
  }

  if (!address) {
    return (
      
      <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to <a href="/">Starfield</a>!
        </h1>

        <p className="description">
          Get started by connect your wallet to play the game
        </p>

        <div className="connect">
          <ConnectWallet />
        </div>
        
        
      </main>
    </div>
     );
  }
  
  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "stretch",
        alignItems: "center",
        padding: "200px",
      }}>
      <img src="./resources/Loading_trans.gif" style={{ height: 200 }} />
  
      </div>
    );
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
      <div className="first_line">
      <Link to="/game" className="nav-link">
        <button onClick={addCanva.bind()}>Dash </button>
      </Link>
      <Link to="/shop" className="nav-link">
       <button onClick={delTag.bind()}>Dash </button>
      </Link>
      <div className="address">{address}</div>
    </div>
    <Routes>
          <Route path="/shop" element={<HomeShop />} />
          <Route path="/game" element={<AppGame />} />
    </Routes>
  </div>
);
}
