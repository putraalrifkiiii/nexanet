import { useState } from "react";
import MemberLayout from "@/components/MemberLayout";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const ProfilPage = () => {
  const [editing, setEditing] = useState(false);

  const [saved, setSaved] = useState(false);

  const { user, getCurrentUser, updateProfile } = useAuth();
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    no_telepon: "",
    email: "",
  });

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(form);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleStartEdit = () => {
    if (!user) return;

    setForm({
      nama: user.nama,
      alamat: user.alamat,
      no_telepon: user.no_telepon,
      email: user.email,
    });

    setEditing(true);
  };

  const handleCancelEdit = () => {
    if (user) {
      setForm({
        nama: user.nama,
        alamat: user.alamat,
        no_telepon: user.no_telepon,
        email: user.email,
      });
    }

    setEditing(false);
  };

  const profileFields = [
    ["nama", "Nama Lengkap"],
    ["alamat", "Alamat"],
    ["no_telepon", "No. Telepon"],
    ["email", "Email"],
  ] as const;

  return (
    <MemberLayout>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="uppercase tracking-widest mb-3 font-mono text-brand-muted text-[10px]">
          Akun
        </div>
        <h1 className="text-2xl font-black mb-10 font-display text-brand-dark">
          Profil Saya
        </h1>
        <div className="p-6 bg-brand-white border border-brand-border rounded-[14px]">
          <div className="flex items-center gap-4 mb-8">
            <img
              src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(user?.nama ?? "User")}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
              alt="Foto Profil"
              className="w-13 h-13 rounded-full bg-brand-dark object-cover"
            />
            <div>
              <div className="font-bold text-base font-display text-brand-dark">
                {user?.nama ?? "Pengguna"}
              </div>
              <div className="font-mono text-brand-muted text-[11px]">
                NXN-2025-08741
              </div>
            </div>
          </div>
          {saved && (
            <div className="text-xs p-3 mb-6 text-[#059669] font-body rounded-[10px] bg-[#ECFDF5] border border-[#A7F3D0]">
              Profil berhasil disimpan.
            </div>
          )}
          {profileFields.map(([key, label]) => (
            <div
              key={key}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 ${!editing ? "border-b border-brand-border" : ""}`}
            >
              <span className="uppercase tracking-widest shrink-0 w-32 font-mono text-brand-muted text-[10px]">
                {label}
              </span>
              {editing ? (
                <input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-body border border-brand-border rounded-lg text-brand-dark"
                />
              ) : (
                <span className="text-sm font-body text-brand-dark">
                  {user?.[key] ?? "Tidak tersedia"}
                </span>
              )}
            </div>
          ))}
          <div className="flex gap-3 mt-6">
            {editing ? (
              <>
                <button
                  onClick={handleUpdateProfile}
                  className="px-5 py-2.5 text-xs font-semibold hover:opacity-90 transition-opacity font-body bg-brand-dark text-brand-white rounded-lg cursor-pointer"
                >
                  Simpan Perubahan
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-5 py-2.5 text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer font-body border border-brand-border text-brand-dark rounded-lg"
                >
                  Batal
                </button>
              </>
            ) : (
              <button
                onClick={handleStartEdit}
                className="px-5 py-2.5 text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer font-body border border-brand-border text-brand-dark rounded-lg"
              >
                Edit Profil
              </button>
            )}
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfilPage;
