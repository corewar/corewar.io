# Corewar App

This project is a web app for Corewar.io

It specifically consumes [Corewar](https://github.com/corewar/corewar.io/tree/master/packages/corewar) which is a Typescript / Javascript implementation of the classic game [corewar](https://en.wikipedia.org/wiki/Core_War) to provide parser and simulator functionality.

You can use the website here [https://www.corewar.io](https://www.corewar.io/)

## Technology

This project is bootstrapped through create-react-app.

- [tailwindcss](https://tailwindcss.com/) for the styling
- typefaces for self hosted fonts
- react-testing-library for the tests
- Redux and redux-saga for interactive elements and state management

## Architectural approach

The project root is `App.js` which brings in the routing, main tailwind styling and app level depedencies like typefaces.

The `App.js` imports all the `app-chrome` for things like header, navigation etc and this is kept outside of everything dynamic.

The `App.js` contains a body which is where all the `pages` are rendered into.

The app is organised into `pages` which roughly map 1-1 to routes, so `/editor` will render `pages/editor.js` kind of borrowing he idea from things like Next.

The pages are responsible for pulling in `features` and composing them into a single page. Features can be re-used between pages. The pages are responsible for applying page level layout to components such as widths, heights, positions and margins and paddings to compose the desired output. `features` do have some layout responsiblities etc but as a rule these are applied internally.

## Getting started

- Clone the project
- `npm i` the dependencies
- `npm start` to run the webserver and visit `localhost:3000` to see the output

## Testing

Run `npm test` to execute the UI tests

## Contribution

We welcome all contributions, feedback and issues, please drop us a line with any feedback you have.
