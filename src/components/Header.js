import React from "react"
import { ethers } from "ethers"
import harmonyLogo from "../images/harmony-one-logo.svg"
import logo from "../images/logo.png"

const buttonStyle = "mx-3 py-2 px-5 bg-[#f7f7f7] text-gray-700 text-lg rounded-xl drop-shadow-lg hover:text-slate-900"

const Header = ({ connectWallet, address, chainId, balance, tokenSymbol, splitAddress }) => {
  const roundBalance = (balance, tokenSymbol) => {
    let _balance = Math.round(balance, 2) 
    _balance = ethers.utils.commify(_balance)
    _balance = _balance + " " + tokenSymbol
    return _balance
  }

  const renderConnection = () => {
    if(address === null) {
      return <button onClick={connectWallet} className={buttonStyle}>Connect Wallet</button>
    }
    else if(chainId !== 1666700000) {
      return (
        <div className="flex items-top justify-end items-center">
          <button onClick={connectWallet} 
            className={"mx-4 py-2 px-5 bg-red-700 text-[#f7f7f7] text-lg rounded-xl drop-shadow-lg hover:text-[#f7f7f7] cursor-pointer"}
          >Wrong network</button>
          <p className={buttonStyle}>{splitAddress(address)}</p> 
        </div>
      )
    }
    else {
      return (
        <div className="flex items-top justify-end items-center">
          <img src={harmonyLogo} className={`w-12 px-3 py-3 ${buttonStyle}`}/>
          <p className={buttonStyle}>{roundBalance(balance, tokenSymbol)}</p>
          <a href={`https://explorer.pops.one/address/${address}`} target="_blank" 
            className={`cursor-pointer ${buttonStyle}`}
          >{splitAddress(address)}</a>
        </div>  
      )
    }
  }

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-end w-1/3">
        <img src={logo} className="w-12"/>
      </div>

      <div className="flex w-1/3 justify-end">
         {renderConnection()}
      </div>
    </div>
  )
}

export default Header