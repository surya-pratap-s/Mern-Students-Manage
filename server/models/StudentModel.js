import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: Number, required: true },
        age: { type: Number, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

studentsSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
});

export default mongoose.model("Student", studentsSchema)