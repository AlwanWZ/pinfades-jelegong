// filepath: d:\CODING\P.Fasilitas-Desa\peminjaman-desa\src\app\regis\page.tsx
"use client";
import { useState } from "react";
import { Eye, EyeOff, User, Lock, Mail, Sun, Moon, Google } from "lucide-react";
import Link from "next/link";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/lib/firebase"; // Adjust the import based on your firebase.ts export

export default function RegisPage() {
  const [isDark, setIsDark] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegis = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Password tidak sama!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSuccess("Registrasi berhasil! Silakan login.");
      setLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSuccess("Login berhasil!");
    } catch (error) {
      setError("Login gagal! Silakan coba lagi.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50"}`}>
      <div className={`absolute top-4 right-4`}>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-lg transition-colors ${isDark ? "bg-gray-800 text-yellow-400 hover:bg-gray-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">PF</span>
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Registrasi</h2>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Buat akun baru</p>
        </div>
        <form onSubmit={handleRegis}>
          <div className="mb-4">
            <label className={`block mb-1 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Username</label>
            <div className="relative">
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${isDark ? "bg-gray-900 border-gray-700 text-white focus:ring-cyan-600" : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-cyan-400"}`}
                placeholder="Masukkan username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
              <User className="absolute right-3 top-3 w-5 h-5 text-cyan-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className={`block mb-1 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Email</label>
            <div className="relative">
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${isDark ? "bg-gray-900 border-gray-700 text-white focus:ring-cyan-600" : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-cyan-400"}`}
                placeholder="Masukkan email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute right-3 top-3 w-5 h-5 text-cyan-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className={`block mb-1 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${isDark ? "bg-gray-900 border-gray-700 text-white focus:ring-cyan-600" : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-cyan-400"}`}
                placeholder="Masukkan password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-10 top-3 text-cyan-500"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <Lock className="absolute right-3 top-3 w-5 h-5 text-cyan-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className={`block mb-1 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Konfirmasi Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${isDark ? "bg-gray-900 border-gray-700 text-white focus:ring-cyan-600" : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-cyan-400"}`}
                placeholder="Ulangi password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <Lock className="absolute right-3 top-3 w-5 h-5 text-cyan-500" />
            </div>
          </div>
          {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="mb-4 text-green-500 text-sm text-center">{success}</div>}
          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-bold shadow transition-all duration-200 mb-4 flex items-center justify-center ${isDark ? "bg-cyan-700 text-white hover:bg-cyan-800" : "bg-cyan-600 text-white hover:bg-cyan-700"}`}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Registrasi"}
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className={`w-full py-3 rounded-xl font-bold shadow transition-all duration-200 mb-4 flex items-center justify-center ${isDark ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-500 text-white hover:bg-red-600"}`}
        >
          <Google className="w-5 h-5 mr-2" /> Masuk dengan Google
        </button>
        <div className="flex flex-col gap-2 mt-2">
          <Link href="/login" className={`w-full block py-3 rounded-xl font-bold shadow transition-all duration-200 text-center ${isDark ? "bg-emerald-700 text-white hover:bg-emerald-800" : "bg-emerald-500 text-white hover:bg-emerald-600"}`}>
            Sudah punya akun? Login
          </Link>
          <Link href="/" className={`w-full block py-3 rounded-xl font-bold shadow transition-all duration-200 text-center border ${isDark ? "bg-transparent border-cyan-700 text-cyan-200 hover:bg-cyan-900/40" : "bg-transparent border-cyan-400 text-cyan-700 hover:bg-cyan-100"}`}>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}