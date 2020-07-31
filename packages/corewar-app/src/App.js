import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Header from './app-chrome/header'
import Body from './app-chrome/body'
import Tab from './app-chrome/tab'
import TabRow from './app-chrome/tabrow'
import Player from './pages/player'
import Editor from './pages/editor'
import { newFile } from './features/files/actions'
import './global/tailwind.css'

import 'typeface-inter'
import 'typeface-anonymous-pro'

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
  const { currentFile } = useSelector(state => state.file)
  useEffect(() => {
    !currentFile && dispatch(newFile())
  })
  return (
    <div className="App bg-gray-900 w-full min-h-screen flex flex-col p-2 font-body text-gray-100">
      <Header></Header>
      <TabRow>
        {routes.map(r => (
          <Tab key={r.to} route={r} />
        ))}
      </TabRow>
      <Body>
        <Switch>
          <Route exact path="/">
            <Editor />
          </Route>
          <Route path="/editor">
            <Editor />
          </Route>
          <Route path="/player">
            <Player />
          </Route>
        </Switch>
      </Body>
    </div>
  )
}

export default App
