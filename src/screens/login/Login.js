import React, { useState, useEffect, useRef } from 'react'
import BIRDS from 'vanta/dist/vanta.birds.min'
import Button from '../../funcComponents/UI/button/Button';
import Input from '../../funcComponents/UI/input/Input';
import './Login.css';
const Login = (props) => {
    const [state, setState] = useState({ username: '', password: '' })
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
                backgroundColor: 0xdedabe,
                color1: 0x55598,
                color2: 0xffb300,
                colorMode: "lerpGradient",
                birdSize: 4.40,
                wingSpan: 22.00,
                separation: 38.00,
                alignment: 37.00,
                cohesion: 141.00
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(state)
    }

    const validation = () => {
        // let errors = {}
        let storage = JSON.parse(localStorage.getItem('users'));
        console.log(storage)
        storage.forEach(element => { return (element.username === state.username && element.password === state.password) ? goToGame() : false });
    }

    const goToGame = (params) => {
        let storage = JSON.parse(localStorage.getItem('users'));
        let newStorage = storage.find((i) => state.username === i.username)
        let userStorage = localStorage.setItem('loggedUser', JSON.stringify(newStorage));
        console.log(userStorage)

        props.history.push({
            pathname: `/game/?id=${newStorage.username}&login=${true}`,
            state: newStorage
        })

        // console.log('SONO OBJ GIUSTO: ' , newStorage)
        // props.history.push('/game/'+ params, {
        // id: newStorage,
        // login: true
        //local storage dove username === state.username
    }

    const goToRegister = () => { props.history.push('/registration') }

    return (
        <>
            <div style={{ width: '100', height: '100' }} ref={myRef} className="LoginContainer">
                <form className="LoginFormContainer">
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