import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import { colour, font, space, icon } from '../common/theme'
import { media } from '../common/mediaQuery'

import SiteNav from '../common/siteNav'
import HeroLogo from '../common/heroLogo'
import FeatureButton from '../common/featureButton'

import SimulatorImage from '../../img/corewarx200.gif'
import ParserImage from '../../img/redcode.gif'

// const Features = styled.section`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: center;
//   margin: ${space.m} ${space.xl} ${space.l} ${space.xl};
//   ${media.phone`margin: ${space.m};`}
// `

const Feature = styled.div`
  border-right: 1px solid ${colour.lightbg};
  ${media.tablet`border-right: none;`};
  ${media.tablet`border-bottom: 1px solid ${colour.lightbg}; padding-bottom: ${space.l};`};

  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-height: 200px;
  margin-top: ${space.l};

  :first-child {
    .octicon {
      color: ${colour.warrior[1]};
    }
    li .octicon {
      color: ${colour.white};
    }
  }

  :last-child {
    border: none;

    .octicon {
      color: ${colour.warrior[4]};
    }
    li .octicon {
      color: ${colour.white};
    }
  }

  .octicon {
    font-size: ${font.xlarge};
    color: ${colour.warrior[2]};
  }

  h3 {
    margin: ${space.m};
    ${media.tablet`margin: ${space.s}`};
    font-size: ${font.large};
    font-weight: 300;
    color: ${colour.lightgrey};
  }

  p {
    color: ${colour.blue};
    font-family: ${font.code};
    line-height: 1.5em;
    font-size: ${font.base};
    padding: ${space.m};
    text-align: center;
    margin-left: ${space.xl};
    margin-right: ${space.xl};

    ${media.desktop`margin-left: ${space.s};`};
    ${media.desktop`margin-right: ${space.s};`};

    min-height: 80px;
  }

  :hover {
    cursor: pointer;
    .guidance {
      opacity: 1;
      transition: 0.5s;
    }
  }

  ul {
    margin: ${space.m};

    li {
      margin: ${space.s};
      font-weight: 300;
      line-height: ${font.large};

      .octicon {
        font-size: ${font.base};
        margin-right: ${space.m};
        color: ${colour.white};
      }
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

  .octicon.octicon-hubot {
    color: ${colour.white};
    font-size: ${font.xlarge};
    padding: ${space.m};
  }
`
const SpeechArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;

  border-right: 10px solid ${colour.defaultbg};
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

const Prospect = styled.section.attrs({
  id: props => props.id
})`
  min-height: 250px;
  background-color: ${colour.defaultbg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${font.large};

  h2 {
    margin: ${space.l};
    font-weight: 300;
  }

  .octicon {
    font-size: ${icon.xlarge};
    color: ${colour.blue};
    margin: ${space.m};
  }
`

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: ${colour.defaultbg};
  font-weight: 200;
  font-size: ${font.base};
  font-family: ${font.code};

  a {
    color: ${colour.blue};
    display: inline-block;
    padding: 0 ${space.m};
  }
`

const RoadmapItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  grid-template-rows: 80px 1fr;
  min-height: 200px;
  font-weight: 300;
`

const Timeline = styled.div`
  background-color: ${colour.white};
  border-radius: 4px;
  width: 5px;
  height: 100%;
  grid-column-start: 2;
  margin-left: calc(50% - 4px);
`

const IconWrapper = styled.div`
  grid-column-start: 2;
  grid-row-start: 1;
  justify-self: center;
  align-self: center;

  .octicon {
    ${props => props.colour && `color: ${props.colour};`}
    font-size: ${font.large};
    text-align: center;
  }
`

const RoadmapText = styled.div`
  ${props => props.left && `justify-self: end; text-align: right; padding-left: ${space.m};`}
  ${props => props.right && `justify-self: start; padding-right: ${space.m};`}
  grid-row: 1 / 3;
  font-size: ${font.base};

  line-height: ${font.large};

  max-width: 350px;
  align-self: flex-start;
  padding-top: calc(${space.m} + ${space.s});
  color: ${colour.white};
`

const FeatureDescription = styled.div`
  font-size: ${font.large};
  ${media.phone`font-size: ${font.base};`}
  line-height: ${font.xlarge};
  ${media.phone`line-height: ${font.large};`}
  margin: ${space.xl};
  ${media.phone`margin: ${space.m};`}
  ${media.tablet`margin: ${space.m};`}
  ${media.desktop`margin: ${space.m};`}
  font-weight: 300;
  flex: 0.4;
  ${media.phone`flex: 1;`}
  ${media.tablet`flex: 1;`}
  ${media.desktop`flex: 1;`}
`

const FeatureImageWrapper = styled.div`
  flex: 0.4;
  display: flex;
  justify-content: center;
  ${media.desktop`
    flex: 1;
    img {
      width: 100%;
      height: 100%;

    }
  `}
  ${media.tablet`
    flex: 1;
    img {
      width: calc(100vw - ${space.xl} - ${space.xl});
    }
  `}
  ${media.phone`
    flex: 1;
    img {
      width: calc(100vw - ${space.l} - ${space.l});
    }
  `}
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
    <section className="flex flex-wrap items-center justify-center p-8 my-4 md:my-16 mx-0">
      <FeatureDescription>
        Our interactive Corewar Simulator provides the battle ground for your warriors. Play the
        game, inspect the core and debug your code from your web browser!
      </FeatureDescription>
      <FeatureImageWrapper>
        <img src={SimulatorImage} alt={`Animated core simulator example`} />
      </FeatureImageWrapper>
    </section>
    <section className="flex flex-wrap justify-center items-center p-8 my-16 mx-0 bg-defaultbg">
      <FeatureImageWrapper>
        <img src={ParserImage} alt={`Animated parser usage example`} />
      </FeatureImageWrapper>
      <FeatureDescription>
        Our powerful Redcode editor makes it easy to write warriors and through real-time code
        analysis improve the quality of your programs. The perfect canvas on which to craft your
        masterpiece.
      </FeatureDescription>
    </section>
    <section className="flex flex-wrap justify-center m-4 md:mx-16 md:mt-4 md:mb-8">
      <Feature>
        <Octicon name="mortar-board" />
        <h3>Experienced player</h3>
        <p>I’ve played corewar before and understand the instructions and concepts</p>
        <PrimaryButton href="/app/editor/src">Play Now</PrimaryButton>
        <Guidance>
          <Octicon name="hubot" />
          <SpeechArrow />
          <SpeechBubble>
            You should head over to the app and follow the interactive guide to explore the features
          </SpeechBubble>
        </Guidance>
      </Feature>
      <Feature>
        <Octicon name="law" />
        <h3>New to the game</h3>
        <p>I’ve done some coding before but never played corewar</p>
        <FeatureButton href="/learn">View Tutorial</FeatureButton>
        <Guidance>
          <Octicon name="hubot" />
          <SpeechArrow />
          <SpeechBubble>
            You should run through the tutorial to understand the basics of corewar first, then head
            over the app to test what you've learned.
          </SpeechBubble>
        </Guidance>
      </Feature>
    </section>
    <Prospect id={`roadmap`}>
      <h2>The roadmap</h2>
      <Octicon name="milestone" />
    </Prospect>
    <section className="flex flex-col flex-wrap mb-8">
      <RoadmapItem>
        <RoadmapText left>November 2017</RoadmapText>
        <IconWrapper colour={colour.blue}>
          <Octicon name="light-bulb" />
        </IconWrapper>
        <RoadmapText right>
          The idea to develop corewar as a modern web app is concieved
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>March 2018</RoadmapText>
        <IconWrapper colour={colour.blue}>
          <Octicon name="calendar" />
        </IconWrapper>
        <RoadmapText right>
          Public beta, allowing players to experience the initial feature set
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>Today</RoadmapText>
        <IconWrapper colour={colour.blue}>
          <Octicon name="megaphone" />
        </IconWrapper>
        <RoadmapText right>
          We are now actively listening for user feedback whilst we build the next set of features
          but here’s what we had in mind
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

      <div className="w-1/2 my-8 mx-auto border-b-2 border-lightbg text-lg p-4 text-center">
        <h3 className="font-light leading-10">Future development</h3>
      </div>

      <RoadmapItem>
        <RoadmapText left>Log in &amp; Warrior Management</RoadmapText>
        <IconWrapper colour={colour.blue}>
          <Octicon name="git-commit" />
        </IconWrapper>
        <RoadmapText right>
          Create an account and build up your warriors, including file versioning and statistics
          over time
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>Live online hills</RoadmapText>
        <IconWrapper colour={colour.blue}>
          <Octicon name="git-commit" />
        </IconWrapper>
        <RoadmapText right>
          We will host and run hills for all skill levels. Which will allow you to submit you
          warriors online and see the results in realtime
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>Private hills</RoadmapText>
        <IconWrapper colour={colour.blue}>
          <Octicon name="git-commit" />
        </IconWrapper>
        <RoadmapText right>
          Want to play with just your friends? We will add invite only hills so you can chose the
          rules and the players
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>Corewar challenges</RoadmapText>
        <IconWrapper colour={colour.blue}>
          <Octicon name="git-commit" />
        </IconWrapper>
        <RoadmapText right>
          Feel like you’ve done all corewar can offer? We will develop specific challenges and
          situations to challenge the most experienced players
        </RoadmapText>
        <Timeline />
      </RoadmapItem>
    </section>
    <Prospect>
      <h2>Check out the app</h2>
      <Octicon name="beaker" />
      <PrimaryButton href="/app/editor/src">Play Now</PrimaryButton>
    </Prospect>
    <Footer>
      &copy; 2018 <a href="http://www.corewar.io">www.corewar.io</a> - crafted with love by{' '}
      <a href="https://github.com/gareththegeek">@gareththegeek</a> &amp;{' '}
      <a href="https://github.com/dougajmcdonald/">@dougajmcdonald</a>
    </Footer>
  </main>
)

export default Home
