import React from 'react'

export default ({ children }) => (
  <button className="min-w-200 rounded-md m-4 p-4 text-lightgrey font-light text-center border-2 border-white hover:bg-lightbg hover:text-white cursor-pointer">
    {children}
  </button>
)
