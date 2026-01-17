import Student from "../models/StudentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper: Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const AddStudent = async (req, res) => {
    try {
        const { name, email, mobile, age, password } = req.body;

        const existing = await Student.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const student = await Student.create({
            name, email, mobile, age, password
        });

        return res.status(201).json({ token: generateToken(student._id) });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const addMultipleStudents = async (req, res) => {
    try {
        const { students } = req.body;

        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ message: "Students data required" });
        }

        // Check duplicate emails
        const emails = students.map(s => s.email);
        const existing = await Student.find({ email: { $in: emails } });

        if (existing.length > 0) {
            return res.status(400).json({
                message: "Some students already exist",
                existingEmails: existing.map(e => e.email)
            });
        }

        const savedStudents = await Student.insertMany(students);

        res.status(201).json({
            message: "Students added successfully",
            count: savedStudents.length,
            students: savedStudents
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Bulk insert failed" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });

        // We compare the plain password with the hashed password in DB
        if (!student || !(await bcrypt.compare(password, student.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({ token: generateToken(student._id), message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select("-password");
        if (!student) return res.status(404).json({ message: "User not found" });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
};

export const EditStudent = async (req, res) => {
    try {
        const { name, mobile, age, password } = req.body;
        const student = await Student.findById(req.params.id);

        if (!student) return res.status(404).json({ message: "Student not found" });

        if (name) student.name = name;
        if (mobile) student.mobile = mobile;
        if (age) student.age = age;
        if (password) student.password = password;


        await student.save();
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Update failed" });
    }
};

export const getStudents = async (req, res) => {
    try {
        const {
            search = "",
            minAge,
            maxAge,
            sortBy = "createdAt",
            order = "desc"
        } = req.query;

        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        if (minAge || maxAge) {
            query.age = {};
            if (minAge) query.age.$gte = Number(minAge);
            if (maxAge) query.age.$lte = Number(maxAge);
        }

        const sortOptions = {
            [sortBy]: order === "asc" ? 1 : -1
        };

        const [students, total] = await Promise.all([
            Student.find(query).select("-password").sort(sortOptions),
            Student.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            totalRecords: total,
            students
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching students" });
    }
};



export const deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.ids);
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed" });
    }
};

export const deleteMultipleStudents = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !ids.length) {
            return res.status(400).json({ message: "No students selected" });
        }

        await Student.deleteMany({ _id: { $in: ids } });

        res.status(200).json({ message: "Students deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Bulk delete failed" });
    }
};
