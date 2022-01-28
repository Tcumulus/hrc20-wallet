import React, { useState } from "react"

const buttonStyle = "mx-4 py-2 px-5 bg-[#f67fef] text-lg rounded-xl text-[#f7f7f7] drop-shadow-lg hover:bg-[#f968e6] cursor-pointer"

const Stake = ({ stake, unstake, balance, stakedBalance, totalStakedBalance, roundBalance }) => {
  const [stakeInputValue, setStakeInputValue] = useState("")
  const [unstakeInputValue, setUnstakeInputValue] = useState("")

  const maxStakeInput = () => {
    setStakeInputValue(balance)
  }

  const maxUnstakeInput = () => {
    setUnstakeInputValue(stakedBalance)
  }

  const onStakeInputChange = (event) => {
    setStakeInputValue(event.target.value)
  }

  const onUnstakeInputChange = (event) => {
    setUnstakeInputValue(event.target.value)
  }

  return(
    <div className="flex flex-col flex-grow items-center pt-10">
      <div className="flex flex-col justify-between items-center w-1/3 h-20 p-2 bg-[#f7f7f7] rounded-xl shadow-xl">
        <p className="text-gray-600 text-2xl">{`Staked Balance: ${roundBalance(stakedBalance)}`}</p>
        <p className="text-gray-400">{`TVL: ${roundBalance(totalStakedBalance)}`}</p>
      </div>

      <form 
        onSubmit={stake} autoComplete="off" 
        className="flex flex-col justify-between items-center w-1/3 h-40 p-2 mt-10 bg-[#f7f7f7] rounded-xl shadow-xl"
      >
        <div className="flex flex-grow w-full h-1/2 justify-between items-center rounded-xl border-2">
          <input id="amount" type="text" placeholder="0.0" step="0.001" onChange={onStakeInputChange} value={stakeInputValue}
            className="w-full p-2 text-3xl text-gray-700 bg-[#f7f7f7] focus:outline-none"
          />
          <button onClick={maxStakeInput} type="button"
            className={`h-10 px-3 bg-gray-300 hover:bg-gray-400 shadow-none ${buttonStyle}`}
          >
            max
          </button>
        </div>
        <button type="submit" className={`w-full mt-2 shadow-none ${buttonStyle}`}>stake</button>
      </form>

      <form 
        onSubmit={unstake} autoComplete="off" 
        className="flex flex-col justify-between items-center w-1/3 h-40 p-2 mt-10 bg-[#f7f7f7] rounded-xl shadow-xl"
      >
        <div className="flex flex-grow w-full h-1/2 justify-between items-center rounded-xl border-2">
          <input id="amount" type="text" placeholder="0.0" step="0.001" onChange={onUnstakeInputChange} value={unstakeInputValue}
            className="w-full p-2 text-3xl text-gray-700 bg-[#f7f7f7] focus:outline-none"
          />
          <button onClick={maxUnstakeInput} type="button"
            className={`h-10 px-3 bg-gray-300 hover:bg-gray-400 shadow-none ${buttonStyle}`}
          >
            max
          </button>
        </div>
        <button type="submit" className={`w-full mt-2 shadow-none ${buttonStyle}`}>unstake</button>
      </form>
    </div>
  )
}

export default Stake