import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import { colour, font, space } from '../common/theme'
import { media } from '../common/mediaQuery'

import SiteNav from '../common/siteNav'
import HeroLogo from '../common/heroLogo'
import FeatureButton from '../common/featureButton'
import RoadmapItem from './roadmapItem'

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

const Feature = styled.div`
  ${media.tablet`border-right: none;`};
  ${media.tablet`border-bottom: 1px solid ${colour.lightbg}; padding-bottom: ${space.l};`};

  :hover {
    cursor: pointer;
    .guidance {
      opacity: 1;
      transition: 0.5s;
    }
  }
`

const Guidance = styled.div.attrs({
  className: 'guidance'
})`
  opacity: 0;
  ${media.tablet`opacity: 1;`}
  transition: 0.5s;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: ${space.l};
  ${media.phone`margin: ${space.m};`}
`

const SpeechBubble = styled.div`
  border-radius: 10px;
  background-color: ${colour.defaultbg};
  min-height: 200px;
  margin-right: ${space.l};
  padding: ${space.m};
  line-height: 1.5em;
  text-align: center;
  color: ${colour.white};
  font-family: ${font.code};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const PrimaryButton = FeatureButton.extend`
  background: ${colour.white};
  color: ${colour.darkbg};
  transition: 0.2s;
  font-weight: bold;
`

const Home = () => (
  <main className="grid grid-rows-home-grid text-white bg-darkbg">
    <SiteNav />
    <HeroLogo />
    <div className="flex flex-row flex-wrap justify-center items-center content-center mb-16 min-h-cta">
      <PrimaryButton href="/app/editor/src">Play Now</PrimaryButton>
      <FeatureButton href="/learn">Learn more</FeatureButton>
    </div>
    <section className="flex items-center justify-center bg-defaultbg min-h-cta" id={`features`}>
      <h2 className="w-2/3 md:w-3/4 lg:w-1/2 font-light text-2xl text-blue leading-10 m-4 text-center my-16">
        This is Corewar where players test their coding skills against each other, writing warriors
        which battle for control of the core. Do you have what it takes to become the King of the
        Hill?
      </h2>
    </section>
    <section className="flex flex-row flex-wrap items-center justify-center p-8 my-4 md:my-16 mx-0">
      <div className="text-2xl leading-10 m-16 font-light md:flex-feature">
        Our interactive Corewar Simulator provides the battle ground for your warriors. Play the
        game, inspect the core and debug your code from your web browser!
      </div>
      <div className="flex flex-1 md:flex-feature justify-center">
        <img
          className="w-screen md:w-full"
          src={SimulatorImage}
          alt={`Animated core simulator example`}
        />
      </div>
    </section>
    <section className="flex flex-wrap justify-center items-center p-8 my-4 md:my-16 mx-0 bg-defaultbg">
      <div className="flex flex-1 md:flex-feature justify-center">
        <img
          className="w-screen md:w-full"
          src={ParserImage}
          alt={`Animated parser usage example`}
        />
      </div>
      <div className="text-2xl leading-10 m-16 font-light md:flex-feature">
        Our powerful Redcode editor makes it easy to write warriors and through real-time code
        analysis improve the quality of your programs. The perfect canvas on which to craft your
        masterpiece.
      </div>
    </section>

    <section className="flex flex-wrap justify-center m-4 md:mx-16 md:mt-4 md:mb-8">
      <div className="flex flex-col items-center flex-1 min-h-200 mt-8">
        <Octicon className="text-5xl" name="mortar-board" />
        <h3 className="m-2 md:m-4 text-xl font-light text-lightgrey">Experienced player</h3>
        <p className="text-blue font-code text-base p-4 text-center mx-8">
          I’ve played corewar before and understand the instructions and concepts
        </p>
        <PrimaryButton href="/app/editor/src">Play Now</PrimaryButton>
        <Guidance>
          <Octicon className="text-4xl p-8" name="hubot" />
          <SpeechBubble>
            You should head over to the app and follow the interactive guide to explore the features
          </SpeechBubble>
        </Guidance>
      </div>
      <div className="flex flex-col items-center flex-1 min-h-200 mt-8">
        <Octicon className="text-5xl" name="law" />
        <h3 className="m-2 md:m-4 text-xl font-light text-lightgrey">New to the game</h3>
        <p className="text-blue font-code text-base p-4 text-center mx-8">
          I’ve done some coding before but never played corewar
        </p>
        <FeatureButton href="/learn">View Tutorial</FeatureButton>
        <Guidance>
          <Octicon className="text-4xl p-8" name="hubot" />
          <SpeechBubble>
            You should run through the tutorial to understand the basics of corewar first, then head
            over the app to test what you've learned.
          </SpeechBubble>
        </Guidance>
      </div>
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
          <RoadmapItem item={item} />
        ))}

      <div className="w-1/2 my-8 mx-auto border-b-2 border-lightbg text-lg p-4 text-center">
        <h3 className="font-light leading-10">Future development</h3>
      </div>

      {roadMapItems
        .filter(x => x.complete === false)
        .map(item => (
          <RoadmapItem item={item} />
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
