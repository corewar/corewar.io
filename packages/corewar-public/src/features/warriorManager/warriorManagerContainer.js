import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Octicon from 'react-octicon'
import Media from 'react-media'

import WarriorPanel from '../common/warriorPanel'
import FontAwesomeButton from '../common/fontAwesomeButton'

import { colour, font, space } from '../common/theme'
import { media, sizes } from '../common/mediaQuery'

import { removeWarrior, loadWarrior, addWarrior, toggleWarrior } from '../parser/actions'

const WarriorWrapper = styled.div`

  ${props => props.current && media.desktop`background-color: ${colour.lightbg};`}
  ${props => props.current && `border-bottom: 2px solid ${colour.blue};`}

  height: calc(100% - 2px);
  min-width: 120px;
  width: auto;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 30px 100px 30px 30px;
  padding-left: ${space.s};
  align-items: center;
  border-left: 1px solid ${colour.defaultbg};
  position: relative;
  font-family: ${font.default};

  ${media.desktop`
    min-width: 100%;
    min-height: 40px;
    height: 100px;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: ${space.s};
    justify-items: center;
    padding: ${space.m} 0 ${space.s} 0;
    border-bottom: 1px solid ${colour.darkbg};
  `}

  img:hover {
    cursor: pointer;
  }

  .octicon-x {
    color: ${colour.grey};
    text-align: right;
    height: ${space.s};
    position: absolute;
    top: 2px;
    right: 1px;
  }

  .octicon-x:hover {
    cursor: pointer;
  }

  .octicon-primitive-dot {
    ${props => (props.active ? `color: ${colour.success};` : `color: ${colour.error};`)}
    font-size: ${font.large};
    padding-left: ${space.s};

    :hover {
      cursor: pointer;
    }
  }
`

const WarriorName = styled.span`
  color: ${colour.white};
  font-size: ${font.small};
  padding: ${space.m} ${space.s};
  word-break: break-word;
  text-align: center;
  ${media.desktop`
    padding: 0 ${space.xs} 0 ${space.xs};
  `}
    :hover {
    cursor: pointer;
  }
`

const NewButton = styled.div`
  display: flex;
  width: 100px;
  border-left: 2px solid ${colour.darkbg};
  border-bottom: 1px solid ${colour.defaultbg};
  ${media.desktop`
    height: ${space.controls};
    width: 100%;
  `} align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  color: ${colour.white};

  :hover {
    cursor: pointer;
  }
`

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 210px);
  height: 100%;

  ${media.desktop`
    display: inherit;
    grid-template-columns: 1fr;
    height: auto;
  `};
`

const WarriorManagerContainer = ({
  warriors,
  currentWarrior,
  addWarrior,
  loadWarrior,
  toggleWarrior,
  removeWarrior,
  toggleSettings
}) => (
  <WarriorPanel>
    <Media
      query={{ maxWidth: sizes.desktop }}
      render={() => (
        <NewButton onClick={addWarrior}>
          <Octicon name={`plus`} />
        </NewButton>
      )}
    />
    <ListWrapper>
      {warriors.map((warrior, i) => (
        <WarriorWrapper
          key={`${warrior.data.hash}_${i}`}
          current={currentWarrior.data.id === warrior.data.id}
          active={!warrior.data.hasErrors && warrior.data.active}
        >
          {warrior.data.icon && (
            <img
              onClick={() => loadWarrior(warrior.data.id)}
              src={`data:image/svg+xml;base64,${warrior.data.icon}`}
              alt={`${warrior.metaData.name} avatar`}
              size={20}
            />
          )}
          <WarriorName onClick={() => loadWarrior(warrior.data.id)}>
            {warrior.metaData.name}
          </WarriorName>
          <Octicon name={`primitive-dot`} onClick={() => toggleWarrior(warrior.data.id)} />
          {<Octicon name={`x`} onClick={() => removeWarrior(warrior.data.id)} />}
        </WarriorWrapper>
      ))}
    </ListWrapper>
    <Media
      query={{ maxWidth: sizes.desktop }}
      render={() => <FontAwesomeButton iconName={`cog`} handleClick={toggleSettings} />}
    />
  </WarriorPanel>
)

const mapStateToProps = state => ({
  currentWarrior: state.parser.currentWarrior,
  warriors: state.parser.warriors,
  currentFileIndex: state.parser.currentFileIndex
})

export default connect(mapStateToProps, {
  addWarrior,
  removeWarrior,
  loadWarrior,
  toggleWarrior
})(WarriorManagerContainer)

export { WarriorManagerContainer as PureWarriorManagerContainer }
