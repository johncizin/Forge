import express from "express"

const app = express()

app.get("/", (req, res) => {
  res.send("Quick Setup")
})

app.listen(3000, () => {
  console.log("Forge is running: http://localhost:3000")
})