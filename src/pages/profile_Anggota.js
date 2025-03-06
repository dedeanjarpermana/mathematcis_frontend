import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigasi";
import NavMenuAkun from "../components/NavMenuAkun";
import { formatTanggal } from "../utils/dateUtils";
import axios from "axios";



function ProfileAnggota() {
  const navigate = useNavigate(); // ✅ Tambahkan ini!
  const [profileAnggota, setProfileAnggota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Untuk menampilkan error

  useEffect(() => {
    const token = localStorage.getItem("token"); // 🔥 Ambil token dari localStorage

    if (!token) {
        setError("Anda harus login dulu!");
        setLoading(false);
        navigate("/login"); // Redirect ke login jika tidak ada token
        return;
    }


    const fetchData = async () => {
      try {
          const response = await axios.get("http://localhost:5000/api/profile-anggota", {
              headers: {
                  Authorization: `Bearer ${token}`, // 🔥 Kirim token dalam header Authorization
              },
          });

          if (response.data.length === 0) {
              setError("Data anggota tidak ditemukan.");
          } else {
              setProfileAnggota(response.data[0]);
          }
      } catch (error) {
          console.error("Error fetching data", error);
          setError("Gagal mengambil data anggota.");
      } finally {
          setLoading(false);
      }
    };

    fetchData();
}, []);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <Navigation />
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between bg-white h-16 px-6 shadow">
          <NavMenuAkun />
        </div>

        <div className="p-6">
          <h3 className="text-blue-400 font-bold mb-4">Selamat Datang: {profileAnggota.nama_lengkap}</h3>
          <table className="w-full max-w-lg border border-gray-300">
            <tbody>
              <tr>
                <td className="font-bold p-2 border border-gray-300">ID Anggota</td>
                <td className="p-2 border border-gray-300">{profileAnggota.id_anggota}</td>
              </tr>
              <tr>
                <td className="font-bold p-2 border border-gray-300">Username</td>
                <td className="p-2 border border-gray-300">{profileAnggota.username}</td>
              </tr>
              <tr>
                <td className="font-bold p-2 border border-gray-300">Nama Lengkap</td>
                <td className="p-2 border border-gray-300">{profileAnggota.nama_lengkap}</td>
              </tr>
              <tr>
                <td className="font-bold p-2 border border-gray-300">Alamat</td>
                <td className="p-2 border border-gray-300">{profileAnggota.alamat}</td>
              </tr>
              <tr>
                <td className="font-bold p-2 border border-gray-300">Tanggal Gabung</td>
                <td className="p-2 border border-gray-300">{formatTanggal(profileAnggota.tanggal_masuk)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


}

export default ProfileAnggota;
