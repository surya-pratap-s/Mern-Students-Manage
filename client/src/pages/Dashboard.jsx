import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Save, X, Users, Search, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Dashboard() {
    const { user, students, totalStudents, fetchStudents } = useAuth();

    const [selectedIds, setSelectedIds] = useState([]);
    const [deleting, setDeleting] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // search and filter
    const [search, setSearch] = useState("");
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");


    useEffect(() => {
        fetchStudents({
            search,
            minAge,
            maxAge,
            sortBy,
            order
        });
    }, [search, minAge, maxAge, sortBy, order]);


    const [editForm, setEditForm] = useState({
        name: "",
        age: "",
        mobile: "",
        password: ""
    });

    const handleEdit = (student) => {
        setEditingId(student._id);
        setEditForm({
            name: student.name,
            age: student.age,
            mobile: student.mobile,
            password: ""
        });
    };

    const handleInputChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async (id) => {
        await api.put(`/student/${id}`, editForm);
        setEditingId(null);
        fetchStudents();
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const selectAll = () => {
        if (selectedIds.length === students.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(students.map(s => s._id));
        }
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            setDeleting(true);
            await api.delete(`/student/${id}`);
            fetchStudents();
        } catch (error) {
            alert("Delete failed");
        } finally {
            setDeleting(false);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;

        if (!window.confirm(`Delete ${selectedIds.length} selected students?`)) return;

        try {
            setDeleting(true);
            await api.post("/student/delete-multiple", { ids: selectedIds });
            setSelectedIds([]);
            fetchStudents();
        } catch (error) {
            alert("Bulk delete failed");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <div className='flex space-x-3'>
                            <Users className="w-8 h-8 text-indigo-600" />
                            <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
                        </div>
                        <p>{user?.name}</p>
                    </div>
                    <p className="text-gray-600">Manage and edit student information</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded shadow border border-gray-100">
                        <p className="text-gray-600 text-sm font-medium mb-1">Total Students</p>
                        <p className="text-3xl font-bold text-indigo-600">{totalStudents}</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow border border-gray-100">
                        <p className="text-gray-600 text-sm font-medium mb-1">Average Age</p>
                        <p className="text-3xl font-bold text-indigo-600">
                            {students.length > 0 ? Math.round(students.reduce((acc, s) => acc + Number(s.age), 0) / students.length) : 0}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <Filter className="w-5 h-5 text-indigo-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Filters & Search</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <input
                            type="number"
                            placeholder="Min Age"
                            value={minAge}
                            onChange={(e) => setMinAge(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />

                        <input
                            type="number"
                            placeholder="Max Age"
                            value={maxAge}
                            onChange={(e) => setMaxAge(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />

                        <button
                            onClick={() => {
                                setSearch("");
                                setMinAge("");
                                setMaxAge("");
                            }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition"
                        >
                            Clear Filters
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="createdAt">Created Date</option>
                                <option value="updatedAt">Updated Date</option>
                                <option value="name">Name</option>
                                <option value="age">Age</option>
                                <option value="email">Email</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                            <select
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-end mb-6">
                    {selectedIds.length > 0 && (
                        <button onClick={handleBulkDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                            Delete Selected ({selectedIds.length})
                        </button>
                    )}
                </div>

                {/* Table */}
                <div className="bg-white rounded shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-linear-to-r from-indigo-600 to-purple-600 text-white">
                                <tr>
                                    <th className="p-3">
                                        <input
                                            type="checkbox"
                                            onChange={selectAll}
                                            checked={selectedIds.length === students.length && students.length > 0}
                                        />
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Age</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Mobile</th>
                                    {editingId !== null && <th className="px-6 py-4 text-left text-sm font-semibold">Password</th>}
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {students.map((student) => (
                                    <tr key={student._id} className="hover:bg-gray-50 transition">
                                        {editingId === student._id ? (<>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={editForm.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{student.email}</td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="number"
                                                    name="age"
                                                    value={editForm.age}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="tel"
                                                    name="mobile"
                                                    value={editForm.mobile}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="text"
                                                    name="password"
                                                    value={editForm.password}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleSave(student._id)}
                                                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
                                                        title="Save"
                                                    >
                                                        <Save className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition"
                                                        title="Cancel"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </>) : (<>
                                            <td className="text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(student._id)}
                                                    onChange={() => toggleSelect(student._id)}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">{student.name}{" "}{student._id === user?._id && "(You)"}</td>
                                            <td className="px-6 py-4 text-gray-600">{student.email}</td>
                                            <td className="px-6 py-4 text-gray-600">{student.age}</td>
                                            <td className="px-6 py-4 text-gray-600">{student.mobile}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(student)}
                                                        className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(student._id)}
                                                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {students.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No students found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}