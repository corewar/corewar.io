import React from 'react'

export default ({ children, className }) => (
  <section
    className={`flex flex-row flex-wrap items-center justify-center p-8 my-4 md:my-16 mx-0 ${className}`}
  >
    {children}
  </section>
)
