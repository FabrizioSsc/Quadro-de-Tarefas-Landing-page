import express from "express";
var app = express();

app.get("/", (req, res) => {
    res.send("a")
})

app.listen(8000, () => {
    console.log("asaaa")
})
