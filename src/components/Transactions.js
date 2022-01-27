import React, { useState } from "react"

const buttonStyle = "mx-4 py-2 px-5 bg-[#f67fef] text-lg rounded-xl text-[#f7f7f7] drop-shadow-lg hover:bg-[#f968e6] cursor-pointer"

const Transactions = ({ transfer, transaction, splitAddress, balance }) => {
  const [inputValue, setInputValue] = useState("")

  const maxInput = () => {
    setInputValue(balance)
  }

  const onInputChange = (event) => {
    setInputValue(event.target.value)
  }

  return(
    <div className="flex flex-grow justify-center pt-10">
      <form 
        onSubmit={transfer} autoComplete="off" 
        className="flex flex-col justify-between items-center w-1/3 h-60 p-2 bg-[#f7f7f7] rounded-xl shadow-xl"
      >
        <div className="flex flex-grow w-full h-1/2 justify-between items-center rounded-xl border-2">
          <input id="amount" type="text" placeholder="0.0" step="0.001" onChange={onInputChange} value={inputValue}
            className="w-full p-2 text-3xl text-gray-700 bg-[#f7f7f7] focus:outline-none"
          />
          <button onClick={maxInput} type="button"
            className={`h-10 px-3 bg-[#f494f6] hover:bg-[#f67fef] ${buttonStyle}`}
          >
            max
          </button>
        </div>
        <input id="receiver" type="text" placeholder="receiver address" 
          className="w-full h-1/3 m-2 p-2 text-xl text-gray-700 bg-[#f7f7f7] rounded-xl border-2 focus:outline-none"
        />
        <button type="submit" className={`w-full mt-2 shadow-none ${buttonStyle}`}>Send</button>

        { transaction !== null ?
          <div className="flex w-full justify-start">
            <a href={`https://explorer.pops.one/tx/${transaction.hash}`} target="_blank" rel="noopener noreferrer"
              className="mt-2 m-1 text-sm text-gray-500 underline"
            >{`Transaction: ${splitAddress(transaction.hash)}`}</a>
          </div>
          : null
        }
      </form>
    </div>
  )
}

export default Transactions