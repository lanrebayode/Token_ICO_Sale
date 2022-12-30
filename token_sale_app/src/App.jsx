import { useEffect } from "react";
import { useState } from "react";
import RexTokenContract from "../Blockchain/contracts/RexToken";
import "./App.css";

function App() {
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState();
  const [error, setError] = useState();
  const [token, setToken] = useState({});
  const [tokenTotalSupply, setTokenTotalSupply] = useState();

  const connectWalletHandler = async () => {
    console.log("wallet handler");
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      console.log("Ethereum is here");
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("account requested");

        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        console.log(web3);

        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          console.log("gotten account");
          console.log(address);
        } else {
          console.log("No accounts availabe");
        }

        //loading REX TOKEN CONTRACT
        const rex = RexTokenContract(web3);
        console.log(rex);
        setToken(rex);
      } catch (err) {
        setError(err.message);
      }
    } else {
      console.log("No MetaMask");
    }
  };

  const getTotalSupply = async () => {
    const totalSupply = await token.methods.totalSupply().call();
    setTokenTotalSupply(totalSupply);
  };

  return (
    <div className="App">
      <button className="wallet" onClick={connectWalletHandler}>
        Connect Wallet
      </button>
      <p>{address}gg</p>
      <div className="Name">
        <h1 className="name"> REX TOKEN ICO SALE</h1>
        <hr className="line"></hr>
        <p className="intro">
          Introducing "Rex Token" (REX) Token price is _Ether. You currently
          have _Tokens.
        </p>
        <form>
          <input className="input" placeholder="number of Tokens"></input>
          <button className="button">Buy Token</button>
        </form>
        <div className="bar-house">
          <div className="parent">
            <p>0/100</p>
            <div className="child"></div>
          </div>
        </div>
        <p>_/100 Token Sold</p>
        <button onClick={getTotalSupply}>TotalSupply</button>
      </div>
    </div>
  );
}

export default App;

//rextoken contract address
//0xaB871685d67A22D0ED3988FA8F92fd15d64eB785

//token sale contrct address
//0x687dD92c101133B5EB2B0cd5eb4Cd7759AE3Ba74
