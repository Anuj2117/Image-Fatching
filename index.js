
// const url=`https://api.api-ninjas.com/v1/dadjokes`;
// const header={'X-Api-Key':"ytYd9sxXxybfYoha7gAVCQ==170MPomhGe1VgSBi"};
import "dotenv/config"; // Load environment variables from .env file
import express from "express";
import axios from "axios";

const app = express();
const port = 4000;
const hostname = "127.0.0.1";

// Endpoint to fetch and display a random image
app.get("/api/image/random", async (req, res) => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      params: { client_id: process.env.UNSPLASH_ACCESS_KEY }, // Use the environment variable
    });

    const imageUrl = response.data.urls.regular;

    // Send an HTML response displaying the image
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Random Image</title>
        </head>
        <body>
          <h1>Random Image from </h1>
          <img src="${imageUrl}" alt="Random Image" style="max-width: 100%; height: auto;">
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error fetching random image:", error.message);
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error</title>
        </head>
        <body>
          <h1>Failed to fetch random image</h1>
          <p>${error.message}</p>
        </body>
      </html>
    `);
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}`);
});
