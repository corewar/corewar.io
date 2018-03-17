import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import WarriorPanel from '../common/warriorPanel'

import { colour, font, space } from '../common/theme'
import { media } from '../common/mediaQuery'

import {
  removeWarrior,
  loadWarrior,
  addWarrior,
  toggleWarrior
} from '../parser/actions'

const WarriorWrapper = styled.div`

  ${props => props.current && media.tablet`background-color: ${colour.lightbg};`}
  ${props => props.current && `border-bottom: 2px solid ${colour.coral};`}

  height: 100%;
  min-width: 120px;
  width: auto;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 30px 1fr 20px 20px;
  grid-column-gap: ${space.s};
  padding-left: ${space.s};
  align-items: center;
  border-left: 1px solid ${colour.defaultbg};
  border-right: 1px solid ${colour.defaultbg};
  position: relative;

  ${media.tablet`
    min-width: 100%;
    min-height: 40px;
    height: 100px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px 20px 20px;
    grid-row-gap: ${space.s};
    justify-items: center;
    padding: ${space.l} 0 ${space.s} 0;
    border-bottom: 1px solid ${colour.lightbg};
  `}


  :hover {
    cursor: pointer;
  }

  .octicon-x {
    color: ${colour.grey};
    text-align: right;
    width: 100%;
    height: ${space.m};
    position: absolute;
    top: 2px;
    right: 1px;
  }

  .octicon-primitive-dot {
    ${props => props.active ? `color: ${colour.success};` : `color: ${colour.error};`}
    font-size: ${font.large};
    padding-left: ${space.s};
  }
`

const WarriorName = styled.span`
  color: ${colour.white};
  font-size: ${font.small};
`

const NewButton = styled.div`
  width: 100px;
  ${media.tablet`
    height: ${space.controls};
    width: 100%;
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  color: ${colour.white};

  :hover {
    cursor: pointer;
  }
`

const WarriorManagerContainer = ({ warriors, currentWarrior, addWarrior, loadWarrior,
  toggleWarrior, removeWarrior, currentFileIndex }) => (
  <WarriorPanel>
    <NewButton onClick={addWarrior}>
      <Octicon name={`plus`} />
    </NewButton>
    {warriors.map((warrior,i) => (
      <WarriorWrapper
        key={`${warrior.hash}_${i}`}
        current={currentFileIndex === i}
        active={!warrior.hasErrors && warrior.active}>

        {warrior.icon &&
          <img
            onClick={() => loadWarrior(warrior.hash, i)}
            src={`data:image/svg+xml;base64,${warrior.icon}`}
            alt={`${warrior.metaData.name} avatar`}
            size={20} />
        }
        <WarriorName>{warrior.metaData.name}</WarriorName>
        <Octicon
          name={`primitive-dot`}
          onClick={() => toggleWarrior(i)}/>
        {<Octicon name={`x`} onClick={() => removeWarrior(i)} />}
      </WarriorWrapper>
    ))}
  </WarriorPanel>

)


const mapStateToProps = state => ({
  currentWarrior: state.parser.currentWarrior,
  warriors: state.parser.warriors,
  currentFileIndex: state.parser.currentFileIndex
})

export default connect(
  mapStateToProps,
  {
    addWarrior,
    removeWarrior,
    loadWarrior,
    toggleWarrior
  }
)(WarriorManagerContainer)

export { WarriorManagerContainer as PureWarriorManagerContainer }