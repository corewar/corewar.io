import React from 'react'
import styled from 'styled-components'

import { colour, space, font } from '../common/theme'
import { media } from '../common/mediaQuery'

const ParseMessageWrapper = styled.div`
  ${props => props.messages && props.messages.length > 0 ? `display: block;` : `display: none;`}
  position: absolute;
  bottom: 0;
  min-height: 100px;
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

const MessageRow = styled.div`
  display: grid;
  grid-template-columns: 50px 50px 90px 1fr;
  padding: ${space.xs};
  font-family: ${font.code};
`

const StyledMessageText = styled.span`
  color: ${colour.white};
`

const ColouredMessageText = styled.span`
 ${props => !props.type && `color: ${colour.white};`}
 ${props => props.type === 0 && `color: ${colour.error};`}
 ${props => props.type === 1 && `color: ${colour.warning};`}
 ${props => props.type === 2 && `color: ${colour.info};`}
`

const MessagePanel = ({ messages }) => (

  <ParseMessageWrapper messages={messages}>
    <MessageRow>
      <span>line</span>
      <span>char</span>
      <span>type</span>
      <span>message</span>
    </MessageRow>
    {
      messages && messages.map((msg, i) => (
        <MessageRow key={`${msg}_${i}`}>
          <span>{msg.position.line}</span>
          <span>{msg.position.char}</span>
          <ColouredMessageText type={msg.type}>{messageTypeToString(msg.type)}</ColouredMessageText>
          <ColouredMessageText>{msg.text}</ColouredMessageText>
        </MessageRow>
      ))
    }
  </ParseMessageWrapper>

)

const messageTypeToString = (messageType) => {
  switch (messageType) {
      case 0: //MessageType.Error
          return 'ERROR';
      case 1: // MessageType.Warning
          return 'WARNING';
      case 2: // MessageType.Info
          return 'INFO';
      default:
          return '';
  }
}

export default MessagePanel