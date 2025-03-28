import './index.css'
import "@radix-ui/themes/styles.css";
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from '../src/routes/PrivateRoute'
import Home from './pages'
import Contacts from './pages/Contacts';
import PersonalLogin from './pages/user-personal/PersoanlLogin';
import EnterpriseLogin from './pages/user-enterprises/EnterpriseLogin';
import Empresas from './pages/user-enterprises/Enterprises'
import PersonalSidebar from './pages/user-personal/SidebarPersonal';
import EnterpriseSidebar from './pages/user-enterprises/SidebarEnterprise';
import RegisterPersonal from './pages/user-personal/RegisterPersonal'
import RegisterEnterprise from './pages/user-enterprises/RegisterEnterprise'
import News from './pages/News'
import NotFound from './pages/Not-found'
import Terms from './components/client/Terms'
import PersonalDashboard from 'components/Dashboards/PersonalDashboard';


 export default function App() {

  function isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<News />} />
      <Route path="enterprises" element={<Empresas />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="register-enterprise" element={<RegisterEnterprise />} />
      <Route path="register-personal" element={<RegisterPersonal />} />
      <Route path="personal-login" element={<PersonalLogin />} />
      <Route path="enterprise-login" element={<EnterpriseLogin />} />
      <Route path="enterprise-dashboard" element={<EnterpriseSidebar />} />
      <Route path="personal-dashboard" element={<PersonalSidebar />} />
      <Route path="terms" element={<Terms />} />

      <Route path="/personal-dashboard" element={<PrivateRoute auth={isAuthenticated()}>
                <PersonalDashboard />
              </PrivateRoute>} />

      {/* Rotas privadas */}
      {/* <Route path="/enterprises" element={<PrivateRoute element={<Empresas />} />} />
      <Route path="/enterprise-dashboard" element={<PrivateRoute element={<EnterpriseSidebar />} />} />
      <Route path="/personal-dashboard" element={<PrivateRoute element={<PersonalSidebar />} />} /> */}


      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

