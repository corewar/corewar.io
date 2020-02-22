import React from 'react'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'

import { colour, space, font } from '../common/theme'
import { media } from '../common/mediaQuery'

const ConsoleWrapper = styled.div`
  ${props => (props.show ? `display: block;` : `display: none;`)}
  position: absolute;
  bottom: 0;
  min-height: 100px;
  max-height: 40%;
  overflow-y: hidden;
  height: auto;
  width: calc(50% - 5px);
  border-right: 1px solid ${colour.grey};
  ${media.desktop`
    width: calc(100% - ${space.s} - ${space.s});
    border-right: none;
  `};

  background-color: ${colour.lightbg};
  border-top: 1px solid ${colour.grey};
  padding: ${space.s};
  color: ${colour.grey};
`

export const MessageRow = styled.div`
  display: grid;
  grid-template-columns: 50px 50px 90px 1fr;
  padding: ${space.xs};
  font-family: ${font.code};
`

const ColouredMessageText = styled.span`
 ${props => !props.type && `color: ${colour.white};`}
 ${props => props.type === 0 && `color: ${colour.error};`}
 ${props => props.type === 1 && `color: ${colour.warning};`}
 ${props => props.type === 2 && `color: ${colour.info};`}
`

const CloseButton = styled.div`
  position: absolute;
  right: ${space.s};
  top: ${space.s};
  &:hover {
    cursor: pointer;
  }
`

const HeaderRow = styled(MessageRow)`
  font-weight: bold;
`

const Console = ({ messages, hideConsole, show }) => (
  <ConsoleWrapper messages={messages} show={show}>
    <CloseButton>
      <FontAwesome name={`times`} onClick={hideConsole} />
    </CloseButton>
    <HeaderRow>
      <span>line</span>
      <span>char</span>
      <span>type</span>
      <span>message</span>
    </HeaderRow>
    {messages &&
      messages.map((msg, i) => (
        <MessageRow key={`${msg}_${i}`}>
          <span>{msg.position.line}</span>
          <span>{msg.position.char}</span>
          <ColouredMessageText type={msg.type}>{messageTypeToString(msg.type)}</ColouredMessageText>
          <ColouredMessageText>{msg.text}</ColouredMessageText>
        </MessageRow>
      ))}
  </ConsoleWrapper>
)

const messageTypeToString = messageType => {
  switch (messageType) {
    case 0: //MessageType.Error
      return 'ERROR'
    case 1: // MessageType.Warning
      return 'WARNING'
    case 2: // MessageType.Info
      return 'INFO'
    default:
      return ''
  }
}

export default Console
