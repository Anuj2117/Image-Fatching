import "dotenv/config"; // Load environment variables from .env file
import express from "express";
import axios from "axios";

const app = express();
const port = 4000;
const hostname = "127.0.0.1";

// Endpoint to fetch a random image
app.get("/api/image/random", async (req, res) => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      params: { client_id: process.env.UNSPLASH_ACCESS_KEY }, // Use the environment variable
    });

    const imageUrl = response.data.urls.regular;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Error fetching random image:", error.message);
    res.status(500).json({ error: "Failed to fetch random image" });
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}`);
});
// const url=`https://api.api-ninjas.com/v1/dadjokes`;
// const header={'X-Api-Key':"ytYd9sxXxybfYoha7gAVCQ==170MPomhGe1VgSBi"};