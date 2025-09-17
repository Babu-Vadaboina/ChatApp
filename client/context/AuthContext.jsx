import { useState, createContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  //check if user is authenticated then connect the socket
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check-auth");
      if (data.success) {
        setAuthUser(data.userdata);
        connectSocket(data.userdata);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  //login function to handle authentication and socket connection
  const login = async (state, credentials) => {
    const { data } = await axios.post(`/api/auth/${state}`, credentials);
    if (data.success) {
      setAuthUser(data.userdata);
      connectSocket(data.userdata);
      axios.defaults.headers.common["token"] = data.token;
      setToken(data.token);
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      if (state === "login") {
        navigate("/");
      } else {
        navigate("/login");
      }
    } else {
      toast.error(data.message);
    }
  };
  //logout functionality
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    axios.defaults.headers.common["token"] = null;
    setAuthUser(null);
    setOnlineUsers([]);
    socket?.disconnect();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  //update profile section of the user
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.userdata);
        toast.success("Profile updated Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  //connecting to socket after authenticaton
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: {
        userId: userData._id,
      },
    });
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
  }, []);
  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
