import React from 'react'

const RadioToggle = () => (
  <>
    <div className="flex flex-row mt-4">
      <input
        type="radio"
        id="toggle-on"
        name="toggle"
        defaultChecked
        className="opacity-0 absolute"
      />
      <label
        htmlFor="toggle-on"
        className="inline-block w-24 text-sm text-center border border-gray-400 rounded-l-lg p-2 cursor-pointer"
      >
        Local Hill
      </label>
      <input type="radio" id="toggle-off" name="toggle" className="opacity-0 absolute" />
      <label
        htmlFor="toggle-off"
        className="inline-block w-24 text-sm text-center border border-gray-400 border-l-0 rounded-r-lg p-2 cursor-pointer"
      >
        Benchmark
      </label>
    </div>
  </>
)

export default RadioToggle
