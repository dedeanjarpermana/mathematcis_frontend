import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigasi";
import NavMenuAkun from "../components/NavMenuAkun";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate

function LihatSoal() {
  const [soalList, setSoalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();  // ✅ Inisialisasi navigate

  // **🔹 Ambil Semua Soal dari Backend**
  useEffect(() => {
    const fetchSoal = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/soal");
        setSoalList(response.data);
      } catch (err) {
        setError("Gagal mengambil soal.");
      } finally {
        setLoading(false);
      }
    };

    fetchSoal();
  }, []);

  // **🔹 Hapus Soal**
  const handleDelete = async (id_soal) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus soal ini?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/soal/${id_soal}`);
      setSoalList(soalList.filter((soal) => soal.id_soal !== id_soal));
    } catch (err) {
      alert("Gagal menghapus soal.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="flex">
      <Navigation />
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between bg-white h-16 px-6 shadow">
          <NavMenuAkun />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Daftar Soal</h2>
            <button
                onClick={() => navigate("/tambah-soal")}  // ✅ Navigate ke "/tambah-soal"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Tambah Soal
            </button>

          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID Soal</th>
                <th className="border border-gray-300 px-4 py-2">Soal</th>
                <th className="border border-gray-300 px-4 py-2">Jawaban</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {soalList.length > 0 ? (
                soalList.map((soal, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 text-left">{soal.id_soal}</td>
                    <td className="border border-gray-300 px-4 py-2">{soal.soal}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{soal.jawaban}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(soal.id_soal)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center text-red-500">
                    Tidak ada soal yang tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LihatSoal;
