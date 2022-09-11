import dotenv from "dotenv";
// Initialize dot env configuration
dotenv.config();

import express from "express";
import routes from "./app/routes";
import cors from "cors";
import path from 'path';
import { initDbConnection } from "./app/db/init";

const initAppConfig = () => {
  const app = express();

  var corsOptions = {
    origin: "http://localhost:3000",
  };

  app.use(cors(corsOptions));

  // parse requests of content-type - application/json
  app.use(express.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // application routes
  app.use("/api", routes);

  //static Images Folder
  app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

  // Service worker route
  app.get("/service-worker.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../src", "serviceWorker.js"));
  });

  // Serve any static files
  app.use(express.static(path.join(__dirname, '../build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });

  // set port, listen for requests
  const PORT = (process.env.NODE_ENV == 'development'
    ? process.env.DEV_PORT
    : process.env.PORT) || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

// Initialize Db connection
initDbConnection.then((res) => {
  initAppConfig();
})
  .catch((e) => {
    console.log(e);
  })
