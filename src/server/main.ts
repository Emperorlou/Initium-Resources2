import express from "express";
import ViteExpress from "vite-express";
import path from "path";
import dotenv from "dotenv";

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

dotenv.config();

const STATIC_BASE_DIR = process.env.STATIC_BASE_DIR || path.join(__dirname, '..', '..', 'static');
const IMAGES_DIR = 'images';
const MUSIC_DIR = 'music';
const AUDIO_DIR = 'audio';

app.use('/images', express.static(path.join(STATIC_BASE_DIR, IMAGES_DIR)));
app.use('/music', express.static(path.join(STATIC_BASE_DIR, MUSIC_DIR)));
app.use('/audio', express.static(path.join(STATIC_BASE_DIR, AUDIO_DIR)));

app.use((req, res, next) => {
  const staticPaths = ['/images/', '/music/', '/audio/'];
  if (staticPaths.some(path => req.path.startsWith(path))) {
    res.status(404).send('File not found');
  } else {
    next();
  }
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);

console.log(`Serving static files from: ${STATIC_BASE_DIR}`);
console.log(`Images directory: ${path.join(STATIC_BASE_DIR, IMAGES_DIR)}`);
console.log(`Music directory: ${path.join(STATIC_BASE_DIR, MUSIC_DIR)}`);
console.log(`Audio directory: ${path.join(STATIC_BASE_DIR, AUDIO_DIR)}`);
