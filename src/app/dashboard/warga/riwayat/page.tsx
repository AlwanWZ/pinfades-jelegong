"use client";
import NavbarWarga from "../navbarwrg";
import { useState } from "react";
import { FaClipboardList, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import Link from "next/link";

// Dummy data riwayat peminjaman
const initialRiwayatList = [
  {
    fasilitas: "Aula",
    tanggal: "28 Jun 2025",
    status: "Disetujui",
    keterangan: "Acara RT 01",
  },
  {
    fasilitas: "Kursi",
    tanggal: "29 Jun 2025",
    status: "Menunggu",
    keterangan: "Pernikahan",
  },
  {
    fasilitas: "Sound System",
    tanggal: "30 Jun 2025",
    status: "Ditolak",
    keterangan: "Lomba Karaoke",
  },
  {
    fasilitas: "GOR Badminton",
    tanggal: "1 Jul 2025",
    status: "Disetujui",
    keterangan: "Latihan Karang Taruna",
  },
];

import { FaTrash } from "react-icons/fa";

export default function RiwayatPage() {
  const [darkMode, setDarkMode] = useState(true); // default dark
  const [riwayatList, setRiwayatList] = useState(initialRiwayatList);

  const handleDelete = (idx: number) => {
    setRiwayatList((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <>
      <NavbarWarga darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className={`min-h-screen p-0 md:p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-emerald-900'}`}>
        <div className="flex justify-start mb-2">
          <Link
            href="/dashboard/warga"
            className={`px-3 py-1.5 rounded-lg shadow-sm font-semibold flex items-center gap-1 transition text-xs sm:text-sm border
              ${darkMode ? 'bg-cyan-900 border-cyan-800 text-cyan-200 hover:bg-cyan-800' : 'bg-cyan-100 border-cyan-300 text-cyan-800 hover:bg-cyan-200'}`}
            style={{ minWidth: 'unset' }}
          >
            &larr; Dashboard
          </Link>
        </div>
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className={`text-3xl md:text-4xl font-extrabold ${darkMode ? 'text-white' : ''}`}>Riwayat Peminjaman</h1>
        </header>
        {/* Responsive: Table on md+, Card list on mobile */}
        <section className="rounded-2xl shadow-xl p-2 md:p-6 mb-10 animate-fadein-slow">
          {/* Desktop/tablet table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className={`${darkMode ? 'bg-cyan-900 text-white' : 'bg-cyan-100 text-cyan-900'} font-bold`}>
                  <th className="py-2 px-4 text-left">Fasilitas</th>
                  <th className="py-2 px-4 text-left">Tanggal</th>
                  <th className="py-2 px-4 text-left">Keterangan</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {riwayatList.map((item, idx) => (
                  <tr key={idx} className={`${darkMode ? 'border-b border-cyan-800 hover:bg-cyan-950' : 'border-b hover:bg-cyan-50'} transition`}>
                    <td className={`py-2 px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>{item.fasilitas}</td>
                    <td className={`py-2 px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>{item.tanggal}</td>
                    <td className={`py-2 px-4 ${darkMode ? 'text-cyan-100' : 'text-cyan-800'}`}>{item.keterangan}</td>
                    <td className="py-2 px-4">
                      {item.status === "Disetujui" && (
                        <span className="flex items-center gap-1 bg-cyan-800 text-cyan-100 px-2 py-1 rounded font-bold"><FaCheckCircle className="text-emerald-300" /> Disetujui</span>
                      )}
                      {item.status === "Menunggu" && (
                        <span className="flex items-center gap-1 bg-yellow-700 text-yellow-200 px-2 py-1 rounded font-bold"><FaClock className="text-yellow-300" /> Menunggu</span>
                      )}
                      {item.status === "Ditolak" && (
                        <span className="flex items-center gap-1 bg-red-800 text-red-200 px-2 py-1 rounded font-bold"><FaTimesCircle className="text-red-300" /> Ditolak</span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button
                        aria-label="Hapus riwayat"
                        onClick={() => handleDelete(idx)}
                        className={`p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition`}
                        title="Hapus riwayat"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile card list */}
          <div className="flex flex-col gap-4 md:hidden">
            {riwayatList.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-xl shadow p-4 flex flex-col gap-2 border ${darkMode ? 'bg-cyan-950 border-cyan-800' : 'bg-white border-cyan-200'} animate-fadein`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-base md:text-lg ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>{item.fasilitas}</span>
                  <span className={`text-xs md:text-sm font-semibold ${darkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>{item.tanggal}</span>
                </div>
                <div className={`text-sm ${darkMode ? 'text-cyan-100' : 'text-cyan-800'}`}>{item.keterangan}</div>
                <div className="mt-1 flex items-center gap-2">
                  {item.status === "Disetujui" && (
                    <span className="inline-flex items-center gap-1 bg-cyan-800 text-cyan-100 px-2 py-1 rounded font-bold text-xs"><FaCheckCircle className="text-emerald-300" /> Disetujui</span>
                  )}
                  {item.status === "Menunggu" && (
                    <span className="inline-flex items-center gap-1 bg-yellow-700 text-yellow-200 px-2 py-1 rounded font-bold text-xs"><FaClock className="text-yellow-300" /> Menunggu</span>
                  )}
                  {item.status === "Ditolak" && (
                    <span className="inline-flex items-center gap-1 bg-red-800 text-red-200 px-2 py-1 rounded font-bold text-xs"><FaTimesCircle className="text-red-300" /> Ditolak</span>
                  )}
                  <button
                    aria-label="Hapus riwayat"
                    onClick={() => handleDelete(idx)}
                    className={`ml-auto p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition`}
                    title="Hapus riwayat"
                  >
                    <FaTrash className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="flex justify-center mt-6">
          <Link
            href="/dashboard/warga/ajukan"
            className={`w-full md:w-auto text-center px-6 py-3 rounded-xl shadow font-bold transition animate-bouncein ${darkMode ? 'bg-cyan-700 text-white hover:bg-cyan-800' : 'bg-cyan-600 text-white hover:bg-cyan-700'}`}
          >
            Ajukan Peminjaman Baru
          </Link>
        </div>
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
