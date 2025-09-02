import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Body from './app-chrome/body'
import Header from './app-chrome/header'
import Modal from './app-chrome/modal'
import Tab from './app-chrome/tab'
import TabRow from './app-chrome/tabrow'
import { newFile, parse } from './features/files/actions'
import './global/tailwind.css'
import Editor from './pages/editor'
import Player from './pages/player'

import 'typeface-anonymous-pro'
import 'typeface-inter'
import { getCurrentFile } from './features/files/reducer'

const routes = [
  {
    to: '/editor',
    name: 'Editor'
  },
  {
    to: '/player',
    name: 'Player'
  }
]

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [previousLocation, setPreviousLocation] = useState(location)
  const [hasInitialized, setHasInitialized] = useState(false)
  const currentFile = useSelector(getCurrentFile)
  const files = useSelector((state) => state.file.files)

  useEffect(() => {
    // Only create a new file if we haven't initialized yet and there are no files at all
    if (!hasInitialized && files.length === 0) {
      dispatch(newFile())
      setHasInitialized(true)
    } else if (files.length > 0) {
      // If files exist, mark as initialized to prevent creating more
      setHasInitialized(true)
    }
  }, [files.length, dispatch, hasInitialized])
  useEffect(() => {
    if (currentFile && !currentFile.compiled) {
      dispatch(parse(currentFile.source))
    }
  }, [currentFile, dispatch])
  useEffect(() => {
    if (!(location.state && location.state.modal)) {
      setPreviousLocation(location)
    }
  }, [location])

  const isModal = location.state && location.state.modal && previousLocation !== location

  return (
    <div className="App bg-gray-900 w-full h-screen flex flex-col p-2 font-body text-gray-100 overflow-hidden">
      <Header></Header>
      <TabRow>
        {routes.map((r) => (
          <Tab key={r.to} route={r} />
        ))}
      </TabRow>
      <Body>
        <Routes location={isModal ? previousLocation : location}>
          <Route path="/" element={<Navigate to="/editor" replace />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/player" element={<Player />} />
          <Route path="/modal/:id" element={<Modal />} />
        </Routes>
        {isModal ? (
          <Routes>
            <Route path="/modal/:id" element={<Modal />} />
          </Routes>
        ) : null}
      </Body>
    </div>
  )
}

export default App
