"use client";
import { useState } from "react";
import { Google } from "lucide-react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/"); // Redirect to home after successful login
    } catch (error) {
      console.error("Error during Google login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white">
        <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Memproses..." : (
            <>
              <Google className="w-5 h-5 mr-2" />
              Login dengan Google
            </>
          )}
        </button>
      </div>
    </div>
  );
}