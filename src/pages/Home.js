import React from 'react';
import Navigation from '../components/Navigasi';
import NavMenuAkun from '../components/NavMenuAkun';

const Home = () => {
  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <Navigation />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-white h-16 px-6 shadow">
          {/* <span className="text-lg font-bold text-gray-800">Traceability Matrix</span> */}
          <NavMenuAkun />
        </div>

        {/* Main Content */}
        <div className="p-6">
          <h3 className="text-red-500">-- Overview Koperasi 2024 --</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
