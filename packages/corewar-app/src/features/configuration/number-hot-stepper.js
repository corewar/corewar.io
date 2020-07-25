import React from 'react'

const NumberHotStepper = () => (
  <div className="flex mt-4">
    <button className="h-10 w-12 border border-gray-400 rounded-l-lg">-</button>
    <div className="h-10 w-12 flex self-center items-center justify-center border border-l-0 border-r-0 border-gray-400">
      10
    </div>
    <button className="h-10 w-12 border border-gray-400 rounded-r-lg">+</button>
  </div>
)

export default NumberHotStepper
