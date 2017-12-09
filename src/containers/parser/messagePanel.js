import React from 'react'

import ParseIcon from './parseIcon'


const MessagePanel = ({ messages }) => (

  <section>
    {/* {
      messages && messages.length === 0 ?
      <li>Parse successful</li> :
      messages.map((msg) => {
        <li>{`[${msg.position.line} , ${msg.position.char}] ${messageTypeToString(msg.type)} ${msg.text}`}</li>
      })
    } */}
    <ParseIcon success={messages && messages.length === 0} />
  </section>

)

const messageTypeToString = (messageType) => {
  switch (messageType) {
      case 0: //MessageType.Error
          return 'ERROR: ';
      case 1: // MessageType.Warning
          return 'WARNING: ';
      case 2: // MessageType.Info
          return '';
      default:
          return '';
  }
}

export default MessagePanel;