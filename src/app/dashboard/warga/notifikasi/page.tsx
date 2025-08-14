"use client";
import NavbarWarga from "../navbarwrg";
import { useState } from "react";
import { FaBell, FaCheckCircle, FaTimesCircle, FaTrashAlt, FaRegEye } from "react-icons/fa";
import Link from "next/link";

// Dummy notifikasi awal
const initialNotif = [
  {
    id: 1,
    barang: "Aula",
    status: "Disetujui",
    waktu: "20 Jul 2025, 09:00",
    pesan: "Pengajuan peminjaman Aula telah disetujui admin.",
    read: false,
  },
  {
    id: 2,
    barang: "Kursi",
    status: "Menunggu",
    waktu: "19 Jul 2025, 14:30",
    pesan: "Pengajuan peminjaman Kursi sedang menunggu konfirmasi admin.",
    read: false,
  },
  {
    id: 3,
    barang: "Sound System",
    status: "Ditolak",
    waktu: "18 Jul 2025, 10:15",
    pesan: "Pengajuan peminjaman Sound System ditolak. Silakan hubungi admin.",
    read: true,
  },
];

export default function NotifikasiPage() {
  const [darkMode, setDarkMode] = useState(true); // default dark
  const [notif, setNotif] = useState(initialNotif);

  // Hapus notifikasi
  const handleDelete = (id: number) => {
    setNotif(notif.filter(n => n.id !== id));
  };

  // Tandai telah dibaca
  const handleMarkRead = (id: number) => {
    setNotif(notif.map(n => n.id === id ? { ...n, read: true } : n));
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
          <h1 className={`text-3xl md:text-4xl font-extrabold flex items-center gap-2 ${darkMode ? 'text-white' : ''}`}><FaBell className="text-cyan-400" /> Notifikasi</h1>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 animate-fadein-slow">
          {notif.length === 0 && (
            <div className={`rounded-xl shadow p-6 text-center font-semibold ${darkMode ? 'bg-gray-800/90 text-gray-400' : 'bg-white text-gray-500'}`}>Belum ada notifikasi.</div>
          )}
          {notif.map(n => (
            <div key={n.id} className={`rounded-xl shadow-lg p-6 border-l-8 flex flex-col gap-2 relative transition animate-fadein
              ${darkMode ? 'bg-gray-800/90 border-cyan-700' : 'bg-white border-cyan-400'}
              ${!n.read ? (darkMode ? 'ring-2 ring-cyan-600' : 'ring-2 ring-cyan-300') : ''}`}
            >
              <div className="flex items-center gap-2 mb-1">
                {n.status === "Disetujui" && <FaCheckCircle className="text-emerald-400 text-xl" />}
                {n.status === "Menunggu" && <FaRegEye className="text-yellow-300 text-xl" />}
                {n.status === "Ditolak" && <FaTimesCircle className="text-red-400 text-xl" />}
                <span className={`font-bold text-lg ${darkMode ? 'text-cyan-200' : 'text-cyan-800'}`}>{n.barang}</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${n.status === 'Disetujui' ? (darkMode ? 'bg-cyan-800 text-cyan-100' : 'bg-cyan-200 text-cyan-800') : n.status === 'Menunggu' ? (darkMode ? 'bg-yellow-700 text-yellow-200' : 'bg-yellow-200 text-yellow-800') : (darkMode ? 'bg-red-800 text-red-200' : 'bg-red-200 text-red-800')}`}>{n.status}</span>
              </div>
              <div className={`mb-1 ${darkMode ? 'text-cyan-100' : 'text-cyan-800'}`}>{n.pesan}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{n.waktu}</div>
              <div className="flex gap-2 absolute top-3 right-3">
                {!n.read && (
                  <button onClick={() => handleMarkRead(n.id)} title="Tandai telah dibaca" className={`p-1 rounded hover:bg-cyan-700/30 transition ${darkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>
                    <FaRegEye />
                  </button>
                )}
                <button onClick={() => handleDelete(n.id)} title="Hapus" className={`p-1 rounded hover:bg-red-700/30 transition ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                  <FaTrashAlt />
                </button>
              </div>
              {!n.read && <span className={`absolute top-3 left-3 w-2 h-2 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-cyan-500'} animate-pulse`} />}
            </div>
          ))}
        </section>
        <style jsx global>{`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: none; }
          }
          .animate-fadein { animation: fadein 1.2s cubic-bezier(.4,0,.2,1) both; }
          .animate-fadein-slow { animation: fadein 2s cubic-bezier(.4,0,.2,1) both; }
        `}</style>
      </main>
    </>
  );
}
