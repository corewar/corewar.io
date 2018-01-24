import React from 'react'

import './messagePanel.css'

const MessagePanel = ({ messages }) => (

  <section className="messagePanel">
    <span className="sectionSubTitle">parse result</span>
    <ul>
    {
      messages && messages.map((msg) => (
        <li key={msg} className="error">{`[${msg.position.line} , ${msg.position.char}] ${messageTypeToString(msg.type)} ${msg.text}`}</li>
      ))
    }
    </ul>
  </section>

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