import React, { useState } from "react";
import "./CSS/TokenTransaction.css";

const TokenTransaction = () => {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [ethBalance, setEthBalance] = useState(2.0); // Example Ether balance
  const [tifBalance, setTifBalance] = useState(1000.0); // Example TIF balance
  const [transactionAmount, setTransactionAmount] = useState("");
  const [activeTab, setActiveTab] = useState("Buy"); // Active tab: "Buy" or "Sell"

  // Placeholder for wallet connection logic
  const connectWallet = async () => {
    try {
      const exampleAddress = "0x1234567890abcdef1234567890abcdef12345678";
      setConnectedAddress(exampleAddress);
      setEthBalance(2.0); // Example Ether balance
      setTifBalance(1000.0); // Example TIF balance
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Handle transactions for Buy or Sell
  const handleTransaction = () => {
    const amount = parseFloat(transactionAmount);
    const fee = amount * 0.025; // Transaction fee is 2.5%

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (activeTab === "Buy") {
      // Buy TIF logic
      const totalCost = amount + fee;
      if (totalCost > ethBalance) {
        alert("Insufficient Ether balance to complete the transaction.");
        return;
      }
      setEthBalance(ethBalance - totalCost);
      setTifBalance(tifBalance + amount);
      console.log(`Bought ${amount} TIF for ${totalCost} ETH`);
    } else {
      // Sell TIF logic
      if (amount > tifBalance) {
        alert("Insufficient TIF balance to complete the transaction.");
        return;
      }
      setEthBalance(ethBalance + amount - fee);
      setTifBalance(tifBalance - amount);
      console.log(`Sold ${amount} TIF`);
    }

    setTransactionAmount("");
  };

  return (
    <div className="transaction-container">
      <h1>Buy/Sell TIF</h1>
      <p><i>Only available on Mainnet.</i></p>

      {/* Tabs for Buy and Sell */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "Buy" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("Buy")}
        >
          Buy TIF
        </button>
        <button
          className={`tab ${activeTab === "Sell" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("Sell")}
        >
          Sell TIF
        </button>
      </div>

      {/* Input Section */}
      <div className="input-group">
        <input
          type="number"
          placeholder={`Enter amount in ${activeTab === "Buy" ? "ETH" : "TIF"}`}
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
        />
      </div>

      <div className="stats">
        <p><b>Connected Address:</b> {connectedAddress || "Not connected"}</p>
        <p><b>Ether Balance:</b> {ethBalance.toFixed(4)} ETH</p>
        <p><b>TIF Balance:</b> {tifBalance.toFixed(4)} TIF</p>
        <p><b>Transaction Fee:</b> 2.5%</p>
      </div>

      {!connectedAddress && (
        <button className="connect-wallet-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}

      {connectedAddress && (
        <button className="transaction-button" onClick={handleTransaction}>
          {activeTab === "Buy" ? "Buy TIF" : "Sell TIF"}
        </button>
      )}
    </div>
  );
};

export default TokenTransaction;
