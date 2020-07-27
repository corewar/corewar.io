import React from 'react'

const ThreeWay = ({ scores }) => (
  <div className="flex">
    <div className={`w-2/5 h-6 mt-2 ${scores[0].colour} rounded rounded-r-none`}></div>
    <div className={`w-1/5 h-6 mt-2 bg-gray-100`}></div>
    <div className={`w-3/5 h-6 mt-2 ${scores[1].colour} rounded rounded-l-none`}></div>
  </div>
)

export default ThreeWay
