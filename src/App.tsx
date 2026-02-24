import "./index.css";
import "@radix-ui/themes/styles.css";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/private_routes";
import PrivateRoute2 from "./routes/private_routes2";
import Home from "./pages";
import Contacts from "./pages/Contacts";
import PersonalLogin from "./pages/user-personal/PersoanlLogin";
import EnterpriseLogin from "./pages/user-enterprises/EnterpriseLogin";
import Empresas from "./pages/user-enterprises/Enterprises";
import PersonalSidebar from "./pages/user-personal/SidebarPersonal";
import EnterpriseSidebar from "./pages/user-enterprises/SidebarEnterprise";
import RegisterPersonal from "./pages/user-personal/RegisterPersonal";
import RegisterEnterprise from "./pages/user-enterprises/RegisterEnterprise";
import SidebarAdmin from "./pages/admin/SidebarAdmin";
import News from "./pages/News";
import NotFound from "./pages/ErrorPage";
import Terms from "./components/Terms";
import PublicRoutesPersonal from "./routes/public_routes_personal";
import Notifications from "./pages/Notifications";
import {ProfileProvider} from './routes/profileContext'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<News />} />
      <Route path="/enterprises" element={<Empresas />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/register-enterprise" element={<RegisterEnterprise />} />
      <Route path="/register-personal" element={<RegisterPersonal />} />
      <Route
        path="/personal-register"
        element={
          <ProfileProvider>
            <Routes>{/* ... */}</Routes>
          </ProfileProvider>
        }
      />
      {/* <Route path="/personal-login" element={<PersonalLogin />} />
      <Route path="/notificacao" element={<Notifications />} />
      <Route path="/login-enter" element={<EnterpriseLogin />} />
      <Route path="/dash-enter" element={<EnterpriseSidebar />} />
      <Route path="/admin" element={<SidebarAdmin />} />
      <Route path="/dash-per" element={<PersonalSidebar />} /> */}
       <Route
        path="/personal-login"
        element={
          <PublicRoutesPersonal>
            <PersonalLogin />
          </PublicRoutesPersonal>
        }
      />
      <Route path="/enterprise-login" element={<EnterpriseLogin />} />
      <Route path="/terms" element={<Terms />} />
      <Route
        path="/personal-dashboard"
        element={
          <PrivateRoute>
            <PersonalSidebar />
          </PrivateRoute>
        }
      />
      <Route
        path="/enterprise-dashboard"
        element={
          <PrivateRoute2>
            <EnterpriseSidebar />
          </PrivateRoute2>
        }
      />
      ´
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <SidebarAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="/notificacao"
        element={
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        }
      /> 
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
