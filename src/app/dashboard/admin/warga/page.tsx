"use client";
import { useState } from "react";
import NavbarAdmin from "../navbaradm";
import Link from "next/link";
import { FaUser, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";

export default function WargaAdminPage() {
  const [darkMode, setDarkMode] = useState(true); // default dark
  // Dummy data warga
  interface WargaItem {
    id: number;
    nama: string;
    nik: string;
    alamat: string;
  }
  interface FormState {
    id: number | null;
    nama: string;
    nik: string;
    alamat: string;
  }
  const [warga, setWarga] = useState<WargaItem[]>([
    { id: 1, nama: "Budi", nik: "3201012345678901", alamat: "RT 01/02" },
    { id: 2, nama: "Siti", nik: "3201012345678902", alamat: "RT 02/03" },
    { id: 3, nama: "Agus", nik: "3201012345678903", alamat: "RT 03/04" },
  ]);
  const [form, setForm] = useState<FormState>({ id: null, nama: "", nik: "", alamat: "" });
  const [editId, setEditId] = useState<number | null>(null);

  // Handle input change

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add warga

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.nama || !form.nik || !form.alamat) return;
    const nextId = warga.length ? warga[warga.length - 1].id + 1 : 1;
    setWarga([
      ...warga,
      { id: nextId, nama: form.nama, nik: form.nik, alamat: form.alamat },
    ]);
    setForm({ id: null, nama: "", nik: "", alamat: "" });
  };

  // Edit warga

  interface WargaItem {
    id: number;
    nama: string;
    nik: string;
    alamat: string;
  }

  const handleEdit = (item: WargaItem) => {
    setEditId(item.id);
    setForm({ id: item.id, nama: item.nama, nik: item.nik, alamat: item.alamat });
  };

  // Update warga

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWarga(
      warga.map((item) =>
        item.id === editId
          ? { ...item, nama: form.nama, nik: form.nik, alamat: form.alamat }
          : item
      )
    );
    setEditId(null);
    setForm({ id: null, nama: "", nik: "", alamat: "" });
  };

  // Delete warga

  const handleDelete = (id: number) => {
    setWarga(warga.filter((item) => item.id !== id));
  };

  return (
    <>
      <NavbarAdmin darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className={`min-h-screen p-0 md:p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-emerald-900'}`}>
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className={`text-2xl md:text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-cyan-900'}`}>Kelola Warga</h1>
          <Link href="/dashboard/admin" className={`hover:underline font-bold ${darkMode ? 'text-emerald-200' : 'text-cyan-700'}`}>Kembali ke Dashboard</Link>
        </header>
        <section className={`rounded-2xl shadow-xl p-6 mb-10 animate-fadein-slow ${darkMode ? 'bg-gray-800/90' : 'bg-white'}`}>
          <form onSubmit={editId ? handleUpdate : handleAdd} className="flex flex-col md:flex-row gap-4 mb-6 w-full">
            <input
              type="text"
              name="nama"
              placeholder="Nama Warga"
              value={form.nama}
              onChange={handleChange}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 w-full md:w-auto ${darkMode ? 'border-cyan-700 bg-gray-900 text-gray-100 focus:ring-cyan-700 placeholder-gray-400' : 'border-cyan-200 bg-white text-emerald-900 focus:ring-cyan-300 placeholder-cyan-400'}`}
              required
            />
            <input
              type="text"
              name="nik"
              placeholder="NIK"
              value={form.nik}
              onChange={handleChange}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 w-full md:w-auto ${darkMode ? 'border-cyan-700 bg-gray-900 text-gray-100 focus:ring-cyan-700 placeholder-gray-400' : 'border-cyan-200 bg-white text-emerald-900 focus:ring-cyan-300 placeholder-cyan-400'}`}
              required
              minLength={16}
              maxLength={16}
            />
            <input
              type="text"
              name="alamat"
              placeholder="Alamat"
              value={form.alamat}
              onChange={handleChange}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 w-full md:w-auto ${darkMode ? 'border-cyan-700 bg-gray-900 text-gray-100 focus:ring-cyan-700 placeholder-gray-400' : 'border-cyan-200 bg-white text-emerald-900 focus:ring-cyan-300 placeholder-cyan-400'}`}
              required
            />
            <button
              type="submit"
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition shadow ${darkMode ? 'bg-cyan-700 text-white hover:bg-cyan-800' : 'bg-cyan-500 text-white hover:bg-cyan-600'}`}
            >
              {editId ? <FaEdit /> : <FaPlusCircle />} {editId ? "Update" : "Tambah"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => { setEditId(null); setForm({ id: null, nama: "", nik: "", alamat: "" }); }}
                className={`px-4 py-2 rounded-xl font-bold transition shadow ${darkMode ? 'bg-gray-700 text-cyan-200 hover:bg-gray-600' : 'bg-gray-100 text-cyan-700 hover:bg-gray-200'}`}
              >
                Batal
              </button>
            )}
          </form>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm rounded-2xl shadow-lg overflow-hidden border border-cyan-100 dark:border-cyan-900">
              <thead>
                <tr className={`${darkMode ? 'bg-cyan-900 text-white' : 'bg-cyan-100 text-cyan-900'} font-bold text-center`}>
                  <th className="py-3 px-4 text-center">Nama</th>
                  <th className="py-3 px-4 text-center">NIK</th>
                  <th className="py-3 px-4 text-center">Alamat</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {warga.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={
                      `${darkMode
                        ? `border-b border-cyan-800 ${idx%2===0 ? 'bg-cyan-950/30' : ''} hover:bg-cyan-950/60 transition`
                        : `border-b border-cyan-100 ${idx%2===0 ? 'bg-cyan-50/60' : 'bg-white'} hover:bg-cyan-100/80 transition`} text-center`
                    }
                  >
                    <td
                      className={`py-3 px-4 font-bold rounded-l-xl ${darkMode ? 'text-cyan-200' : 'text-cyan-700'} text-base`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <FaUser className={`text-lg ${darkMode ? 'text-cyan-400' : 'text-cyan-500'}`} />
                        {item.nama}
                      </span>
                    </td>
                    <td
                      className={`py-3 px-4 font-mono text-center ${darkMode ? 'text-cyan-200' : 'text-cyan-800'} text-base tracking-wider align-middle'}`}
                    >
                      {item.nik}
                    </td>
                    <td
                      className={`py-3 px-4 ${darkMode ? 'text-cyan-200' : 'text-cyan-800'} text-base`}
                    >
                      {item.alamat}
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        className={`font-bold flex items-center justify-center w-8 h-8 ${darkMode ? 'text-blue-300 hover:text-white bg-cyan-900 hover:bg-cyan-700' : 'text-cyan-600 hover:text-white bg-cyan-100 hover:bg-cyan-400'} transition rounded-full shadow-sm`}
                        onClick={() => handleEdit(item)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
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
          table { border-collapse: separate !important; border-spacing: 0; }
          th, td { vertical-align: middle !important; }
        `}</style>
      </main>
    </>
  );
}
