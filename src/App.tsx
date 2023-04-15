import {HashRouter, Route, Routes, Navigate} from 'react-router-dom'
// @ts-ignore
import Login from '@/pages/login'
// @ts-ignore
import Home from '@/pages/home'
// @ts-ignore
import Main from '@/pages/main'
// @ts-ignore
import Index from '@/pages/index'

// @ts-ignore
import Register from '@/pages/register'
// @ts-ignore
import Merge   from "@/pages/merge";
// @ts-ignore
import List from "@/pages/list";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/main/:userID/:modelID" element={<Main/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home/:userID" element={<Home/>}/>
                <Route path="/index/:userID/:modelID/:moduleID" element={<Index/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/merge/:userID" element={<Merge/>}/>
                <Route path="/list/:userID" element={<List/>}/>
                <Route path="*" element={<Navigate to="/register"/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
