import React from 'react'
import Octicon from 'react-octicon'

const Feature = ({ children }) => (
  <div className="flex flex-col items-center mt-2 md:mt-16 lg:border-r-2 border-lightbg">
    {children}
  </div>
)

const HeroLogo = () => (
  <section className="flex flex-row justify-center items-center font-thin mt-4 mx-16">
    <div className="flex flex-row justify-center items-center">
      <h1 className="text-5xl md:text-7xl font-hairline">
        corewar<span className="font-light">.io</span>
      </h1>
      <Octicon
        name="chevron-right"
        className="text-2xl md:text-3xl text-blue fill-current ml-8 pt-4"
      />
    </div>
    <section className="hidden md:flex flex-row flex-wrap justify-center ml-16">
      <Feature>
        <Octicon name="rocket" className="text-xl text-blue fill-current" />
        <h3 className="m-4 font-light text-lightgrey text-center">Play corewar</h3>
      </Feature>
      <Feature>
        <Octicon name="device-mobile" className="text-xl text-blue fill-current" />
        <h3 className="m-4 font-light text-lightgrey text-center">On any device</h3>
      </Feature>
      <Feature>
        <Octicon name="megaphone" className="text-xl text-blue fill-current" />
        <h3 className="m-4 font-light text-lightgrey text-center">In new ways</h3>
      </Feature>
    </section>
  </section>
)

export default HeroLogo
