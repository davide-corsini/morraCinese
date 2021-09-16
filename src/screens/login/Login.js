import React, { useState,useEffect, useRef } from 'react'
import Button from '../../funcComponents/UI/button/Button';
import Input from '../../funcComponents/UI/input/Input';
import BIRDS from 'vanta/dist/vanta.birds.min'


import './Login.css';
const Login = (props) => {
    const [state, setState] = useState({ username: '', password: '' })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(state)
    }

    const validation = () => {
        let storage = JSON.parse(localStorage.getItem('users'));
        console.log(storage)
        storage.forEach(element => { return (element.username === state.username && element.password === state.password) ? goToGame() : false });
    }

    const goToGame = () => {
        let storage = JSON.parse(localStorage.getItem('users'));
        let newStorage = storage.find((i) => state.username === i.username)
        let userStorage = localStorage.setItem('loggedUser', JSON.stringify(newStorage));
        console.log(userStorage)

        props.history.push({
            pathname: `/game/?id=${newStorage.username}&login=${true}`,
            state: newStorage
        })
    }

    const goToRegister = () => { props.history.push('/registration') }
        const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(BIRDS({
                el: myRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                backgroundColor: 0x82aac7
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    return (
        <>
            <div style={{ width: '100', height: '100' }} ref={myRef} className="LoginContainer">
                <form className="LoginFormContainer">
                    <div className="LoginTitle">
                        <span className="LoginRock">ROCK,</span>
                        <span className="LoginPaper">Paper &amp;</span>
                        <span className="LoginScissors"> Scissors</span>

                    </div>
                    <Input
                        value={state.username}
                        type="text"
                        name="username"
                        placeholder="Username"
                        callback={handleChange}
                        className="LoginInput"
                    />
                    <Input
                        value={state.password}
                        type="text"
                        name="password"
                        placeholder="Password"
                        callback={handleChange}
                        className="LoginInput"
                    />
                    <div className="LoginBtnContainer">

                        <Button
                            type="button"
                            name="loginButton"
                            title="Login"
                            className="LoginForLoginBtn"
                            callback={validation}
                        />
                        <Button
                            type="button"
                            name="loginButton"
                            title="Register"
                            className="LoginForRegisterBtn"
                            callback={goToRegister}
                        />
                    </div>
                </form>
            </div>

        </>
    )
}
export default Login;