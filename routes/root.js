const express = require("express");
const router = express.Router();

const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
res.sendFile(path.join(__dirname, "..", "views", "index.html"))
});

router.post("/register", (req, res) => {
    res.status(201).json({message: "This is the register page"});
})

module.exports = router