import React from 'react'
import ThreeWay from './three-way'

const scores = [
  [{ colour: 'bg-red-500' }, { colour: 'bg-blue-500' }],
  [{ colour: 'bg-green-500' }, { colour: 'bg-purple-500' }]
]

const OverallResults = () => (
  <section>
    <h2 className="font-bold text-xl text-gray-200">Overall Results</h2>
    <div className="w-full h-8 bg-gray-700 rounded flex items-center justify-center">100%</div>
    <table className="w-full mt-8">
      <thead className="font-semibold h-12">
        <tr>
          <td>Rank</td>
          <td>Icon</td>
          <td>Name</td>
          <td>Win/Lose/Draw</td>
        </tr>
      </thead>
      <tbody>
        <tr className="h-16">
          <td>1</td>
          <td>
            <img src="https://placekitten.com/32/32" alt="kitty" className="rounded-full" />
          </td>
          <td>Blur scanner</td>
          <td>
            <ThreeWay scores={scores[0]}></ThreeWay>
          </td>
        </tr>
        <tr className="h-16">
          <td>2</td>
          <td>
            <img src="https://placekitten.com/32/32" alt="kitty" className="rounded-full" />
          </td>
          <td>Looping paper</td>
          <td>
            <ThreeWay scores={scores[1]}></ThreeWay>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
)

export default OverallResults
