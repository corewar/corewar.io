import React from 'react'

const Body = ({ children }) => (
  <section className="flex flex-auto justify-between bg-gray-800 border-gray-700 border rounded rounded-tl-none p-2 pt-4">
    {children}
  </section>
)

export default Body
