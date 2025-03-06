import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigasi";
import NavMenuAkun from "../components/NavMenuAkun";

function TambahSoal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_soal: "",
    soal: "",
    jawaban: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // **🔹 Handle Perubahan Input**
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // **🔹 Handle Submit Form**
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id_soal || !formData.soal || !formData.jawaban) {
      setError("Semua field harus diisi!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/tambah-soal", formData);
      setSuccess(response.data.message);
      setError("");
      setFormData({ id_soal: "", soal: "", jawaban: "" }); // Reset form
    } catch (err) {
      setError("Gagal menambahkan soal, karena ID soal sudah ada. Coba lagi.");
      setSuccess("");
    }
  };

  return (
    <div className="flex">
      <Navigation />
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between bg-white h-16 px-6 shadow">
          <NavMenuAkun />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Tambah Soal</h2>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold">ID Soal</label>
              <input
                type="text"
                name="id_soal"
                value={formData.id_soal}
                onChange={handleChange}
                className="w-full border p-2"
                placeholder="Masukkan ID Soal"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Soal</label>
              <textarea
                name="soal"
                value={formData.soal}
                onChange={handleChange}
                className="w-full border p-2"
                rows="4"
                placeholder="Masukkan Soal"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Jawaban</label>
              <input
                type="text"
                name="jawaban"
                value={formData.jawaban}
                onChange={handleChange}
                className="w-full border p-2"
                placeholder="Masukkan Jawaban"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Tambah Soal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TambahSoal;
