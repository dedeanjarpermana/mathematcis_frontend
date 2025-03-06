import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate



const NavMenuAkun = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // ✅ Inisialisasi navigate

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username); // Ambil username dari token
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const goToProfile = () => {
    navigate('/profile-anggota'); // ✅ Arahkan ke halaman profile anggota
  };

  return (
    <div className="flex items-center justify-between w-full h-16 px-4 bg-white rounded shadow gap-4">
      {/* Icon Container */}
      <div className="flex items-center">
        <i className="bell-icon text-gray-700 text-lg"></i>
      </div>

      {/* Profile Container */}
      <div className="flex items-center relative gap-4">
        {/* Role Text (Ganti Super Admin dengan Username) */}
        <div className="flex flex-col items-start">
          <span className="text-sm font-bold text-blue-400">
            {username ? username : "User"}
          </span>
        </div>

        {/* Avatar and Dropdown */}
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
          />
          <i
            className={`ml-2 transform transition-transform ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </i>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-md rounded-lg overflow-hidden z-50">
            <div
              className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={goToProfile}
            >
              <i className="mr-2">⚙️</i> Profile
            </div>

            <div
              className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={handleLogout}
            >
              <i className="mr-2">⛔</i> Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavMenuAkun;
