// import test from 'tape'
// import { corewar } from 'corewar'
// import { expect } from 'chai'

// import { put, call } from 'redux-saga/effects'

// import {
//   PAUSE
// } from './../../actions/simulatorActions'


// import { initSaga } from '../../sagas/simulatorSagas'
// import { exec } from 'child_process';

// describe('when testing the init saga', () => {

//   const saga = initSaga()
//   const runner = null

//   it('first clears the draw loop for the canvas', () => {

//     const result = saga.next().value
//     const expected = call(window.clearInterval, runner)

//     console.log(result)
//     console.log(expected)

//     expect(result).to.deep.equal(expected)

//   })

//   // it('then calls serialise on the tokens', () => {

//   //   expect(saga.next(parseResult).value).to.deep.equal(call([corewar, corewar.serialise], parseResult.tokens))

//   // })

//   // it('then puts the result and redcode into the PARSE action and ends', () => {

//   //   const inputWarrior = {}

//   //   const expectedResult = {
//   //     tokens: inputTokens,
//   //     warrior: inputWarrior
//   //   }

//   //   expect(saga.next(inputWarrior, inputRedcode).value).to.deep.equal(put({ type: PARSE, result: expectedResult, redcode: inputRedcode }))
//   //   expect(saga.next().done).to.equal(true)

//   // })

// })


