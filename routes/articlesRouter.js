import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

// GET for all articles
router.get("/", async (req, res, next) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        next(error);
    }
});

// POST for articles
router.post("/", async (req, res) => {
    try {
        const newArticle = req.body;
        const data = await Article.create(newArticle);
        res.status(201).json({ message: "Created", data: data })
    } catch (error) {
        next(error);
    }
})


// PUT for updating the entire article document
router.put("/:id", async (req, res, next) => {
    try {
        const replacedArticle = await Article.replaceOne(
            { _id: req.params.id }, // Фильтр по id
            req.body, // Данные для обновления
            { runValidators: true } // Включаем валидацию для нового документа
        );

        if (replacedArticle.matchedCount === 0) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.json({ message: "Replaced", data: replacedArticle });
    } catch (error) {
        next(error);
    }
});

// PATCH for updating specific fields of a article
router.patch("/:id", async (req, res, next) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,  // ID пользователя для обновления
            req.body,       // Данные для обновления
            { new: true, runValidators: true } // Опции: вернуть обновлённый документ и включить валидацию
        );

        // Если пользователь не найден
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.json({ message: "Updated", data: updatedArticle });
    } catch (error) {
        next(error);
    }
});

// DELETE for deleting an article by ID
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);

        if (!deletedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.json({ message: "Deleted", data: deletedArticle });
    } catch (error) {
        next(error);
    }
});

export default router;