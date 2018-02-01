import React from 'react'
import styled from 'styled-components'

import { colour } from '../../styles/theme'

const ParseMessageWrapper = styled.div`

  display: none;
  position: absolute;
  bottom: 0;
  height: 0;
  width: 100%;
  background-color: ${colour.lightbg};
  border-top: 1px solid ${colour.grey};

`


const MessagePanel = ({ messages }) => (

  <ParseMessageWrapper>
    <ul>
    {
      messages && messages.map((msg) => (
        <li key={msg} className="error">{`[${msg.position.line} , ${msg.position.char}] ${messageTypeToString(msg.type)} ${msg.text}`}</li>
      ))
    }
    </ul>
  </ParseMessageWrapper>

)

const messageTypeToString = (messageType) => {
  switch (messageType) {
      case 0: //MessageType.Error
          return 'ERROR: ';
      case 1: // MessageType.Warning
          return 'WARNING: ';
      case 2: // MessageType.Info
          return 'INFO: ';
      default:
          return '';
  }
}

export default MessagePanel