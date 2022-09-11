A sample profile showcase build with Node js, postgres sql (sequlize), React JS

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the Backend server on the background on [http://localhost:3001](http://localhost:3001)

### `npm run client`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles Node and React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run client-build`

Builds the FE app for production to the `dist/build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

To work on locally please create a .env file and set below values
```
PORT=3000
NODE_ENV="development"
DEV_PORT=3001
BUILD_PATH="./dist/build"
DATABASE_URL=<DB_URL>
```

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
