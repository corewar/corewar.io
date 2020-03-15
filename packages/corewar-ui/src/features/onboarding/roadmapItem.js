import React from 'react'
import Octicon from 'react-octicon'

export default ({ item }) => (
  <div className="grid justify-center grid-cols-roadmap grid-rows-roadmap font-light min-h-200">
    <div className="row-start-1 row-end-3 leading-10 text-white pt-4 pl-4 text-right w-full">
      {item.leftText}
    </div>
    <div className="col-start-2 row-start-1 self-center mx-auto text-blue">
      <Octicon className="text-2xl" name={`${item.icon}`} />
    </div>
    <div className="row-span-3 leading-10 self-start text-white pt-4 pr-4 max-w-350 w-full">
      {item.rightText}
    </div>
    <div className="bg-white rounded-sm w-1 h-full col-start-2 border-box mx-auto box-border " />
  </div>
)
