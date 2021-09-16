import React, { useState, useEffect, useRef } from 'react'
import Button from '../../funcComponents/UI/button/Button'
import Input from '../../funcComponents/UI/input/Input'
import utils from '../../utils'
import image1 from '../../assets/images/dog.gif'
import image2 from '../../assets/images/pork.gif'
import Select from '../../funcComponents/UI/select/Select'
import './Registration.css'
import BIRDS from 'vanta/dist/vanta.birds.min'




const Registration = (props) => {
    let storage = JSON.parse(localStorage.getItem('users'))
    const [state, setState] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        select_option: image1,
        users: storage === null ? [] : storage,
        rank: 0
    })


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


    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const matchPassword = () => { return (utils.pswRegexCheck(state.password) && utils.checkConfirmPasswordValidity(state.password, state.confirmPassword)) }
    const formValidation = () => { return state.username !== '' }

    const jsonLocalStorageValidationForm = () => {
        if (matchPassword() && formValidation()) {
            state.users.push({
                username: state.username,
                password: state.password,
                confirmPassword: state.confirmPassword,
                select_option: state.select_option,
                rank: state.rank
            })
            console.log(state.users)
            setState(prevState => ({
                ...prevState,
                users: state.users
            }))
            localStorage.setItem('users', JSON.stringify(state.users))
            goToLogin();
        }
        else {
            alert('Something Wrong')
        }
    }

    const goToLogin = () => { props.history.push('/') }
    return (
        <div style={{ width: '100', height: '100' }} ref={myRef} className="RegistrationContainer">
            

            <form className="RegistrationForm">
                <Select
                    callback={handleChange}
                    name="select_option"
                    className="RegistrationSelect"
                    arrayImage={[image1, image2]}
                />
                <Input
                    value={state.username}
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="RegistrationInput"
                    callback={handleChange}
                />
                <Input
                    value={state.password}
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="RegistrationInput"
                    callback={handleChange}
                />
                <Input
                    value={state.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="RegistrationInput"
                    callback={handleChange}
                />
                <Button
                    type="button"
                    name="loginButton"
                    title="Register"
                    className="RegistrationBtn"
                    callback={jsonLocalStorageValidationForm}
                />
            </form>
        </div>
    )
}

export default Registration