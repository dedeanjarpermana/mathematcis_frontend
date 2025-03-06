// untuk routing setiap page//
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ListAnggota from './pages/ListAnggota';
import Investasi from './pages/Investasi';
import Soal from './pages/Soal';
import ProfileAnggota from './pages/profile_Anggota';
import JawabanSiswa from './pages/JawabanSiswa';
import TambahSoal from './pages/TambahSoal';
import LihatSoalGuru from './pages/LihatSoalGuru';
import LihatSoal from './pages/LihatSoal';

import ProtectedRoute from './pages/ProtectedPage';


function App() {
  return (
    <Routes>
            <Route path="/login" element={<Login />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                        <Dashboard />
                } />
                <Route path="/soal" element={
                        <Soal />
                } />

                <Route path="/jawabansiswa" element={
                        <JawabanSiswa />
                } />

                <Route path="/tambah-soal" element={
                        <TambahSoal />
                } />

                <Route path="/lihatsoal" element={
                        <LihatSoal />
                } />

                <Route path="/listanggota" element={
                    <ProtectedRoute>
                        <ListAnggota />
                    </ProtectedRoute>
                } />

                <Route path="/profile-anggota" element={
                    <ProtectedRoute>
                        <ProfileAnggota />
                    </ProtectedRoute>
                } />

                <Route path="/investasi" element={
                    <ProtectedRoute>
                        <Investasi />
                    </ProtectedRoute>
                } />

          

        </Routes>
  );
}

export default App;

