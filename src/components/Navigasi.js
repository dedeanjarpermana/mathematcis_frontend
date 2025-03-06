import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faProjectDiagram, faDatabase, faHistory, faCog } from "@fortawesome/free-solid-svg-icons";
import logo from "../image/logo.png";
import logo_koperasi from "../image/logo_koperasi.png"
import logo_newton from "../image/Logo_di_buku.png"
import Soal from "../pages/Soal";
import Dashboard from "../pages/Dashboard";
const Navigation = () => {
  return (
    <aside className="bg-blue-700 text-white w-64 h-screen flex flex-col">
      {/* Logo Section */}
      <div className="flex flex-col items-center p-6 border-b border-gray-700">
        <img src={logo_newton} alt="Logo" className="w-54 h-54 md:w-32 md:h-32 lg:w-40 lg:h-40" />
        <span className="text-lg font-bold">Newton Education</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex-1 p-4 space-y-4">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition"
          >
            <FontAwesomeIcon icon={faHome} className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/soal"
            className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition"
          >
            <FontAwesomeIcon icon={faUser} className="w-5 h-5 mr-3" />
            Soal Matematika
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition"
          >
            <FontAwesomeIcon icon={faProjectDiagram} className="w-5 h-5 mr-3" />
            Soal SCIENCE
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition"
          >
            <FontAwesomeIcon icon={faDatabase} className="w-5 h-5 mr-3" />
            SOAL IPS
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition"
          >
            <FontAwesomeIcon icon={faHistory} className="w-5 h-5 mr-3" />
            History
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition"
          >
            <FontAwesomeIcon icon={faCog} className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Navigation;
