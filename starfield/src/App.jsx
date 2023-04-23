import { ConnectWallet, useLogin, useAddress, useOwnedNFTs, useContract } from "@thirdweb-dev/react";
import "./styles/Home.css";
import "./styles/style.css";
import AppGame from "./space/AppGame.js";
import React from "react";
import { CHARACTER_ADDRESS } from "../const/contractAddress";
import { Link, Routes, Route } from "react-router-dom";
import MintContainer from "../component/MintContainer";
import HomeShop from "./Home";
import config from "./space/config";

export default function Home() {
  const address = useAddress();
  
  const { contract } = useContract(CHARACTER_ADDRESS);
  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(
    contract,
    address,
  );

  function addCanva() {
    const playBtn = document.getElementById("playBtn");
  const shopBtn = document.getElementById("shopBtn");
    playBtn.hidden = true;
    shopBtn.hidden = false;
    delTag2();
    var addCanva = document.createElement("canvas");
    var bodyElement = document.getElementById("body");
    bodyElement.appendChild(addCanva);
  }
  
  function delTag() {
    const playBtn = document.getElementById("playBtn");
  const shopBtn = document.getElementById("shopBtn");
    delTag2();
    shopBtn.hidden = true;
    playBtn.hidden = false;
    const list = document.getElementById("roott");
    while(list.hasChildNodes()){
    list.removeChild(list.firstChild);
    }
    const canvasList = document.getElementsByTagName("canvas")[0];
    canvasList.remove();
  }

  function delTag2() {
    const list = document.getElementById("waitingPage");
    while(list.hasChildNodes()){
    list.removeChild(list.firstChild);
    }
    
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
        <button id="playBtn" onClick={addCanva.bind()}>Play </button>
      </Link>
      <Link to="/shop" className="nav-link">
       <button id="shopBtn" onClick={delTag.bind()}>Shop </button>
      </Link>
      <div className="address">{address}</div>
    </div>

    <div id="waitingPage">
    <div id="firstPage">
      <div className="containerFirstPage">
      <Link to="/game" className="nav-link">
        <button className="button-64" onClick={addCanva.bind()}>
        <span className="text">Play</span>
           </button>
      </Link>
      <Link to="/shop" className="nav-link">
       <button className="button-64" onClick={delTag.bind()}> 
       <span className="text">Shop</span>
        </button>
      </Link>
      </div>
    </div>
    </div>
    <Routes>
          <Route path="/shop" element={<HomeShop />} />
          <Route path="/game" element={<AppGame />} />
    </Routes>
  </div>
);
}
