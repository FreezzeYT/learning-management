import axios from "axios";

const FetchProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in.");
      return null;
    }

    const response = await axios.get("http://localhost:5803/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Profile Data:", response.data);
    return response.data; // this will return the data
  } catch (error) {
    console.error(
      "Error fetching profile:",
      error.response?.data || error.message
    );
    return null;
  }
};

export default FetchProfile;
