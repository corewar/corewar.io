import React from 'react'

import DocumentationContent from './documentationContent'

const Concepts = () => (
  <DocumentationContent>
    <h3>1. Core Concepts</h3>
    <p>
      Corewar is a coding game where you battle programs or 'warriors' against each other. The objective
      is to destroy the opposing warrior by causing them to execute a 'DAT' command.
    </p>
    <p>
      Each round the warriors take turn executing instructions until of them is destroyed or the number of cycles
      for the round elapses.
    </p>
    <p>
      A typical battle takes places over X rounds and the overall win/lose/draw ratio is reported as the result.
      In a hill, each warrior is pitted against each other warrior and the results are used to determine a ranking.
      The bottom warrior each time is removed from the hill, leaving the others in place to face new challengers.
    </p>
    <p>
      Great honour is recieved by staying active on one of the King of the Hill, KOTH tournaments!
    </p>
    <h3>1.1 Corewar.io</h3>
    <p>
      The corewar.io app allows you to write, debug and battle your warriors on our online platform.
    </p>
  </DocumentationContent>
)

export default Concepts