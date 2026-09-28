import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import HomePage from "@/pages/HomePage";
import BantuanPage from "@/pages/BantuanPage";
import PaketWifiPage from "@/pages/paket-wifi/PaketWifiPage";
import TentangKamiPage from "@/pages/TentangKamiPage";
import DashboardPage from "@/pages/member/DashboardPage";
import LanggananPage from "@/pages/member/LanggananPage";
import PembayaranPage from "@/pages/member/PembayaranPage";
import PengaduanPage from "@/pages/member/pengaduan/PengaduanPage";
import ProfilPage from "@/pages/member/ProfilPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import PaketDetail from "@/pages/paket-wifi/PaketDetail";
import DetailPengaduanPage from "./pages/member/pengaduan/DetailPengaduanPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bantuan" element={<BantuanPage />} />
          <Route path="/paket-wifi" element={<PaketWifiPage />} />
          <Route path="/paket-wifi/:slug" element={<PaketDetail />} />
          <Route path="/tentang-kami" element={<TentangKamiPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/daftar" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/langganan" element={<LanggananPage />} />
          <Route path="/pembayaran" element={<PembayaranPage />} />
          <Route path="/pengaduan" element={<PengaduanPage />} />
          <Route path="/pengaduan-detail" element={<DetailPengaduanPage />} />
          <Route path="/profil" element={<ProfilPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
