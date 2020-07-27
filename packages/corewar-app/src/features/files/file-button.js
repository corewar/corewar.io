import React from 'react'

const FileButton = ({ children }) => (
  <button className="h-8 px-8 rounded-full mr-4 bg-gray-700 border border-transparent hover:bg-gray-600 hover:border-gray-400 text-gray-100 font-semibold text-sm">
    {children}
  </button>
)

export default FileButton
