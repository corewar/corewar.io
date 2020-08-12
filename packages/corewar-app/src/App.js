import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Header from './app-chrome/header'
import Body from './app-chrome/body'
import Tab from './app-chrome/tab'
import TabRow from './app-chrome/tabrow'
import Modal from './app-chrome/modal'
import Player from './pages/player'
import Editor from './pages/editor'
import { newFile } from './features/files/actions'
import './global/tailwind.css'

import 'typeface-inter'
import 'typeface-anonymous-pro'
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

function App({ location }) {
  const dispatch = useDispatch()
  const [previousLocation, setPreviousLocation] = useState(location)
  const currentFile = useSelector(getCurrentFile)
  useEffect(() => {
    !currentFile && dispatch(newFile())
  }, [])
  useEffect(() => {
    if (!(location.state && location.state.modal)) {
      setPreviousLocation(location)
    }
  }, [location])

  const isModal = location.state && location.state.modal && previousLocation !== location

  return (
    <div className="App bg-gray-900 w-full min-h-screen flex flex-col p-2 font-body text-gray-100">
      <Header></Header>
      <TabRow>
        {routes.map(r => (
          <Tab key={r.to} route={r} />
        ))}
      </TabRow>
      <Body>
        <Switch location={isModal ? previousLocation : location}>
          <Route exact path="/">
            <Editor />
          </Route>
          <Route path="/editor">
            <Editor />
          </Route>
          <Route path="/player">
            <Player />
          </Route>
          <Route exact path="/modal/:id">
            <Modal />
          </Route>
        </Switch>
        {isModal ? (
          <Route exact path="/modal/:id">
            <Modal />
          </Route>
        ) : null}
      </Body>
    </div>
  )
}

export default App
