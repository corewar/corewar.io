import React from 'react'
import MessagePanel from './messagePanel'

const ParseContainer = ({ redcode, parseResult }) => {

  return <section>
    {redcode}
    <MessagePanel {...parseResult}/>
  </section>


}

export default ParseContainer;