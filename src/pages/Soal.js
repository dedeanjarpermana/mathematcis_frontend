import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from '../components/Navigasi';
import NavMenuAkun from '../components/NavMenuAkun';
import axios from "axios";

function Soal() {
  const navigate = useNavigate();
  const [soal, setSoal] = useState([]);
  const [jawabanSiswa, setJawabanSiswa] = useState({});
  const [namaSiswa, setNamaSiswa] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // **🔹 State untuk Modal**
  const [showModal, setShowModal] = useState(false);
  const [hasilBenar, setHasilBenar] = useState(0);
  const [hasilSalah, setHasilSalah] = useState(0);

  // Ambil data soal dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get("http://localhost:8000/api/get-soal");
        const response = await axios.get("http://185.201.9.65/api/get-soal");
        setSoal(response.data || []);
      } catch (err) {
        setError("Gagal mengambil soal.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Tangani jawaban siswa
  const handleInputChange = (event) => {
    const { value } = event.target;
    setJawabanSiswa({ ...jawabanSiswa, [soal[currentIndex].id_soal]: value });
  };

  // 🔹 Tangani input nama siswa
  const handleNamaChange = (event) => {
    setNamaSiswa(event.target.value);
  };

  // 🔹 Navigasi soal
  const nextQuestion = () => setCurrentIndex(currentIndex + 1);
  const prevQuestion = () => setCurrentIndex(currentIndex - 1);

  // **🔹 Submit Jawaban & Tampilkan Modal**
  const handleSubmit = async () => {
    if (!namaSiswa.trim()) {
      alert("Nama siswa harus diisi!");
      return;
    }

    try {
      const payload = soal.map((item) => ({
        id_soal: item.id_soal,
        jawaban_siswa: jawabanSiswa[item.id_soal] || "",
        nama_siswa: namaSiswa,
      }));

      // const response = await axios.post("http://localhost:8000/api/simpan-jawaban", payload);
      const response = await axios.post("http://185.201.9.65/api/simpan-jawaban", payload);
      
      const { benar, salah } = response.data;

      // **🔹 Simpan hasil & tampilkan modal**
      setHasilBenar(benar);
      setHasilSalah(salah);
      setShowModal(true);

    } catch (error) {
      console.error("Gagal mengirim jawaban:", error);
      alert("Gagal menyimpan jawaban. Silakan coba lagi.");
    }
  };

  // 🔹 Modal ditutup & kembali ke Dashboard
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/dashboard");
  };

  if (loading) return <div className="p-6 text-center">Loading soal...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="flex">
      <Navigation />

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between bg-white h-16 px-6 shadow">
          <NavMenuAkun />
        </div>

        <div className="p-6">
          <h2 className="text-blue-400 mb-4 text-2xl">
            Soal {currentIndex + 1} dari {soal.length}
          </h2>

          {/* **🔹 Menampilkan Soal** */}
          {soal.length > 0 ? (
            <div className="border border-gray-300 p-4 rounded shadow">
              <p className="text-4xl" style={{ textAlign: "justify" }}>{soal[currentIndex].soal}</p>
              <textarea
                className="w-full border p-2 mt-4 text-2xl"
                rows="2"
                placeholder="Masukkan jawaban Anda..."
                value={jawabanSiswa[soal[currentIndex].id_soal] || ""}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <p className="text-red-500 text-center">Tidak ada soal yang tersedia.</p>
          )}

          {/* **🔹 Input Nama di Soal Terakhir** */}
          {currentIndex === soal.length - 1 && (
            <div className="mt-4">
              <input
                type="text"
                className="w-full border p-2 text-2xl"
                placeholder="Masukkan Nama Anda..."
                value={namaSiswa}
                onChange={handleNamaChange}
              />
            </div>
          )}

          {/* **🔹 Navigasi Soal** */}
          <div className="flex justify-between mt-6">
            <button
              onClick={prevQuestion}
              disabled={currentIndex === 0}
              className="px-12 py-8 rounded bg-blue-500 text-white text-2xl"
            >
              Previous
            </button>

            {currentIndex === soal.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-12 py-8 rounded bg-green-500 text-white text-2xl"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-12 py-8 rounded bg-blue-500 text-white text-2xl"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      {/* **🔹 Modal Hasil Jawaban** */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Hasil Jawaban</h2>
            <p className="text-xl">✅ Jawaban Benar: <span className="text-green-500">{hasilBenar}</span></p>
            <p className="text-xl">❌ Jawaban Salah: <span className="text-red-500">{hasilSalah}</span></p>
            <button
              onClick={handleCloseModal}
              className="mt-6 px-6 py-3 bg-blue-500 text-white text-xl rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Soal;