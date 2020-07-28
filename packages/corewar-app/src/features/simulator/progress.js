import React from 'react'

const Progress = () => (
  <div className="max-w-core w-full h-30 flex flex-col">
    <div className="w-full h-8 bg-gray-700 rounded flex items-center justify-center">100%</div>
    <div className="w-2/5 h-6 mt-2 bg-warriors-0 rounded"></div>
    <div className="w-3/5 h-6 mt-2 bg-warriors-1 rounded"></div>
  </div>
)

export default Progress
