const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require("path");
const { handleFetch } = require("./utils");

/*
1. import handleFetch
2. replace your fetch calls with handleFetch
- remember, it returns a [data, error] array

4. instead of try/catch send error responses if the error exists
 */

const pathToDistFolder = path.join(__dirname, "../giphy-search/dist");
console.log(process.env.API_KEY);

const serveStatic = express.static(pathToDistFolder);

const serveGifs = async (req, res, send) => {
  const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=3&rating=g`;
  const [data, error] = await handleFetch(API_URL);
  if (error) {
    console.error("Error fetching GIFS:", error);
    res.status(500).json({ error: "Failed to Fetch GIFs" });
  }
  res.json(data);
};

const searchGIF = async (req, res, send) => {
  // /api/search?filter=hello
  // req.query.filter

  // /api/search?search=
  const searchQuery = req.query.search;

  if (!searchQuery) {
    return res.status(400).json({ error: "Missing search query" });
  }

  const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=3&rating=g`;

  const [data, error] = await handleFetch(API_URL);
  if (error) {
    console.error("Error fetching GIFs:", error);
    res.status(500).json({ error: "Failed to Fetch GIFs" });
  }
  res.json(data);
};

app.use(serveStatic);

app.get("/api/gifs", serveGifs);
app.get("/api/search", searchGIF);

const port = 8080;
app.listen(port, () => {
  console.log(`Check out my server on http://localhost:${port}`);
});
