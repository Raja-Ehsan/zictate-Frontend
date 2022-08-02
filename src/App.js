import React from "react"
import Login from "./components/login"
import Register from "./components/register"
import Nav from "./components/Nav"
import Test from "./components/test"
import Messenger from "./components/messenger"
import Dashboard from "./components/dashboard";
import Display401 from "./components/401";
import Display403 from "./components/403";
import Friends from "./components/Friends"
import Home from "./components/Home";
import Profile from "./components/Profile"
import Edit from "./components/Edit"
import {  Routes, Route } from "react-router-dom"


export default function App() {
    return (
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dash" element={<div><Nav /><Dashboard /></div>} />
                <Route path="/test" element={<Test />}/>
                <Route path="/messenger" element={<Messenger />}/>
                <Route path="/edit" element={<Edit />}/>
                <Route path="/friends" element={<Friends />}/>
                <Route path="/Home" element={<Home />}/>
                <Route path="/Profile/:id" element={<Profile />}/>
                <Route path="/401" element={<Display401 />}/>
                <Route path="/403" element={<Display403 />}/>
            </Routes>
    )
}