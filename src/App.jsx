import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import MobileContainer from './components/MobileContainer'


export default function App() {
return (
<BrowserRouter>
<MobileContainer>
<Routes>
<Route path='/' element={<Landing />} />
<Route path='/login' element={<Login />} />
<Route path='/signup' element={<Signup />} />
<Route path='/profile' element={<Profile />} />
</Routes>
</MobileContainer>
</BrowserRouter>
)
}