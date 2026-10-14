import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/routes/ProtectedRoute";
import GuestRoute from "@/components/routes/GuestRoute";

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
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/daftar" element={<GuestRoute><RegisterPage /></GuestRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/langganan" element={<ProtectedRoute><LanggananPage /></ProtectedRoute>} />
          <Route path="/pembayaran" element={<ProtectedRoute><PembayaranPage /></ProtectedRoute>} />
          <Route path="/pengaduan" element={<ProtectedRoute><PengaduanPage /></ProtectedRoute>} />
          <Route path="/pengaduan-detail" element={<ProtectedRoute><DetailPengaduanPage /></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute><ProfilPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
