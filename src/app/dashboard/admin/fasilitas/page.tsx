"use client";
import { useState } from "react";
import NavbarAdmin from "../navbaradm";
import Link from "next/link";
import { FaChair, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";

export default function FasilitasAdminPage() {
  const [darkMode, setDarkMode] = useState(true); // default dark
  // Type definitions
  interface FasilitasItem {
    id: number;
    nama: string;
    jumlah: number;
  }
  interface FormState {
    id: number | null;
    nama: string;
    jumlah: string;
  }

  // Dummy data fasilitas
  const [fasilitas, setFasilitas] = useState<FasilitasItem[]>([
    { id: 1, nama: "Aula", jumlah: 1 },
    { id: 2, nama: "Kursi", jumlah: 100 },
    { id: 3, nama: "Sound System", jumlah: 2 },
    { id: 4, nama: "Tenda", jumlah: 5 },
  ]);
  const [form, setForm] = useState<FormState>({ id: null, nama: "", jumlah: "" });
  const [editId, setEditId] = useState<number | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add fasilitas
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.nama || !form.jumlah) return;
    setFasilitas([
      ...fasilitas,
      { id: Date.now(), nama: form.nama, jumlah: parseInt(form.jumlah) },
    ]);
    setForm({ id: null, nama: "", jumlah: "" });
  };

  // Edit fasilitas
  const handleEdit = (item: FasilitasItem): void => {
    setEditId(item.id);
    setForm({ id: item.id, nama: item.nama, jumlah: item.jumlah.toString() });
  };

  // Update fasilitas
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFasilitas(
      fasilitas.map((item) =>
        item.id === editId
          ? { ...item, nama: form.nama, jumlah: parseInt(form.jumlah) }
          : item
      )
    );
    setEditId(null);
    setForm({ id: null, nama: "", jumlah: "" });
  };

  // Delete fasilitas
  const handleDelete = (id: number) => {
    setFasilitas(fasilitas.filter((item) => item.id !== id));
  };

  return (
    <>
      <NavbarAdmin darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className={`min-h-screen p-0 md:p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-emerald-900'}`}>
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className={`text-2xl md:text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-cyan-900'}`}>Kelola Fasilitas</h1>
          <Link href="/dashboard/admin" className={`hover:underline font-bold ${darkMode ? 'text-emerald-200' : 'text-cyan-700'}`}>Kembali ke Dashboard</Link>
        </header>
        <section className={`rounded-2xl shadow-xl p-6 mb-10 animate-fadein-slow ${darkMode ? 'bg-gray-800/90' : 'bg-white'}`}>
          <form onSubmit={editId ? handleUpdate : handleAdd} className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              name="nama"
              placeholder="Nama Fasilitas"
              value={form.nama}
              onChange={handleChange}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${darkMode ? 'border-cyan-700 bg-gray-900 text-gray-100 focus:ring-cyan-700 placeholder-gray-400' : 'border-cyan-300 focus:ring-cyan-400'}`}
              required
            />
            <input
              type="number"
              name="jumlah"
              placeholder="Jumlah"
              value={form.jumlah}
              onChange={handleChange}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${darkMode ? 'border-cyan-700 bg-gray-900 text-gray-100 focus:ring-cyan-700 placeholder-gray-400' : 'border-cyan-300 focus:ring-cyan-400'}`}
              required
              min={1}
            />
            <button
              type="submit"
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition shadow ${darkMode ? 'bg-cyan-700 text-white hover:bg-cyan-800' : 'bg-cyan-600 text-white hover:bg-cyan-700'}`}
            >
              {editId ? <FaEdit /> : <FaPlusCircle />} {editId ? "Update" : "Tambah"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => { setEditId(null); setForm({ id: null, nama: "", jumlah: "" }); }}
                className={`px-4 py-2 rounded-xl font-bold transition shadow ${darkMode ? 'bg-gray-700 text-cyan-200 hover:bg-gray-600' : 'bg-gray-200 text-cyan-700 hover:bg-gray-300'}`}
              >
                Batal
              </button>
            )}
          </form>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className={`${darkMode ? 'bg-cyan-900 text-white' : 'bg-cyan-100 text-cyan-900'} font-bold text-center`}>
                  <th className="py-2 px-4 text-center">Nama Fasilitas</th>
                  <th className="py-2 px-4 text-center">Jumlah</th>
                  <th className="py-2 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {fasilitas.map((item) => (
                  <tr key={item.id} className={`${darkMode ? 'border-b border-cyan-800 hover:bg-cyan-950' : 'border-b hover:bg-white hover:shadow-md transition'} text-center`}>
                    <td className={`py-2 px-4 font-semibold rounded-l-xl ${darkMode ? 'text-cyan-200' : 'text-cyan-700 bg-cyan-50/80'}`}>{item.nama}</td>
                    <td className={`py-2 px-4 font-bold text-center ${darkMode ? 'text-cyan-200' : 'text-cyan-800 bg-cyan-50/60'} text-lg tracking-wide`}>{item.jumlah.toLocaleString()}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        className={`font-bold ${darkMode ? 'text-blue-400 hover:text-blue-200' : 'text-cyan-600 hover:text-cyan-800 bg-cyan-100 hover:bg-cyan-200 transition rounded p-1'}`}
                        onClick={() => handleEdit(item)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={`font-bold ${darkMode ? 'text-red-400 hover:text-red-200' : 'text-red-500 hover:text-white bg-red-100 hover:bg-red-500 transition rounded p-1'}`}
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
