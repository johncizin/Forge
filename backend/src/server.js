import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log("Forge is running: http://localhost:3000")
})