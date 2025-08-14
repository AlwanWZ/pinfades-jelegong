"use client";
import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useRouter } from "next/navigation";
import { Sun, Moon, Eye, EyeOff, User, Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isDark, setIsDark] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Email/password login with Firebase
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // If login success, redirect to dashboard warga (or check custom claims/role if needed)
      router.push("/dashboard/warga");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        window.alert("Akun tidak ditemukan. Silakan registrasi terlebih dahulu.");
        setError("Akun tidak ditemukan. Silakan registrasi terlebih dahulu.");
      } else if (err.code === "auth/wrong-password") {
        setError("Password salah.");
      } else if (err.code === "auth/invalid-email") {
        setError("Format email tidak valid.");
      } else {
        setError("Gagal login. Silakan coba lagi.");
      }
    }
    setLoading(false);
  };

  // Google login 
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      router.push("/dashboard/warga");
    } catch (err: any) {
      setError("Gagal login dengan Google. Silakan coba lagi.");
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50"}`}>
      <div className={`absolute top-4 right-4`}>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-lg transition-colors ${isDark ? "bg-gray-800 text-yellow-400 hover:bg-gray-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">PF</span>
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>Login</h2>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Masuk untuk melanjutkan</p>
        </div>
        <div className={`mb-6 p-4 rounded-xl border text-sm ${isDark ? 'bg-gray-900 border-cyan-800 text-cyan-200' : 'bg-cyan-50 border-cyan-200 text-cyan-900'}`}>
          <div className="font-bold mb-1">Akun Dummy:</div>
          <div><span className="font-semibold">Admin</span>: <span className="font-mono">admin</span> / <span className="font-mono">admin123</span></div>
          <div><span className="font-semibold">User</span>: <span className="font-mono">user</span> / <span className="font-mono">user123</span></div>
        </div>
        <form onSubmit={handleLogin}>
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
          {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-bold shadow transition-all duration-200 mb-4 flex items-center justify-center ${isDark ? "bg-cyan-700 text-white hover:bg-cyan-800" : "bg-cyan-600 text-white hover:bg-cyan-700"}`}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
        <div className="flex flex-col gap-2 mt-2">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className={`w-full py-3 rounded-xl font-bold shadow transition-all duration-200 flex items-center justify-center gap-2 ${isDark ? "bg-white text-gray-900 hover:bg-gray-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            disabled={loading}
          >
            <span className="w-5 h-5 inline-block mr-1 align-middle">
              {/* Google SVG icon */}
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M44.5 20H24V28.5H36.9C35.5 33.1 31.2 36.5 26 36.5C19.7 36.5 14.5 31.3 14.5 25C14.5 18.7 19.7 13.5 26 13.5C28.7 13.5 31.1 14.5 33 16.2L38.2 11C34.8 7.9 30.6 6 26 6C15.5 6 7 14.5 7 25C7 35.5 15.5 44 26 44C36.5 44 45 35.5 45 25C45 23.7 44.8 22.3 44.5 20Z" fill="#FFC107"/>
                  <path d="M9.7 14.1L16.6 19.1C18.5 15.2 21.9 13.5 26 13.5C28.7 13.5 31.1 14.5 33 16.2L38.2 11C34.8 7.9 30.6 6 26 6C19.7 6 14.1 9.8 9.7 14.1Z" fill="#FF3D00"/>
                  <path d="M26 44C31.1 44 35.7 42.1 39.1 39.1L32.7 34.3C30.6 35.7 28.1 36.5 26 36.5C20.8 36.5 16.5 33.1 15.1 28.5L8.2 33.6C11.6 39.1 18.2 44 26 44Z" fill="#4CAF50"/>
                  <path d="M44.5 20H24V28.5H36.9C36.3 30.5 35.1 32.2 33.4 33.4C33.4 33.4 33.4 33.4 33.4 33.4L39.1 39.1C41.7 36.7 43.5 33.1 44.5 29.1C44.8 27.7 45 26.4 45 25C45 23.7 44.8 22.3 44.5 20Z" fill="#1976D2"/>
                </g>
              </svg>
            </span>
            {loading ? "Memproses..." : "Login dengan Google"}
          </button>
          <Link href="/regis" className={`w-full block py-3 rounded-xl font-bold shadow transition-all duration-200 text-center ${isDark ? "bg-emerald-700 text-white hover:bg-emerald-800" : "bg-emerald-500 text-white hover:bg-emerald-600"}`}>
            Belum punya akun? Regis
          </Link>
          <Link href="/" className={`w-full block py-3 rounded-xl font-bold shadow transition-all duration-200 text-center border ${isDark ? "bg-transparent border-cyan-700 text-cyan-200 hover:bg-cyan-900/40" : "bg-transparent border-cyan-400 text-cyan-700 hover:bg-cyan-100"}`}>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
