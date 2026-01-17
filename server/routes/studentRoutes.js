import express from "express";
import { AddStudent, login, getProfile, getStudents, EditStudent, deleteStudent, deleteMultipleStudents, addMultipleStudents }
    from "../controller/studentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth Routes
router.post("/register", AddStudent);
router.post("/login", login);
router.get("/", getStudents);

// Profile Route (Protected: Needs Token)
router.get("/profile", protect, getProfile);

router.post("/register-multiple", protect, addMultipleStudents);
router.put("/:id", protect, EditStudent);
router.delete("/:id", protect, deleteStudent);
router.post("/delete-multiple", protect, deleteMultipleStudents);

export default router;