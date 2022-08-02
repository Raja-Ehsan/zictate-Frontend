import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import refresh from "../auth/auth";
export default function Edit() {
    const currentUser = JSON.parse(sessionStorage.getItem("User"));
    const navigate = useNavigate();
    const [formdata, setformdata] = React.useState({
        user: "", password: "", confirmpassword: "", password_: ""
    })

    const [required, setrequired] = React.useState({
        state: false,
        state1: false,
        style: { color: "red", marginLeft: '30px' }
    })

    const [checkEmailError, setCheckEmailError] = React.useState({
        state: false,
        style: { color: "red" }
    })

    const [checkPassError, setCheckPassError] = React.useState({
        state: false,
        style: { color: "red" }
    })

    const [checkError, setCheckError] = React.useState({
        state: false,
        style: { color: "red" }
    })

    const [matchError, setmatchError] = React.useState({
        state: false,
        style: { color: "red" }
    })

    const [alreadyExists, setAlreadyExists] = React.useState({
        state: false,
        style: { color: "red", marginLeft: '30px' }
    })

    const [emailError, setEmailError] = React.useState({
        state: false,
        style: { color: "red" }
    })



    async function checkauth() {
        let response = await refresh()
        if (response.statuscode) {
            if (response.statuscode === 403)
                navigate('/403')
            else if (response.statuscode === 401)
                navigate('/401')
        }
    }

    React.useEffect(() => {
        checkauth()
    })

    useEffect(() => {
        fetch(`/Profilee/${currentUser.id}`)
            .then(res => res.json())
            .then(res => {
                setformdata({ ...res, password_: '' })
            })
    }, [currentUser.id])


    function handleSubmit() {
        
        var userCheck = /^[A-Za-z. ]{3,30}$/;
        var email=/^[A-Za-z_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
        var password=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if (!formdata.email.includes('@gmail.com')) setEmailError((prev) => {
            return {
                ...prev,
                state: true
            }
        })
        else if(!formdata.email||!formdata.password_||!formdata.user_name||!formdata.city||!formdata.province){
            setrequired((prev) => {
                return {
                    ...prev,
                    state: true
                }
            })
        }
        else if(!email.test(formdata.email)){
            setCheckEmailError((prev) => {
                return {
                    ...prev,
                    state: true
                }
            })
        }
        else if(!userCheck.test(formdata.user_name)||!userCheck.test(formdata.city)||!userCheck.test(formdata.province)){
            setCheckError((prev)=>{
                return{
                    ...prev,
                    state:true
                }
            })
        }
        else {
            fetch(`/updateProfile/${currentUser.id}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formdata)
            }).then((res) => {
                if (res.status === 403) {
                    setrequired((prev) => {
                        return {
                            ...prev,
                            state: true
                        }
                    })
                }
                return res.json()
            }).then((res) => {
                if(res.exists){
                    setAlreadyExists(prev=>{
                        return {
                            ...prev,
                            state:true
                        }
                    })
                }
                else
                navigate('/Profile/' + currentUser.id)
            })
        }

    }

    function handleChange(event) {
        if (required.state)
            setrequired((prev) => {
                return {
                    ...prev,
                    state: false
                }
            })
        if (event.target.name === "password_" || event.target.name === "confirmpassword") {
            if (event.target.value === formdata.password_) {
                setmatchError(prev => {
                    return {
                        ...prev,
                        state: false
                    }
                })
            }
            else {
                setmatchError(prev => {
                    return {
                        ...prev,
                        state: true
                    }
                })
            }
        }
        setformdata(
            (prev) => {
                return {
                    ...prev,
                    [event.target.name]: event.target.value
                }
            }
        )
    }
    console.log(formdata);

    return (
        <div className="page">
            <div className="register-form">
                <h2 className="register-title">Edit Profile</h2>
                <div className="input-container">
                    <div style={{ flex: "50%" }}>
                        <label className="labels" htmlFor="user_name">Username: </label> <br />
                        <input type="text" className="fieldss"
                            id='user_name'
                            name='user_name'
                            value={formdata.user_name}
                            onChange={handleChange}></input>
                    </div>
                    <div style={{ flex: "50%" }}>
                        <label className="labels" htmlFor="email">Email: </label> <br />
                        <input type="email" className="fieldss"
                            id='email'
                            name='email'
                            value={formdata.email}
                            onChange={handleChange}></input>
                            {emailError.state ? <p className="error1" style={{ color: 'red' }}> <> Email must include '@gmail.com'</> </p> : <p style={{ height: '6px' }}></p>}
                            {checkEmailError.state ? <p className="error1" style={{ color: 'red' }}> <>Email not valid  [special characters and numbers are not allowed] '</> </p> : <p style={{ height: '6px' }}></p>}

                    </div>

                </div>
                <br />
                <div className="input-container">
                    <div style={{ flex: "50%" }}>
                        <label className="labels" htmlFor="password_">Password: </label> <br />
                        <input type="password" className="fieldss"
                            id='password_'
                            name='password_'
                            value={formdata.password_}
                            onChange={handleChange}></input>
                    </div>
                    <div style={{ flex: "50%" }}>
                        <label className="labels" htmlFor="confirm password">Confirm Password: </label> <br />
                        <input type="password" className="fieldss"
                            id='confirm-password'
                            name='confirmpassword'
                            value={formdata.confirmpassword}
                            onChange={handleChange}></input>

                        {matchError.state ? <p className="error1" style={{ color: 'red' }}> <> Passwords do not match</> </p> : <p style={{ height: '6px' }}></p>}
                    </div>
                </div>
                <div className="input-3-container">
                    <div style={{ flex: "3" }}>
                        <label className="labels" htmlFor="city">City: </label> <br />
                        <input type="text" className="fieldss"
                            id='city'
                            name='city'
                            value={formdata.city}
                            onChange={handleChange}></input>
                    </div>
                    <div style={{ flex: "1.5" }}>
                        <label className="labels" htmlFor="relationship">Status: </label> <br />
                        <select id='relationship' name='relationship' onChange={handleChange} className="select-status" style={{ height: '30px' }}>
                            <option value='married' > married</option>
                            <option value='single' >single</option>
                        </select>
                        {/* <label className="labels" htmlFor="confirm password">Confirm Password: </label> <br />
                        <input type="password" className="fieldss"
                            id='confirm-password'
                            name='confirmpassword'
                            value={formdata.confirmpassword}
                            onChange={handleChange}></input> */}
                    </div>
                    <div style={{ flex: "3" }}>
                        <label className="labels" htmlFor="province">Province: </label> <br />
                        <input type="text" className="fieldss"
                            id='province'
                            name='province'
                            value={formdata.province}
                            onChange={handleChange}></input>
                    </div>
                </div>
                <br />
                {required.state ? <p style={required.style} className="error"> <small style={required.style}>You need to fill all fields</small> </p> : ""}
                {alreadyExists.state ? <p style={alreadyExists.style} className="error"> <small style={alreadyExists.style}>Username Already Exists</small> </p> : ""}
                {checkError.state ? <p style={alreadyExists.style} className="error"> <small style={alreadyExists.style}>Input is invalid [special characters and numbers are not allowed in input] </small> </p> : ""}
                {checkPassError.state ? <p style={alreadyExists.style} className="error"> <small style={alreadyExists.style}>Password is not Valid </small> </p> : ""}
                {!matchError.state ? <button className="register-button" onClick={!matchError.state ? () => { handleSubmit() } : () => { }} >Save</button> : <button className="register-button" disabled >Save</button>}
            </div>
        </div>

    )
}