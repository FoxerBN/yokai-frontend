import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//Login admin
export const loginAdmin = async ( password: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post("/auth/login", { password });
    return response.data;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};

//Logout admin
export const logoutAdmin = async (): Promise<{ message: string }> => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error logging out admin:", error);
    throw error;
  }
};

// Check admin authentication status
export const checkAdminAuth = async (): Promise<{ isAdmin: boolean }> => {
  try {
    const response = await api.get("/auth/check");
    return response.data;
  } catch (error) {
    console.error("Error checking admin auth:", error);
    return { isAdmin: false };
  }
};