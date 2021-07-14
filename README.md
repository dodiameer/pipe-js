# PipeJS

Simple pipe function, takes return value of a function and passes it as the first argument to the next function.

## Features

- Supports async functions
- Works everywhere (browser, NodeJS)
- No dependencies
  
## Installation

Install PipeJS with npm

```bash
npm install @dodiameer/pipe-js
```

Install PipeJS with pnpm

```bash
pnpm install @dodiameer/pipe-js
```

Install PipeJS with yarn

```bash
yarn add @dodiameer/pipe-js
``` 

## Usage

```js
import { pipe } from "@dodiameer/pipe-js" // or `import pipe from "@dodiameer/pipe-js"`

const value = await pipe(
    getDataFromApi,
    serializeData,
    // To pass arguments, write an array with the function
    // as the first item and the rest of the arguments
    [prettyPrint, { tabWidth: 2 }]
)

// Above is equivalent to this
const data = await getDataFromApi()
const serializedData = serializeData(data)
const value =  prettyPrint(serializedData, { tabWidth: 2 })
```

## Practical example

See [this CodePen](https://codepen.io/dodiameer/pen/xxdgQWO?editors=1111)