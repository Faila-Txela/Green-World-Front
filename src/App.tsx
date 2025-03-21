import './index.css'
import "@radix-ui/themes/styles.css";
import { Routes, Route } from 'react-router-dom'
import Home from './pages'
import Contacts from './pages/Contacts';
import Login from './pages/Login'
import Empresas from './pages/user-enterprises/Enterprises'
import Dashboard from './pages/user-enterprises/Sidebar';
import Feedback from './components/client/Feedback';
import Relatos from './components/Relatos';
import NotFound from './pages/Not-found'
import RegisterEnterprise from './pages/Register/RegisterEnterprise'
import News from './pages/News'
import Terms from './components/client/Terms'
import RegisterPersonal from './pages/Register/RegisterPersonal'

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
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="relatar" element={<Relatos />} />
      <Route path="terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

