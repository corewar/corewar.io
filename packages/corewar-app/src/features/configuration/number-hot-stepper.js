import React from 'react'

const NumberHotStepper = () => (
  <div className="flex mt-4">
    <button className="h-10 w-12 -mr-px border border-gray-400 rounded-l-lg">-</button>
    <input
      type="text"
      defaultValue="10"
      className="h-10 w-12 flex self-center items-center justify-center bg-transparent text-center text-sm border border-l-0 border-r-0 border-gray-400"
    />
    <button className="h-10 w-12 -ml-px border border-gray-400 rounded-r-lg">+</button>
  </div>
)

export default NumberHotStepper
