import React from 'react'
import Octicon from 'react-octicon'

import SiteNav from '../common/siteNav'
import HeroLogo from '../common/heroLogo'
import FeatureButton from '../common/featureButton'
import PrimaryButton from '../common/primaryButton'
import RoadmapItem from './roadmapItem'
import Guidance from './guidance'
import GuidanceText from './guidanceText'
import Feature from './feature'
import FeatureDescription from './featureDescription'

import SimulatorImage from '../../img/corewarx200.gif'
import ParserImage from '../../img/redcode.gif'

const roadMapItems = [
  {
    leftText: 'November 2017',
    rightText: 'The idea to develop corewar as a modern web app is conceived',
    icon: 'light-bulb',
    complete: true
  },
  {
    leftText: 'March 2018',
    rightText: 'Public beta, allowing players to experience the initial feature set',
    icon: 'calendar',
    complete: true
  },
  {
    leftText: 'Today',
    rightText:
      'We are now actively listening for user feedback whilst we build the next set of features but here’s what we had in mind',
    icon: 'megaphone',
    complete: true
  },
  {
    leftText: 'Log in & Warrior Management',
    rightText:
      'Create an account and build up your warriors, including file versioning and statistics over time',
    icon: 'git-commit',
    complete: false
  },
  {
    leftText: 'Live online hills',
    rightText:
      'We will host and run hills for all skill levels. Which will allow you to submit you warriors online and see the results in realtime',
    icon: 'git-commit',
    complete: false
  },
  {
    leftText: 'Private hills',
    rightText:
      'Want to play with just your friends? We will add invite only hills so you can chose the rules and the players',
    icon: 'git-commit',
    complete: false
  },
  {
    leftText: 'Corewar challenges',
    rightText:
      'Feel like you’ve done all corewar can offer? We will develop specific challenges and situations to challenge the most experienced players',
    icon: 'git-commit',
    complete: false
  }
]

const Home = () => (
  <main className="grid grid-rows-mobile-home-grid md:grid-rows-home-grid text-white bg-darkbg">
    <SiteNav />
    <HeroLogo />
    <div className="flex flex-row flex-wrap justify-center items-center content-center mb-16 min-h-150">
      <PrimaryButton href="/app/editor/src">Play Now</PrimaryButton>
      <FeatureButton href="/learn">Learn more</FeatureButton>
    </div>
    <section className="flex items-center justify-center bg-defaultbg min-h-cta" id={`features`}>
      <h2 className="w-3/4 lg:w-1/2 font-light text-xl md:text-2xl text-blue leading-10 m-4 md:m-16 my-16">
        This is Corewar where players test their coding skills against each other, writing warriors
        which battle for control of the core. Do you have what it takes to become the King of the
        Hill?
      </h2>
    </section>
    <Feature>
      <FeatureDescription>
        Our interactive Corewar Simulator provides the battle ground for your warriors. Play the
        game, inspect the core and debug your code from your web browser!
      </FeatureDescription>
      <div className="flex flex-1 md:flex-feature justify-center">
        <img
          className="w-screen md:w-full"
          src={SimulatorImage}
          alt={`Animated core simulator example`}
        />
      </div>
    </Feature>
    <Feature className="bg-defaultbg">
      <div className="flex flex-1 md:flex-feature justify-center">
        <img
          className="w-screen md:w-full"
          src={ParserImage}
          alt={`Animated parser usage example`}
        />
      </div>
      <FeatureDescription>
        Our powerful Redcode editor makes it easy to write warriors and through real-time code
        analysis improve the quality of your programs. The perfect canvas on which to craft your
        masterpiece.
      </FeatureDescription>
    </Feature>

    <section className="flex flex-wrap justify-center m-4 md:mx-16 md:mt-4 md:mb-8">
      <Guidance>
        <Octicon className="text-5xl" name="mortar-board" />
        <h3 className="m-2 md:m-4 text-xl font-light text-lightgrey">Experienced player</h3>
        <p className="text-blue font-code text-base p-4 text-center mx-8">
          I’ve played corewar before and understand the instructions and concepts
        </p>
        <PrimaryButton href="/app/editor/src">Play Now</PrimaryButton>
        <GuidanceText>
          Head over to the app and follow the interactive guide to explore the features
        </GuidanceText>
      </Guidance>
      <Guidance>
        <Octicon className="text-5xl" name="law" />
        <h3 className="m-2 md:m-4 text-xl font-light text-lightgrey">New to the game</h3>
        <p className="text-blue font-code text-base p-4 text-center mx-8">
          I’ve done some coding before but never played corewar
        </p>
        <FeatureButton href="/learn">View Tutorial</FeatureButton>
        <GuidanceText>
          Run through the tutorial to understand the basics of corewar first, then head over the app
          to test what you've learned.
        </GuidanceText>
      </Guidance>
    </section>

    <section
      id={`roadmap`}
      className="flex flex-col justify-center items-center min-h-cta text-xl bg-defaultbg"
    >
      <h2 className="font-light m-8">The roadmap</h2>
      <Octicon name="milestone" className="m-4 mb-16 text-blue text-5xl" />
    </section>
    <section className="flex flex-col flex-wrap mb-8">
      {roadMapItems
        .filter(x => x.complete)
        .map(item => (
          <RoadmapItem key={item.leftText} item={item} />
        ))}

      <div className="w-1/2 my-8 mx-auto border-b-2 border-lightbg text-lg p-4 text-center">
        <h3 className="font-light leading-10">Future development</h3>
      </div>

      {roadMapItems
        .filter(x => x.complete === false)
        .map(item => (
          <RoadmapItem key={item.leftText} item={item} />
        ))}
    </section>
    <section className="flex flex-col justify-center items-center min-h-cta text-xl bg-defaultbg">
      <h2 className="font-light m-8">Check out the app</h2>
      <Octicon name="beaker" className="m-4 text-blue text-5xl mb-16" />
      <PrimaryButton href="/app/editor/src">Play Now</PrimaryButton>
    </section>
    <footer className="flex flex-wrap justify-center items-center bg-defaultbg font-thin text-base font-code">
      &copy; 2018{' '}
      <a href="http://www.corewar.io" className="text-blue inline-block py-0 px-4 hover:underline">
        www.corewar.io
      </a>{' '}
      - crafted with love by{' '}
      <a
        href="https://github.com/gareththegeek"
        className="text-blue inline-block py-0 px-4 hover:underline"
      >
        @gareththegeek
      </a>{' '}
      &amp;{' '}
      <a
        href="https://github.com/dougajmcdonald/"
        className="text-blue inline-block py-0 px-4 hover:underline"
      >
        @dougajmcdonald
      </a>
    </footer>
  </main>
)

export default Home
