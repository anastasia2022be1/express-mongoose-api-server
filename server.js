import express from "express";
import mongoose from "mongoose";

import { connect } from "./db.js";

import usersRouter from "./routes/usersRouter.js";
import articlesRouter from "./routes/articlesRouter.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

await connect();

app.use("/users", usersRouter);
app.use("/articles", articlesRouter);


// globale Fehlerbehandlung
app.use((err, req, res, next) => {
    // Custom error handling for different types of errors
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ "error": "Validation error", details: err.message });
    }
    console.error("error:", err)
    res.status(500).json({ error: err.message })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});