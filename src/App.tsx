import './index.css'
import "@radix-ui/themes/styles.css";
import { Routes, Route } from 'react-router-dom'
import Home from './pages'
import Contacts from './pages/Contacts';
import PersonalLogin from './pages/ComumUser/PersoanlLogin';
import EnterpriseLogin from './pages/user-enterprises/EnterpriseLogin';
import Empresas from './pages/user-enterprises/Enterprises'
import Dashboard from './pages/user-enterprises/Sidebar';
import Feedback from './components/client/Feedback';
import Relatos from './components/Relatos';
import RegisterPersonal from './pages/ComumUser/RegisterPersonal'
import RegisterEnterprise from './pages/user-enterprises/RegisterEnterprise'
import News from './pages/News'
import NotFound from './pages/Not-found'
import Terms from './components/client/Terms'


 export default function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="news" element={<News />} />
      <Route path="enterprises" element={<Empresas />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="register-enterprise" element={<RegisterEnterprise />} />
      <Route path="register-personal" element={<RegisterPersonal />} />
      <Route path="personal-login" element={<PersonalLogin />} />
      <Route path="enterprise-login" element={<EnterpriseLogin />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="relatar" element={<Relatos />} />
      <Route path="terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

