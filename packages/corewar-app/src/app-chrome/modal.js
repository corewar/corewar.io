import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import FileBrowser from '../features/files/file-browser'

const getContent = ({ id }) => {
  const selector = parseInt(id, 10)
  switch (selector) {
    case 1:
      return <FileBrowser />
    default:
      return null
  }
}

const Modal = () => {
  const history = useHistory()
  const content = getContent(useParams())
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-20 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
      onClick={() => history.goBack()}
    >
      {/* <!--
Background overlay, show/hide based on modal state.

Entering: "ease-out duration-300"
From: "opacity-0"
To: "opacity-100"
Leaving: "ease-in duration-200"
From: "opacity-100"
To: "opacity-0"
--> */}
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      {/* <!--
Modal panel, show/hide based on modal state.

Entering: "ease-out duration-300"
From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
To: "opacity-100 translate-y-0 sm:scale-100"
Leaving: "ease-in duration-200"
From: "opacity-100 translate-y-0 sm:scale-100"
To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
--> */}
      <div
        className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        onClick={e => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  )
}

export default Modal
