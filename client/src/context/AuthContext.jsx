import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);

    const fetchUserProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await api.get("/student/profile", { headers: { Authorization: `Bearer ${token}` } });
            setUser(res.data);
        } catch (error) {
            console.error("Profile fetch failed", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchStudents = async (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        const res = await api.get(`/student?${params}`);
        setStudents(res.data.students);
        setTotalStudents(res.data.totalRecords);
    };


    const login = async (data) => {
        const res = await api.post("/student/login", data);
        localStorage.setItem("token", res.data.token);
        await fetchUserProfile();
    };

    const register = async (data) => {
        const res = await api.post("/student/register", data);
        localStorage.setItem("token", res.data.token);
        await fetchUserProfile();
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, fetchStudents, students, loading, totalStudents }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);