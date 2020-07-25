import React from 'react'

const Progress = () => (
  <div className="w-core h-30 flex flex-col">
    <div className="w-full h-8 bg-gray-700 rounded flex items-center justify-center">100%</div>
    <div className="w-2/5 h-6 mt-2 bg-red-700 rounded"></div>
    <div className="w-3/5 h-6 mt-2 bg-blue-700 rounded"></div>
  </div>
)

export default Progress
