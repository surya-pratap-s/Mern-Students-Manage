import { useState } from "react";
import { Mail, Plus, Trash2, Users, X } from "lucide-react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function AddStudents() {
    const [students, setStudents] = useState([
        { name: "", email: "", mobile: "", age: "", password: "" }
    ]);
    const [loading, setLoading] = useState(false);

    const handleChange = (index, field, value) => {
        const updated = [...students];
        updated[index][field] = value;
        setStudents(updated);
    };

    const addRow = () => {
        setStudents([...students, { name: "", email: "", mobile: "", age: "", password: "" }]);
    };

    const removeRow = (index) => {
        setStudents(students.filter((_, i) => i !== index));
    };

    const submitHandler = async () => {
        try {
            setLoading(true);
            await api.post("/student/register-multiple", { students });
            alert("Students added successfully!");
            setStudents([{ name: "", email: "", mobile: "", age: "", password: "" }]);
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
            <Navbar />

            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex items-center gap-3 mb-8">
                    <Users className="w-8 h-8 text-indigo-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Add Multiple Students</h2>
                </div>

                <div className="flex justify-between items-end mb-6">
                    <button onClick={submitHandler} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        {loading ? "Saving..." : "Submit Students"}
                    </button>
                    <button onClick={addRow} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                        <Plus size={18} /> Add Row
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-linear-to-r from-indigo-600 to-purple-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Age</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Mobile</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Password</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {students.map((student, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <input
                                                type="text"
                                                name="name"
                                                value={student.name}
                                                onChange={(e) => handleChange(index, "name", e.target.value)}
                                                className="w-full px-3 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="email"
                                                name="email"
                                                value={student.email}
                                                onChange={(e) => handleChange(index, "email", e.target.value)}
                                                className="w-full px-3 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                name="age"
                                                value={student.age}
                                                onChange={(e) => handleChange(index, "age", e.target.value)}
                                                className="w-full px-3 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="tel"
                                                name="mobile"
                                                value={student.mobile}
                                                onChange={(e) => handleChange(index, "mobile", e.target.value)}
                                                className="w-full px-3 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="text"
                                                name="password"
                                                value={student.password}
                                                onChange={(e) => handleChange(index, "password", e.target.value)}
                                                className="w-full px-3 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => removeRow(index)}
                                                    className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition"
                                                    title="Cancel"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
