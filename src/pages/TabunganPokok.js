import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from '../components/Navigasi';
import NavMenuAkun from '../components/NavMenuAkun';
import { formatTanggal } from "../utils/dateUtils";
import { formatRupiah } from "../utils/currencyUtils";
import axios from "axios";

function TabunganPokok() {
  const navigate = useNavigate();
  const [tabunganPokok, settabunganPokok] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Untuk modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "tambah" atau "ambil"
  const [jumlah, setJumlah] = useState("");

  // Fungsi untuk mengambil data dari API
  
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Anda harus login dulu!");
        setLoading(false);
        navigate("/login");
        return;
      }
      const response = await axios.get("http://localhost:5000/api/tabungan_pokok", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 204) {
        // Jika backend mengembalikan 204 No Content, set investasi ke array kosong
        settabunganPokok([]);
      } else {
        settabunganPokok(response.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Gagal mengambil data investasi.");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 Fungsi untuk membuka modal
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  // 🔥 Fungsi untuk menutup modal
  const closeModal = () => {
    setShowModal(false);
    setJumlah(""); // Reset input jumlah setelah modal ditutup
  };

  // 🔥 Fungsi untuk submit transaksi tabungan
  const handleSubmit = async () => {
    if (!jumlah || isNaN(jumlah) || jumlah <= 0) {
      alert("Masukkan jumlah yang valid!");
      return;
    }

    const url =
      modalType === "tambah"
        ? "http://localhost:5000/api/menabung"
        : "http://localhost:5000/api/ambil-tabungan";

    const data =
      modalType === "tambah"
        ? { jumlah_menabung: parseFloat(jumlah) }
        : { jumlah_ambil: parseFloat(jumlah) };

    try {
      const response = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert(response.data.message);
      fetchData(); // 🔥 Ambil data terbaru setelah transaksi berhasil
      closeModal();
    } catch (error) {
      console.error("Gagal memproses Tabungan", error);
      alert(error.response?.data?.message || "Gagal memproses tabungan.");
    }
  };

  if (loading) return <div>Loading data...</div>;



  return (

    <div className="flex">
      <Navigation />

      <div className="flex flex-col flex-1">
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-white h-16 px-6 shadow">
          {/* <span className="text-lg font-bold text-gray-800">Traceability Matrix</span> */}
          <NavMenuAkun />
        </div>

        {/* Main Content */}
        <div className="p-6">
          <h2 className="text-blue-400">
            <br />Name: {tabunganPokok[0]?.username}
          </h2>

          <h4 className="text-[12px] text-gray-500">
            <br />ID: {tabunganPokok[0]?.id_anggota}
          </h4>

          {/* moda untuk nabung dan ambil tabungan */}

          <div className="flex space-x-2">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => openModal("tambah")}
              >
                Tambah Tabungan
              </button>

              <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => openModal("ambil")}
              >
                Ambil Tabungan
              </button>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                  {modalType === "tambah" ? "Tambah Tabungan" : "Ambil Tabungan"}
                </h2>

                <input
                  type="number"
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                  placeholder="Masukkan jumlah"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <div className="flex justify-end space-x-2">
                  <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Batal
                  </button>
                  <button
                    onClick={handleSubmit}
                    className={`${
                      modalType === "tambah" ? "bg-blue-500 hover:bg-blue-700" : "bg-red-500 hover:bg-red-700"
                    } text-white font-bold py-2 px-4 rounded`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
          <br />

          {/* tabel tabungan */}
          <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID Tabungan</th>
              <th className="border border-gray-300 px-4 py-2">Jumlah Tabungan</th>
              <th className="border border-gray-300 px-4 py-2">Tanggal Menabung</th>
            </tr>
          </thead>

          <tbody>
            {tabunganPokok.length > 0 ? (      
              tabunganPokok.map((item, index) => (
                <tr key={index} className={item.id_tabungan.toLowerCase().includes("ambil") ? "text-red-600" : ""}> 
                  <td className="border border-gray-300 px-4 py-2 text-left">{item.id_tabungan}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatRupiah(item.jumlah_menabung)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{formatTanggal(item.tanggal_menabung)}</td>
                </tr>
              ))
          ) :  (   
              <tr>
                  <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center text-red-500">
                      Tidak ada data tabungan.
                  </td>
                </tr>
              )} 
            
          </tbody>

    </table>
  </div>
</div>


  );
}

export default TabunganPokok;
