import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import WarriorPanel from '../common/warriorPanel'

import { colour, font, space } from '../common/theme'

import {
  removeWarrior,
  loadWarrior
} from '../parser/actions'

const WarriorWrapper = styled.div`
  ${props => props.current && `background-color: ${colour.lightbg};`}
  min-height: 40px;
  height: 100px;
  display: grid;
  justify-items: center;
  width: 100%;
  padding: ${space.s} 0;
  border-bottom: 1px solid ${colour.lightbg};

  :hover {
    cursor: pointer;
  }
`

const WarriorName = styled.span`
  color: ${colour.white};
  font-size: ${font.small};
`

const WarriorManagerContainer = ({ warriors, currentWarrior, loadWarrior, removeWarrior, currentFileIndex }) => (
  <WarriorPanel>
    {warriors.map((warrior,i) => (
      <WarriorWrapper
        key={`${warrior.hash}_${i}`}
        onClick={() => loadWarrior(warrior.hash, i)}
        current={currentFileIndex === i}>
        <WarriorName>{warrior.metaData.name}</WarriorName>
        {i > 0 && <Octicon name={`x`} onClick={() => removeWarrior(i)} />}
        <img
          src={`data:image/svg+xml;base64,${warrior.icon}`}
          alt={`${warrior.metaData.name} avatar`}
          size={20} />
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
    removeWarrior,
    loadWarrior
  }
)(WarriorManagerContainer)

export { WarriorManagerContainer as PureWarriorManagerContainer }