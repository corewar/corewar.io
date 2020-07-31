import React from 'react'
import { useSelector } from 'react-redux'

const FileBrowser = () => {
  const { displayFileBrowser, warriorLibrary } = useSelector(state => state.file)
  return displayFileBrowser ? (
    <div class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      {/* <!--
    Background overlay, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute z-10 inset-0 bg-gray-800 opacity-75"></div>
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
        class="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg my-2" id="modal-headline">
              File Browser
            </h3>
            <ul>
              {warriorLibrary.map(warrior => (
                <li className="my-4 h-16 w-full rounded-lg border border-gray-700">
                  {warrior.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default FileBrowser
