import React from 'react'
import FileManager from '../features/files/file-manager'
import CoreInspector from '../features/simulator/core-inspector'
import Simulator from '../features/simulator/simulator'
import Tasks from '../features/simulator/tasks'
import Progress from '../features/simulator/progress'

const Editor = () => (
  <>
    <section className="w-1/2 lg:w-2/5 flex flex-col">
      <FileManager></FileManager>
    </section>
    <section className="w-1/2 lg:w-3/5 flex flex-row flex-initial justify-between">
      <Simulator></Simulator>
      <section className="hidden lg:flex flex-col flex-initial justify-start w-full ml-8">
        <Progress />
        <Tasks />
        <CoreInspector></CoreInspector>
      </section>
    </section>
  </>
)

export default Editor
