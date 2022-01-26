import React, { useEffect, useState } from "react"
import { ethers } from "ethers"

import Token from "../abis/Token.json"
import Header from "./Header"
import Transactions from "./Transactions"

function App() {
  const contractAddress = "0x0732bc9E949018a200421A54dF82CBE732D89e56"
  const [address, setAddress] = useState(null)
  const [provider, setProvider] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)

  const [balance, setBalance] = useState(null)
  const [decimals, setDecimals] = useState(null)
  const [tokenSymbol, setTokenSymbol] = useState(null)
  const [transaction, setTransaction] = useState(null)

  useEffect(() => {
    if(contract !== null) {
      updateBalance()
      updateTokenSymbol()
    }
  }, [contract])
  
  const connectWallet = () => {
    if(window.ethereum) {    
      window.ethereum.request({method: "eth_requestAccounts"})
      .then(accounts => {
        setAddress(accounts[0])
        updateEthers()
      })
    } else {
      alert("Install Metamask")
    }
  }

  const updateEthers = async () => {
    let _provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(_provider)

    let _network = await _provider.getNetwork()
    let _chainId = _network.chainId
    setChainId(_chainId)

    let _signer = _provider.getSigner()
    setSigner(_signer)

    let _contract = new ethers.Contract(contractAddress, Token.abi, _signer)
    setContract(_contract)
  }

  const check = () => {
    if(address === null) {
      alert("Connect Metamask")
      return false
    }
    else if(chainId !== 1666700000) {
      return false
    }
    return true
  }

  const updateBalance = async () => {
    let _decimals = await contract.decimals()
    setDecimals(_decimals)

    let _balance = await contract.balanceOf(address)
    _balance = Number(_balance)
    _balance = _balance / Math.pow(10, _decimals)
    setBalance(_balance)
  }

  const updateTokenSymbol = async () => {
    let _tokenSymbol = await contract.symbol()
    setTokenSymbol(_tokenSymbol)
  }

  const transfer = async (e) => {
    e.preventDefault()
    if(check()) {
      let transferAmount = e.target.amount.value
      transferAmount = ethers.utils.parseUnits(transferAmount, decimals)
      let receiverAddress = e.target.receiver.value
  
      let txt = await contract.transfer(receiverAddress, transferAmount)
      setTransaction(txt)
    }
  }

  const splitAddress = (address) => {
    let _address = address.substring(0,4) + "..." + address.substring(address.length - 3)
    return _address
  }

  return (
    <div className="flex flex-col min-h-screen text-center gradient-bg">
      <Header connectWallet={connectWallet} address={address} chainId={chainId} 
        balance={balance} tokenSymbol={tokenSymbol} splitAddress={splitAddress}
      />
      <Transactions transfer={transfer} transaction={transaction} splitAddress={splitAddress}/>
      <div className="flex flex-grow items-end justify-end">
        <p className="text-sm text-[#f7f7f7] m-2">{`TST: ${contractAddress}`}</p>
      </div>
    </div>
  );
}

export default App;
