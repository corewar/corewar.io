import React from 'react'
import Octicon from 'react-octicon'

import SpeechBubble from './speechBubble'

export default ({ children }) => (
  <section className="md:opacity-0 flex flex-row items-center justify-start m-4 md:m-8">
    <Octicon className="text-4xl p-8" name="hubot" />
    <SpeechBubble>{children}</SpeechBubble>
  </section>
)
