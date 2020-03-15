import React from 'react'

export default ({ route, children }) => (
  <a
    className="block md:inline-block mt-4 md:mt-0 md:ml-6 no-underline text-white font-display hover:no-underline cursor-pointer"
    href={route}
  >
    {children}
  </a>
)
