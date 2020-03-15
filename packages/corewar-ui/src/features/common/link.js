import React from 'react'

export default ({ route, children }) => (
  <a
    className="text-white font-display mr-2 ml-2 lg:ml-10 lg:mr-10 leading-loose border-b-2 border-transparent hover:border-blue hover:no-underline cursor-pointer"
    href={route}
  >
    {children}
  </a>
)
