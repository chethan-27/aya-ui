
import { Routes, Route } from 'react-router-dom';
import Index from '../Index';
import Blog from '../pages/Blog';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import { AboutUs, BlogForm, ContactUs } from '../components';

function ApplicationRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/members' element={<ContactUs />} />
            <Route path='/blogs' element={<Blog />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/blogs/new' element={<BlogForm />} />
        </Routes>
    )
}

export default ApplicationRoutes;