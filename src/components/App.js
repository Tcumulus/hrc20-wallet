import React, { useEffect, useState } from "react"
import { ethers } from "ethers"

import TokenAbi from "../abis/Token.json"
import StakeAbi from "../abis/Stake.json"

import Header from "./Header"
import Transactions from "./Transactions"
import Stake from "./Stake"

function App() {
  const tokenAddress = "0x235422CFEca51e46C295fB04CE0BA8de6B995186"
  const stakeAddress = "0x7506b856b843B4574349bb6108c3da1200E5A6BE"
  const [tokenContract, setTokenContract] = useState(null)
  const [stakeContract, setStakeContract] = useState(null)

  const [address, setAddress] = useState(null)
  const [provider, setProvider] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [signer, setSigner] = useState(null)

  const [balance, setBalance] = useState(null)
  const [stakedBalance, setStakedBalance] = useState(null)
  const [totalStakedBalance, setTotalStakedBalance] = useState(null)

  const [decimals, setDecimals] = useState(null)
  const [tokenSymbol, setTokenSymbol] = useState(null)
  const [transaction, setTransaction] = useState(null)
  const [bar, setBar] = useState(true)

  useEffect(() => {
    if(tokenContract) {
      updateTokenSymbol()
      updateBalance()
    }
  }, [tokenContract])

  useEffect(() => {
    if(stakeContract && decimals) {
      updateStakedBalance()
    }
  }, [stakeContract, decimals])
  


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

    let _tokenContract = new ethers.Contract(tokenAddress, TokenAbi.abi, _signer)
    setTokenContract(_tokenContract)
    let _stakeContract = new ethers.Contract(stakeAddress, StakeAbi.abi, _signer)
    setStakeContract(_stakeContract)
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
    let _decimals = await tokenContract.decimals()
    setDecimals(_decimals)

    let _balance = await tokenContract.balanceOf(address)
    _balance = ethers.utils.formatUnits(_balance, _decimals)
    _balance = Number(_balance)
    setBalance(_balance)
  }

  const updateTokenSymbol = async () => {
    let _tokenSymbol = await tokenContract.symbol()
    setTokenSymbol(_tokenSymbol)
  }

  const transfer = async (e) => {
    e.preventDefault()
    if(check()) {
      let transferAmount = e.target.amount.value
      if (transferAmount <= balance && transferAmount > 0) {
        let _transferAmount = ethers.utils.parseUnits(transferAmount, decimals)
        let receiverAddress = e.target.receiver.value
    
        let txt = await tokenContract.transfer(receiverAddress, _transferAmount)
        setTransaction(txt)
      }
      else {
        alert("Balance insufficient")
      }
    }
  }

  const stake = async (e) => {
    e.preventDefault()
    if(check()) {
      let transferAmount = e.target.amount.value
      if (transferAmount <= balance && transferAmount > 0) {
        let _transferAmount = ethers.utils.parseUnits(transferAmount, decimals)
        await tokenContract.approve(stakeAddress, _transferAmount)
        await stakeContract.stakeTokens(_transferAmount)
      }
      else {
        alert("Balance insufficient")
      }
    }
  }

  const unstake = async (e) => {
    e.preventDefault()
    if(check()) {
      let transferAmount = e.target.amount.value
      if (transferAmount <= stakedBalance) {
        let _transferAmount = ethers.utils.parseUnits(transferAmount, decimals)
        await stakeContract.unstakeTokens(_transferAmount)
      }
      else {
        alert("Balance insufficient")
      }
    }
  }

  const updateStakedBalance = async () => {
    let _stakedBalance = await stakeContract.stakingBalance(address)
    _stakedBalance = ethers.utils.formatUnits(_stakedBalance, decimals)
    _stakedBalance = Number(_stakedBalance)
    setStakedBalance(_stakedBalance)

    let _totalStakedBalance = await stakeContract.getTotalStaked()
    _totalStakedBalance = ethers.utils.formatUnits(_totalStakedBalance, decimals)
    _totalStakedBalance = Number(_totalStakedBalance)
    setTotalStakedBalance(_totalStakedBalance)
  }

  const splitAddress = (address) => {
    let _address = address.substring(0,4) + "..." + address.substring(address.length - 3)
    return _address
  }

  const roundBalance = (balance) => {
    if (balance) {
      let _balance = Math.round(balance * 100) / 100 
      _balance = ethers.utils.commify(_balance)
      _balance = _balance + " " + tokenSymbol
      return _balance
    }
    return "-"
  }


  return (
    <div className="flex flex-col min-h-screen text-center gradient-bg">
      <Header connectWallet={connectWallet} address={address} chainId={chainId} 
        balance={balance} splitAddress={splitAddress}
        bar = {bar} setBar={setBar} roundBalance={roundBalance}
      />

      { bar ? 
        <Transactions transfer={transfer} transaction={transaction} splitAddress={splitAddress} balance={balance}/>
        :
        <Stake stake={stake} unstake={unstake} balance={balance} 
          stakedBalance={stakedBalance} totalStakedBalance={totalStakedBalance} roundBalance={roundBalance}
        />
      }

      <div className="flex flex-grow items-end justify-between">
        <p className="text-sm text-[#f7f7f7] m-2">{`Total Value Locked: ${roundBalance(totalStakedBalance)}`}</p>
        <p className="text-sm text-[#f7f7f7] m-2">{`TST: ${tokenAddress}`}</p>
      </div>
    </div>
  );
}

export default App;
