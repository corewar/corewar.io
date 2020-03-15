import React, { useState } from 'react'

import Logo from '../topbar/logo'

const Link = ({ route, children }) => (
  <a
    className="text-white font-display mr-2 ml-2 lg:ml-10 lg:mr-10 leading-loose border-b-2 border-transparent hover:border-blue hover:no-underline cursor-pointer"
    href={route}
  >
    {children}
  </a>
)

const MobileLink = ({ route, children }) => (
  <a
    className="block md:inline-block mt-4 md:mt-0 md:ml-6 no-underline text-white font-display hover:no-underline cursor-pointer"
    href={route}
  >
    {children}
  </a>
)

const links = [
  { route: `/app/editor/src`, text: `play` },
  { route: `/learn`, text: `learn` },
  { route: `/#features`, text: `features` },
  { route: `/sign-up`, text: `sign up` },
  { route: `/contact-us`, text: `contact us` },
  { route: `https://github.com/corewar/corewar.io`, text: `code` }
]

const SiteNav = () => {
  const [isExpanded, toggleExpansion] = useState(false)
  return (
    <header className="bg-secondary font-display flex">
      <div className="w-4/5 md:w-2/3 mx-auto py-4 flex flex-wrap items-center justify-between">
        <Logo siteName="corewar" siteDomain=".io" />
        <nav className="hidden md:block">
          {links.map(link => (
            <Link key={link.route} route={link.route}>
              {link.text}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden text-white border-white border-2 rounded p-2"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          Menu
        </button>
        <nav
          className={`${
            isExpanded ? `block` : `hidden`
          } md:hidden md:flex md:items-center mt-4 w-full md:w-auto border-t-2 border-white`}
        >
          {links.map(link => (
            <MobileLink key={link.text} route={link.route}>
              {link.text}
            </MobileLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default SiteNav
