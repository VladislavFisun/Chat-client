import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ChatPage from '../component/ChatFolder/ChatPage';
import EnterFormPage from '../pages/EnterFormPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<EnterFormPage/>} />
            <Route path='/ChatPage' element={<ChatPage/>} />
        </Routes>
    );
};

export default AppRoutes;