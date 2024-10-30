import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET for all users
router.get("/", async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next(error)
    }
});

// GET for userId
router.get("/:id", async (req, res, next) => {
    try {
        const UserById = await User.findById(req.params.id);
        res.json({ message: "UserById", data: UserById });
    } catch (error) {
        next(error);
    }
});

// POST for users
router.post("/", async (req, res, next) => {
    try {
        const newUser = req.body;
        const data = await User.create(newUser);
        res.status(201).json({ message: "Created", data: data })
    } catch (error) {
        next(error)
    }
})


// PATCH for updating specific fields of a user
router.patch("/:id", async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,  // ID пользователя для обновления
            req.body,       // Данные для обновления
            { new: true, runValidators: true } // Опции: вернуть обновлённый документ и включить валидацию
        );

        // Если пользователь не найден
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Updated", data: updatedUser });
    } catch (error) {
        next(error);
    }
});

// PUT for replacing the entire user document
router.put("/:id", async (req, res, next) => {
    try {
        const replacedUser = await User.replaceOne(
            { _id: req.params.id }, // Фильтр по id
            req.body, // Полностью заменяем документ на то, что приходит в req.body
            { runValidators: true } // Включаем валидацию для нового документа
        );

        if (replacedUser.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Replaced", data: replacedUser });
    } catch (error) {
        next(error);
    }
});

// DELETE for userId
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted", data: deletedUser });
    } catch (error) {
        next(error);
    }
});

export default router;