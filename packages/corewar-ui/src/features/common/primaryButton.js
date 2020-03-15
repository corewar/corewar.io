import React from 'react'

export default ({ children }) => (
  <button className="min-w-200 rounded-md m-4 p-4 text-darkbg font-bold text-center border-2 border-white bg-white hover:bg-lightbg hover:text-white">
    {children}
  </button>
)
