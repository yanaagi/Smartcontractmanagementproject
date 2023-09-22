import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [inputAmount, setInputAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState(""); 

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts[0]);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts[0]);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balanceWei = await atm.getBalance();
      setBalance(ethers.utils.formatEther(balanceWei));
    }
  };

  const deposit = async () => {
    if (atm && inputAmount !== "") {
      const amountWei = ethers.utils.parseEther(inputAmount);
      let tx = await atm.deposit(amountWei);
      await tx.wait();
      getBalance();
      setInputAmount("");
    }
  };

  const withdraw = async () => {
    if (atm && inputAmount !== "") {
      const amountWei = ethers.utils.parseEther(inputAmount);
      let tx = await atm.withdraw(amountWei);
      await tx.wait();
      getBalance();
      setInputAmount("");
    }
  };

  const burn = async function() {
    if (atm && burnAmount !== "") {
      const amountWei = ethers.utils.parseEther(burnAmount);
      let tx = await atm.burn(amountWei); 
      await tx.wait();
      getBalance();
      setBurnAmount("");
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your MetaMask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <input
          type="text"
          placeholder="Enter amount (ETH)"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
        />
        <button onClick={deposit}>Deposit</button>
        <button onClick={withdraw}>Withdraw</button>
        <main className="burn">
        <input
          type="text"
          placeholder="Enter amount to burn (ETH)"
          value={burnAmount}
          onChange={(e) => setBurnAmount(e.target.value)}
        />
        <button onClick={burn}>Burn</button>
      </main>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Jmj's ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background: pink;
        }
        .burn {
          width: 200px;
          height: 100px;
          border: 1px solid black;
          padding: 10px;
          margin: 10px;

        }
      `}</style>
    </main>
  );
}
