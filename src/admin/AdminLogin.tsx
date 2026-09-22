import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminLoginProps {
  onLoginSuccess: (userEmail: string) => void;
  onBypassDemo: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBypassDemo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    if (!supabase) {
      setErrorMsg('Kunci API Supabase belum diisi di file .env. Anda bisa mencoba "Masuk Mode Demo".');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          setErrorMsg('Akun belum terdaftar di Supabase atau kata sandi salah. Silakan buat akun di dashboard Supabase (Authentication -> Users -> Add User) atau klik "Masuk Mode Demo / Uji Coba" di bawah.');
        } else {
          setErrorMsg(error.message || 'Login gagal. Periksa kembali email dan kata sandi Anda.');
        }
      } else if (data.user) {
        onLoginSuccess(data.user.email || 'Admin');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem saat mencoba login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F8FAFC] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-editorial font-bold text-xl mx-auto mb-3 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
          HR
        </div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold text-white">
          Portal Manajemen Arsip
        </h1>
        <p className="text-xs text-slate-400 font-light mt-1">
          By Husein Rosid &bull; Pengelolaan Foto & Koleksi Kuratorial
        </p>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bento-card p-8 sm:p-10 border border-white/10 shadow-2xl">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-amber-400 font-semibold mb-6 pb-2 border-b border-white/[0.08]">
          <ShieldCheck className="w-4 h-4" />
          <span>Autentikasi Akses Khusus</span>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <div className="flex-1">{errorMsg}</div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
              Alamat Email Admin
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@byhuseinrosid.my.id"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
          >
            {loading ? (
              <span>Memverifikasi Akun...</span>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo / Local Preview Bypass */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
          <p className="text-xs text-slate-400 font-light mb-3">
            Ingin mencoba antarmuka tanpa setup Supabase login sekarang?
          </p>
          <button
            type="button"
            onClick={onBypassDemo}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Masuk Mode Demo / Uji Coba</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-8 text-center">
        <a
          href="/"
          className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4"
        >
          &larr; Kembali ke Website Portofolio Publik
        </a>
      </div>
    </div>
  );
};
