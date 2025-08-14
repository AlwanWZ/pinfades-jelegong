"use client";
import NavbarAdmin from "../navbaradm";
import { useState } from "react";
import { FaClipboardList, FaPlusCircle, FaTrash } from "react-icons/fa";
import Link from "next/link";

interface PeminjamanItem {
  id: number;
  nama: string;
  fasilitas: string;
  tanggal: string;
  status: "Disetujui" | "Menunggu" | "Ditolak";
}

export default function AdminPeminjamanPage() {
  const [darkMode, setDarkMode] = useState(true); // default dark
  const [peminjaman, setPeminjaman] = useState<PeminjamanItem[]>([
    { id: 1, nama: "Budi", fasilitas: "Aula", tanggal: "28 Jun 2025", status: "Disetujui" },
    { id: 2, nama: "Siti", fasilitas: "Kursi", tanggal: "29 Jun 2025", status: "Menunggu" },
    { id: 3, nama: "Agus", fasilitas: "Sound System", tanggal: "30 Jun 2025", status: "Ditolak" },
  ]);

  const handleDelete = (id: number) => {
    setPeminjaman(peminjaman.filter((item) => item.id !== id));
  };

  const handleStatus = (id: number, status: "Disetujui" | "Ditolak") => {
    setPeminjaman(peminjaman.map(item => item.id === id ? { ...item, status } : item));
  };

  return (
    <>
      <NavbarAdmin darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className={`min-h-screen p-0 md:p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-emerald-900'}`}>
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className={`text-3xl md:text-4xl font-extrabold ${darkMode ? 'text-white' : ''}`}>Kelola Peminjaman</h1>
          <Link href="/dashboard/admin" className={`hover:underline font-bold ${darkMode ? 'text-emerald-200' : 'text-cyan-700'}`}>Kembali ke Dashboard</Link>
        </header>
        <section className={`rounded-2xl shadow-xl p-6 mb-10 animate-fadein-slow ${darkMode ? 'bg-gray-800/90' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : ''}`}>Daftar Peminjaman</h2>
            <Link href="#" className={`flex items-center gap-2 hover:underline font-bold ${darkMode ? 'text-cyan-200' : 'text-cyan-700'}`}><FaPlusCircle /> Tambah Peminjaman</Link>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="min-w-[600px] w-full text-sm">
              <thead>
                <tr className={`${darkMode ? 'bg-cyan-900 text-white' : 'bg-cyan-100 text-cyan-900'} font-bold text-center`}>
                  <th className="py-2 px-4 text-center">Nama</th>
                  <th className="py-2 px-4 text-center">Fasilitas</th>
                  <th className="py-2 px-4 text-center">Tanggal</th>
                  <th className="py-2 px-4 text-center">Status</th>
                  <th className="py-2 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {peminjaman.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={
                      `${darkMode
                        ? `border-b border-cyan-800 ${idx%2===0 ? 'bg-cyan-950/30' : ''} hover:bg-cyan-950/60 transition`
                        : `border-b border-cyan-100 ${idx%2===0 ? 'bg-cyan-50/60' : 'bg-white'} hover:bg-cyan-100/80 transition`} text-center`
                    }
                  >
                    <td className={`py-3 px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>{item.nama}</td>
                    <td className={`py-3 px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>{item.fasilitas}</td>
                    <td className={`py-3 px-4 font-semibold ${darkMode ? 'text-cyan-200' : 'text-cyan-900'}`}>{item.tanggal}</td>
                    <td className="py-3 px-4">
                      <span className={
                        item.status === "Disetujui"
                          ? darkMode
                            ? 'bg-cyan-800 text-cyan-100 px-2 py-1 rounded font-bold'
                            : 'bg-cyan-200 text-cyan-800 px-2 py-1 rounded font-bold'
                          : item.status === "Menunggu"
                          ? darkMode
                            ? 'bg-yellow-700 text-yellow-200 px-2 py-1 rounded font-bold'
                            : 'bg-yellow-200 text-yellow-800 px-2 py-1 rounded font-bold'
                          : darkMode
                          ? 'bg-red-800 text-red-200 px-2 py-1 rounded font-bold'
                          : 'bg-red-200 text-red-800 px-2 py-1 rounded font-bold'
                      }>{item.status}</span>
                    </td>
                    <td className="py-3 px-4 flex flex-col md:flex-row gap-2 justify-center items-center">
                      {item.status === "Menunggu" && (
                        <>
                          <button
                            className={`px-3 py-1 rounded font-bold text-xs shadow transition ${darkMode ? 'bg-cyan-700 text-white hover:bg-cyan-800' : 'bg-cyan-500 text-white hover:bg-cyan-600'}`}
                            onClick={() => handleStatus(item.id, "Disetujui")}
                          >Setujui</button>
                          <button
                            className={`px-3 py-1 rounded font-bold text-xs shadow transition ${darkMode ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-500 text-white hover:bg-red-600'}`}
                            onClick={() => handleStatus(item.id, "Ditolak")}
                          >Tolak</button>
                        </>
                      )}
                      <button
                        className={`font-bold flex items-center justify-center w-8 h-8 ${darkMode ? 'text-red-300 hover:text-white bg-cyan-900 hover:bg-red-700' : 'text-red-500 hover:text-white bg-red-100 hover:bg-red-400'} transition rounded-full shadow-sm`}
                        onClick={() => handleDelete(item.id)}
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
