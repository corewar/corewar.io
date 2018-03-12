import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import WarriorPanel from '../common/warriorPanel'

import { colour, font, space } from '../common/theme'

import {
  removeWarrior,
  loadWarrior,
  addWarrior,
  toggleWarrior
} from '../parser/actions'

const WarriorWrapper = styled.div`
  ${props => props.current && `background-color: ${colour.lightbg};`}
  min-height: 40px;
  height: 100px;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  width: 100%;
  padding: ${space.s} 0;
  border-bottom: 1px solid ${colour.lightbg};

  :hover {
    cursor: pointer;
  }

  .octicon-broadcast {
    ${props => props.active ? `color: ${colour.blue};` : `color: ${colour.coral};`}
  }
`

const WarriorName = styled.span`
  color: ${colour.white};
  font-size: ${font.small};
`

const NewButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${colour.white};
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
        onClick={() => loadWarrior(warrior.hash, i)}
        current={currentFileIndex === i}
        active={warrior.active}>
        <WarriorName>{warrior.metaData.name}</WarriorName>
        <img
          src={`data:image/svg+xml;base64,${warrior.icon}`}
          alt={`${warrior.metaData.name} avatar`}
          size={20} />
        <Octicon
          name={`broadcast`}
          onClick={() => toggleWarrior(i)}/>
        {i > 0 && <Octicon name={`x`} onClick={() => removeWarrior(i)} />}
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