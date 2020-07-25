import React from 'react'
import FileManager from '../features/files/file-manager'
import CoreInspector from '../features/simulator/core-inspector'
import Simulator from '../features/simulator/simulator'

const Editor = () => (
  <>
    <section className="w-2/5 lg:w-1/2 flex flex-col">
      <FileManager></FileManager>
    </section>
    <section className="w-1/2 flex flex-row flex-initial justify-end">
      <section className="hidden lg:flex flex-col flex-initial justify-end pr-2">
        <CoreInspector></CoreInspector>
      </section>
      <Simulator></Simulator>
    </section>
  </>
)

export default Editor
