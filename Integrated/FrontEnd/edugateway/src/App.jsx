
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Student from './pages/Student';
import Course from './pages/Course';
import Institutes from './pages/Institutes';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import './App.css'
import Register from './pages/Register'
import Option from './pages/Option';
import AdminLogin from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';
import AdminAboutUs from './pages/AdminAboutUs';
import AdminInstitutes from './pages/AdminInstitutes';
import AdminCourse from './pages/AdminCourse';
import AdminStudent from './pages/AdminStudent';
import CreateProfile from './pages/createProfile';
function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route index path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/student' element={<Student/>}/>
      <Route path='/institutes' element={<Institutes/>}/>
      <Route path='/course' element={<Course/>}/>
      <Route path='/logout' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route index path='/admin' element={<AdminHome/>}/>
      <Route path='/adminaboutus' element={<AdminAboutUs/>}/>
      <Route path='/adminstudent' element={<AdminStudent/>}/>
      <Route path='/admininstitutes' element={<AdminInstitutes/>}/>
      <Route path='/admincourse' element={<AdminCourse/>}/>
      <Route path='/createprofile' element={<CreateProfile/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
