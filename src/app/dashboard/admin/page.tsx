"use client";
import NavbarAdmin from "./navbaradm";
import { FaUsers, FaChair, FaClipboardList, FaPlusCircle, FaUserShield } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(true); // default dark

  return (
    <>
      <NavbarAdmin darkMode={darkMode} setDarkMode={setDarkMode} />
      <main
        className={`min-h-screen p-2 sm:p-4 md:p-6 transition-colors duration-300 relative overflow-x-hidden
          ${darkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-950 to-cyan-950 text-gray-200'
            : 'bg-gradient-to-br from-green-100 via-cyan-100 to-emerald-100 text-emerald-900'}
        `}
      >
        {/* Decorative blurred background shapes */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/30 rounded-full blur-3xl z-0" />
        <div className="absolute top-40 right-0 w-60 h-60 bg-emerald-400/20 rounded-full blur-2xl z-0" />
        <header className="relative flex flex-col items-center mb-8 gap-2 z-10">
          <span className="flex items-center gap-2 mb-1">
            <FaUserShield className={`text-3xl sm:text-4xl ${darkMode ? 'text-cyan-300' : 'text-cyan-700'}`} />
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${darkMode ? 'text-white' : ''}`}>Dashboard Admin</h1>
          </span>
          <span className={`text-sm sm:text-base font-medium ${darkMode ? 'text-cyan-200/80' : 'text-cyan-800/80'}`}>Pantau & kelola seluruh aktivitas peminjaman fasilitas desa</span>
          <div className="w-32 h-1 mt-2 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 opacity-70" />
        </header>
        <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12 z-10 relative">
          <div
            className={`rounded-2xl shadow-2xl p-6 sm:p-8 flex items-center gap-4 border-l-8 animate-fadein backdrop-blur-md
              ${darkMode
                ? 'bg-cyan-900/60 border-cyan-500'
                : 'bg-white/70 border-cyan-400'}
            `}
          >
            <div className="bg-cyan-400/30 rounded-full p-3 flex items-center justify-center">
              <FaUsers className={`text-3xl sm:text-4xl ${darkMode ? 'text-cyan-200' : 'text-cyan-700'}`} />
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-cyan-900'}`}>128</div>
              <div className={`text-xs sm:text-base font-semibold ${darkMode ? 'text-cyan-100' : 'text-cyan-700'}`}>Total Warga</div>
            </div>
          </div>
          <div
            className={`rounded-2xl shadow-2xl p-6 sm:p-8 flex items-center gap-4 border-l-8 animate-fadein backdrop-blur-md
              ${darkMode
                ? 'bg-emerald-900/60 border-emerald-500'
                : 'bg-emerald-100/80 border-emerald-400'}
            `}
          >
            <div className="bg-emerald-400/30 rounded-full p-3 flex items-center justify-center">
              <FaChair className={`text-3xl sm:text-4xl ${darkMode ? 'text-emerald-200' : 'text-emerald-700'}`} />
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-emerald-900'}`}>12</div>
              <div className={`text-xs sm:text-base font-semibold ${darkMode ? 'text-emerald-100' : 'text-emerald-700'}`}>Fasilitas</div>
            </div>
          </div>
          <div
            className={`rounded-2xl shadow-2xl p-6 sm:p-8 flex items-center gap-4 border-l-8 animate-fadein backdrop-blur-md
              ${darkMode
                ? 'bg-cyan-900/60 border-cyan-500'
                : 'bg-white/70 border-cyan-400'}
            `}
          >
            <div className="bg-cyan-400/30 rounded-full p-3 flex items-center justify-center">
              <FaClipboardList className={`text-3xl sm:text-4xl ${darkMode ? 'text-cyan-200' : 'text-cyan-700'}`} />
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-cyan-900'}`}>34</div>
              <div className={`text-xs sm:text-base font-semibold ${darkMode ? 'text-cyan-100' : 'text-cyan-700'}`}>Peminjaman Aktif</div>
            </div>
          </div>
        </section>
        <section className={`rounded-3xl shadow-2xl p-3 sm:p-6 md:p-8 mb-8 sm:mb-12 animate-fadein-slow backdrop-blur-xl border border-cyan-200/30 ${darkMode ? 'bg-gray-900/70' : 'bg-white/70'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-5">
            <h2 className={`text-xl sm:text-2xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-cyan-900'}`}>
              <FaClipboardList className="text-cyan-400" /> Daftar Peminjaman
            </h2>
            <Link href="#" className={`flex items-center gap-2 hover:underline font-bold ${darkMode ? 'text-cyan-200' : 'text-cyan-700'}`}><FaPlusCircle /> Tambah Peminjaman</Link>
          </div>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-[500px] w-full text-xs sm:text-sm">
              <thead>
                <tr className={`${darkMode ? 'bg-cyan-900/80 text-white' : 'bg-cyan-100/80 text-cyan-900'} font-bold`}>
                  <th className="py-2 px-2 sm:px-4 text-left">Nama</th>
                  <th className="py-2 px-2 sm:px-4 text-left">Fasilitas</th>
                  <th className="py-2 px-2 sm:px-4 text-left">Tanggal</th>
                  <th className="py-2 px-2 sm:px-4 text-left">Status</th>
                  <th className="py-2 px-2 sm:px-4 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr className={darkMode ? 'border-b border-cyan-800/60 hover:bg-cyan-950/60' : 'border-b hover:bg-cyan-50/80'}>
                  <td className={`py-2 px-2 sm:px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>Budi</td>
                  <td className={`py-2 px-2 sm:px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>Aula</td>
                  <td className={`py-2 px-2 sm:px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>28 Jun 2025</td>
                  <td className="py-2 px-2 sm:px-4"><span className={darkMode ? 'bg-cyan-800/80 text-cyan-100 px-2 py-1 rounded font-bold' : 'bg-cyan-200/80 text-cyan-800 px-2 py-1 rounded font-bold'}>Disetujui</span></td>
                  <td className="py-2 px-2 sm:px-4"><button className={darkMode ? 'text-red-400 hover:underline font-bold' : 'text-red-600 hover:underline font-bold'}>Hapus</button></td>
                </tr>
                <tr className={darkMode ? 'border-b border-cyan-800/60 hover:bg-cyan-950/60' : 'border-b hover:bg-cyan-50/80'}>
                  <td className={`py-2 px-2 sm:px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>Siti</td>
                  <td className={`py-2 px-2 sm:px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>Kursi</td>
                  <td className={`py-2 px-2 sm:px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>29 Jun 2025</td>
                  <td className="py-2 px-2 sm:px-4"><span className={darkMode ? 'bg-yellow-700/80 text-yellow-200 px-2 py-1 rounded font-bold' : 'bg-yellow-200/80 text-yellow-800 px-2 py-1 rounded font-bold'}>Menunggu</span></td>
                  <td className="py-2 px-2 sm:px-4"><button className={darkMode ? 'text-red-400 hover:underline font-bold' : 'text-red-600 hover:underline font-bold'}>Hapus</button></td>
                </tr>
                <tr className={darkMode ? 'hover:bg-cyan-950/60' : 'hover:bg-cyan-50/80'}>
                  <td className={`py-2 px-2 sm:px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>Agus</td>
                  <td className={`py-2 px-2 sm:px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>Sound System</td>
                  <td className={`py-2 px-2 sm:px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>30 Jun 2025</td>
                  <td className="py-2 px-2 sm:px-4"><span className={darkMode ? 'bg-red-800/80 text-red-200 px-2 py-1 rounded font-bold' : 'bg-red-200/80 text-red-800 px-2 py-1 rounded font-bold'}>Ditolak</span></td>
                  <td className="py-2 px-2 sm:px-4"><button className={darkMode ? 'text-red-400 hover:underline font-bold' : 'text-red-600 hover:underline font-bold'}>Hapus</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="flex flex-col xs:flex-row flex-wrap gap-4 sm:gap-6 mt-2 mb-2 sm:mb-0 z-10 relative">
          <Link
            href="#"
            className={`w-full xs:w-auto px-7 py-4 rounded-2xl shadow-xl border-2 font-bold flex items-center justify-center gap-3 transition animate-bouncein text-center text-lg sm:text-xl
              ${darkMode ? 'bg-gradient-to-r from-cyan-700 via-cyan-800 to-cyan-900 border-cyan-900 text-white hover:from-cyan-800 hover:to-cyan-950 active:scale-95' : 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 border-cyan-300 text-white hover:from-cyan-500 hover:to-cyan-700 active:scale-95'}`}
          >
            Kelola Fasilitas
          </Link>
          <Link
            href="#"
            className={`w-full xs:w-auto px-7 py-4 rounded-2xl shadow-xl border-2 font-bold flex items-center justify-center gap-3 transition text-center text-lg sm:text-xl
              ${darkMode ? 'bg-gradient-to-r from-cyan-900 via-cyan-800 to-cyan-700 border-cyan-900 text-cyan-200 hover:from-cyan-800 hover:to-cyan-700 active:scale-95' : 'bg-gradient-to-r from-cyan-100 via-cyan-200 to-cyan-300 border-cyan-300 text-cyan-900 hover:from-cyan-200 hover:to-cyan-400 active:scale-95'}`}
          >
            Kelola Warga
          </Link>
        </section>
        <style jsx global>{`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: none; }
          }
          .animate-fadein { animation: fadein 1.2s cubic-bezier(.4,0,.2,1) both; }
          .animate-fadein-slow { animation: fadein 2s cubic-bezier(.4,0,.2,1) both; }
          @keyframes bouncein {
            0% { transform: scale(0.9); opacity: 0; }
            60% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); }
          }
          .animate-bouncein { animation: bouncein 1.1s cubic-bezier(.4,0,.2,1) both; }
        `}</style>
      </main>
    </>
  );
}

