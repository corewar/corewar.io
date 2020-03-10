import React from 'react'
import Octicon from 'react-octicon'

const features = [
  { icon: 'rocket', heading: 'Play corewar' },
  { icon: 'device-mobile', heading: 'On any device' },
  { icon: 'megaphone', heading: 'In new ways' }
]

const Feature = ({ children }) => (
  <div className="flex flex-col items-center mt-2 md:mt-16 lg:border-r-2 border-lightbg">
    {children}
  </div>
)

const HeroLogo = () => (
  <section className="flex justify-center items-center font-thin mt-4 mx-16">
    <div className="flex justify-center items-center">
      <h1 className="text-5xl md:text-7xl font-hairline">
        corewar<span className="font-light">.io</span>
      </h1>
      <Octicon
        name="chevron-right"
        className="text-3xl md:text-7xl text-blue fill-current ml-8 pt-4"
      />
    </div>
    <section className="hidden md:flex flex-wrap justify-center ml-16">
      {features.map(feature => (
        <Feature>
          <Octicon name={feature.icon} className="text-2xl text-blue fill-current" />
          <h3 className="m-4 font-light text-lightgrey text-center">{feature.heading}</h3>
        </Feature>
      ))}
    </section>
  </section>
)

export default HeroLogo
