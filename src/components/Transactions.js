import React from "react"

const buttonStyle = "mx-4 py-2 px-5 bg-[#f67fef] text-lg rounded-xl text-[#f7f7f7] drop-shadow-lg hover:bg-[#f968e6] cursor-pointer"

const Transactions = ({ transfer, transaction, splitAddress }) => {
  return(
    <div className="flex flex-grow justify-center pt-10">
      <form 
        onSubmit={transfer} autoComplete="off" 
        className="flex flex-col justify-between items-center w-1/3 h-60 p-2 bg-[#f7f7f7] rounded-xl shadow-xl"
      >
        <div className="flex flex-grow flex-col items-center justify-center w-full rounded-xl bg-[#e3e3e3]">
          <input id="amount" type="number" placeholder="0.0" step="0.0001"
            className="w-full h-1/2 mt-2 p-2 text-3xl text-gray-700 bg-[#e3e3e3] focus:outline-none"
          />
          <input id="receiver" type="text" placeholder="receiver address" 
            className="w-full h-1/2 m-2 p-2 text-xl text-gray-700 bg-[#e3e3e3] border-t-2 border-[#f7f7f7] focus:outline-none"
          />
        </div>
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