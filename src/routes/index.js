import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import Home from '../pages/Home';
import Users from '../pages/users';
import EditUsers from '../pages/users/edit';
import Clients from '../pages/clients';
import EditClients from '../pages/clients/edit';
import Partners from '../pages/partners';
import EditPartners from '../pages/partners/edit';
import CreatePartners from '../pages/partners/create';
import Accounting from "../pages/accounting";
import Login from '../pages/Login';
import Config from '../pages/Config';
import Admin from "../pages/Admin";
import Protected from "../components/Protected";

function Index(props) {
    // const jwt = useSelector((state) => state.jwt);
    const { isAuthenticated, jwt, user } = props.auth;
    console.log(isAuthenticated)

    // const [isAuthenticated, setisAuthenticated] = useState(jwt !== null);
    
    // const signin = () => {
    //     setisAuthenticated(true)
    // }
    // const signout = () => {
    //     setisAuthenticated(false)
    // }

    // trocado por isAuthenticated do reducer

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
                <Protected isAuthenticated={isAuthenticated}>
                    <Admin jwt={jwt} user={user}/> 
                </Protected>
            }/>
            <Route path="/home" element={
                <Protected isAuthenticated={isAuthenticated}>
                    <Home jwt={jwt} user={user}/>
                </Protected>
            }/>
            <Route path="/clients" element={
                <Protected isAuthenticated={isAuthenticated}>
                    <Users jwt={jwt} user={user} />
                </Protected>
            }/>
            <Route path="/clients/:at" element={
                <Protected isAuthenticated={isAuthenticated}>
                    <EditUsers jwt={jwt} user={user}/>
                </Protected>
            }/>
            <Route path="/users" element={
                <Protected isAuthenticated={isAuthenticated}>
                    <Clients jwt={jwt} user={user} />
                </Protected>
            }/>
            <Route path="/users/:id" element={
                <Protected isAuthenticated={isAuthenticated}>
                    <EditClients jwt={jwt} user={user}/>
                </Protected>
            }/>
            <Route path="/accounting" element={
                <Protected isAuthenticated={isAuthenticated}>
                    <Accounting jwt={jwt} user={user} />
                </Protected>
            }/>
            <Route path="/plans" element={
                <Protected isAuthenticated={isAuthenticated}>
                    <Partners jwt={jwt} user={user} />
                </Protected>
            }/>
            <Route path="/plans/create" element={
                <Protected isAuthenticated={isAuthenticated}>
                    <CreatePartners jwt={jwt} user={user}/>
                </Protected>
            }/>
            <Route path="/plans/edit/" element={
                <Protected isAuthenticated={isAuthenticated}>
                    <EditPartners jwt={jwt} user={user}/>
                </Protected>
            }/>
            <Route path="/config" element={
                <Protected isAuthenticated={isAuthenticated}>
                    <Config jwt={jwt} user={user} />
                </Protected>
            }/>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });

export default connect(mapStateToProps)(Index);