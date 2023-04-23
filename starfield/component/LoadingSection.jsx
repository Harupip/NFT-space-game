import React from "react";
import styles from "../src/styles/Home.module.css";

export default function LoadingSection() {
  // return <div className={styles.container}>Loading...</div>;
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignContent: "stretch",
      alignItems: "center",
    }}>
    <img src="./resources/Loading_trans.gif" style={{ height: 100 }} />

    </div>
  );
}