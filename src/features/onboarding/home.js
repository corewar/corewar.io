import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import { colour, font, space } from '../common/theme'
import { media } from '../common/mediaQuery'

const HomeGrid = styled.main`
  display: grid;
  grid-template-rows: ${space.header} 52vh auto 250px auto 250px 1fr auto 100px;
  grid-template-columns: 100%;
  color: ${colour.white};
  font-smooth: always;
`

const Header = styled.header`
  display: flex;
  flex-direction: row-reverse;
  margin-left: ${space.xl};
  margin-right: ${space.xl};

  nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  a {
    color: ${colour.white};
    display: inline-block;
    min-width: 100px;
    text-decoration: none;
    font-weight: 400;
    text-align: center;
  }
`

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${font.xxlarge};
  ${media.phone`font-size: ${font.xlarge}`}
  font-weight: 200;
  margin-top: ${space.l};

  border-bottom: 1px solid ${colour.lightbg};
  margin-left: ${space.xl};
  margin-right: ${space.xl};

  span {
    font-weight: 300;
  }

  .octicon {
    font-size: ${font.xxlarge};
    ${media.tablet`font-size: ${font.xlarge};`}
    color: ${colour.blue};
    margin: ${space.l};
    margin-bottom: ${space.s};
    padding-left: ${space.l};
  }

`

const Features = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: ${space.m} ${space.xl} ${space.l} ${space.xl};
  ${media.phone`margin: ${space.m};`}
`

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

  :last-child {
    border: none;

    .octicon {
      color: ${colour.warrior[4]};
    }

  }

  :first-child {
    .octicon {
      color: ${colour.warrior[1]};
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

  border-right: 10px solid  ${colour.defaultbg};
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

const FeatureButton = styled.a`
  border: 2px solid ${colour.white};
  border-radius: 5px;
  margin: ${space.m};
  padding: ${space.m};
  background: none;
  display: inline-block;
  min-width: 200px;
  color: ${colour.white};
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: 0.2s;

  :hover {
    color: ${colour.coral};
    background-color: ${colour.lightbg};
    cursor: pointer;
    transition: 0.2s;
  }
`

const PrimaryButton = FeatureButton.extend`
  background: ${colour.white};
  color: ${colour.darkbg};
  transition: 0.2s;
`

const Prospect = styled.section.attrs({
  id: props => props.id
})`
  min-height: 250px;
  background-color: ${colour.coral};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${font.large};

  h2 {
    margin: ${space.l};
  }

  .octicon {
    font-size: ${font.xxlarge};
    color: ${colour.blue};
    margin: ${space.m};
  }
`

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colour.lightbg};
`

const Roadmap = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: ${space.l};
`

const RoadmapItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  grid-template-rows: 80px 1fr;
  min-height: 200px;

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
    font-size: ${font.xlarge};
    text-align: center;
  }
`

const RoadmapText = styled.div`
  ${props => props.left && `justify-self: end; text-align: right; padding-left: ${space.m};`}
  ${props => props.right && `justify-self: start; padding-right: ${space.m};`}
  grid-row: 1 / 3;
  font-size: ${font.base};

  line-height: 1.5em;

  max-width: 350px;
  align-self: center;
  color: ${colour.lightgrey};
`

const TimelineDivider = styled.div`
  width: 80%;
  margin: ${space.l} 10% ${space.l} 10%;
  border-bottom: 2px solid ${colour.grey};
  font-size: ${font.large};
  padding: ${space.m};
  text-align: center;

  h3 {
    text-align: center;
  }
`

const Home = () => (
  <HomeGrid>
    <Header>
      <nav>
        <a href={`/app/src`}>play</a>
        <a href={`#who-are-you`}>learn</a>
        <a href={`#roadmap`}>features</a>
        <a href={`https://github.com/gareththegeek/corewar`}>code</a>
      </nav>
    </Header>
    <Hero>
      <h1>corewar<span>.io</span></h1>
      <Octicon name='chevron-down' />
    </Hero>
    <Features>
      <Feature>
        <Octicon name='rocket' />
        <h3>play corewar</h3>
        <p>Enjoy a slice of coding history by playing and learning the classic game corewar</p>
        <PrimaryButton href='/app/src'>Play Now</PrimaryButton>
      </Feature>
      <Feature>
        <Octicon name='device-mobile' />
        <h3>on any device</h3>
        <p>Our web platform gives the ability to play where and when you want on any system with no installs</p>
        <FeatureButton href='#who-are-you'>Learn more</FeatureButton>
      </Feature>
      <Feature>
      <Octicon name='megaphone' />
        <h3>in new ways</h3>
        <p>We have a fully featured roadmap bringing new ideas to the well established corewar player</p>
        <FeatureButton href='#roadmap'>View Roadmap</FeatureButton>
      </Feature>
    </Features>
    <Prospect id={`who-are-you`}>
      <h2>What best describes you?</h2>
      <Octicon name='person' />
    </Prospect>
    <Features>
      <Feature>
        <Octicon name='mortar-board' />
        <h3>experienced player</h3>
        <p>I’ve played corewar before and understand the instructions and concepts</p>
        <PrimaryButton href='/app/src'>Play Now</PrimaryButton>
        <Guidance>
          <Octicon name='hubot' />
          <SpeechArrow />
          <SpeechBubble>
            You should head over to the app and follow the tutorial to explore the features
          </SpeechBubble>
        </Guidance>
      </Feature>
      <Feature>
        <Octicon name='law' />
        <h3>new to the game</h3>
        <p>I’ve done some coding before but never played corewar</p>
        <FeatureButton>Learn more</FeatureButton>
        <Guidance>
          <Octicon name='hubot' />
          <SpeechArrow />
          <SpeechBubble>
            You should take a look at the app and run through the tutorial, then follow some of our
            guides to get a better idea of what corewar is all about
          </SpeechBubble>
        </Guidance>
      </Feature>
      <Feature>
      <Octicon name='unverified' />
        <h3>total beginner</h3>
        <p>I’ve never done any coding or heard of corewar</p>
        <FeatureButton>Is it for me?</FeatureButton>
        <Guidance>
          <Octicon name='hubot' />
          <SpeechArrow />
          <SpeechBubble>
            We're not going to tell fibs, corewar can be tricky. However if you start with the simple
            intro guide and stick with it, you can learn a lot and enjoy the world of corewar
          </SpeechBubble>
        </Guidance>
      </Feature>
    </Features>
    <Prospect id={`roadmap`}>
      <h2>The roadmap</h2>
      <Octicon name='milestone' />
    </Prospect>
    <Roadmap>
      <RoadmapItem>
        <RoadmapText left>The idea to develop corewar as a modern web app is concieved</RoadmapText>
        <IconWrapper colour={colour.warrior[2]}>
          <Octicon name='light-bulb' />
        </IconWrapper>
        <RoadmapText right>November 2017</RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>March 2018</RoadmapText>
        <IconWrapper colour={colour.blue}>
          <Octicon name='calendar' />
        </IconWrapper>
        <RoadmapText right>Public beta, allowing players to experience the initial feature set</RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>
          We are now actively listening for user feedback whilst we build
          the next set of features but here’s what we had in mind
        </RoadmapText>
        <IconWrapper colour={colour.warrior[3]}>
          <Octicon name='megaphone' />
        </IconWrapper>
        <RoadmapText right>Today</RoadmapText>
        <Timeline />
      </RoadmapItem>

      <TimelineDivider>
        <h3>Future development</h3>
      </TimelineDivider>

      <RoadmapItem>
        <RoadmapText left>
          Log in &amp; Warrior Management
        </RoadmapText>
        <IconWrapper colour={colour.warrior[2]}>
          <Octicon name='git-commit' />
        </IconWrapper>
        <RoadmapText right>
          Create an account and build up your warriors,
          including file versioning and statistics over time
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>
          We will host and run hills for all skill levels. Which will allow you to submit you warriors online
          and see the results in realtime
        </RoadmapText>
        <IconWrapper colour={colour.coral}>
          <Octicon name='git-commit' />
        </IconWrapper>
        <RoadmapText right>
          Live online hills
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>
          Private hills
        </RoadmapText>
        <IconWrapper colour={colour.warrior[4]}>
          <Octicon name='git-commit' />
        </IconWrapper>
        <RoadmapText right>
          Want to play with just your friends? We will add invite only hills so you can chose the rules
          and the players
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

      <RoadmapItem>
        <RoadmapText left>
          Feel like you’ve done all corewar can offer? We will develop specific challenges and situations to challenge
          the most experienced players
        </RoadmapText>
        <IconWrapper colour={colour.blue}>
          <Octicon name='git-commit' />
        </IconWrapper>
        <RoadmapText right>
          Corewar challenges
        </RoadmapText>
        <Timeline />
      </RoadmapItem>

    </Roadmap>
    <Prospect>
      <h2>Check out the app</h2>
      <Octicon name='beaker' />
      <PrimaryButton>
        Play Now
      </PrimaryButton>
    </Prospect>
    <Footer>
      &copy; 2018
    </Footer>
  </HomeGrid>
)

export default Home
