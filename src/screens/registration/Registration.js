import React, { useState } from 'react'
import Button from '../../funcComponents/UI/button/Button'
import Input from '../../funcComponents/UI/input/Input'
import utils from '../../utils'
import image1 from '../../assets/images/clipart1623921.png'
import image2 from '../../assets/images/clipart1717870.png'
import Select from '../../funcComponents/UI/select/Select'

const Registration = (props) => {
    let storage = JSON.parse(localStorage.getItem('items'))
    const [state, setState] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        select_option: '',
        users: storage === null ? [] : storage
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(state)
    }

    const matchPassword = () => {
        return (utils.pswRegexCheck(state.password) && utils.checkConfirmPasswordValidity(state.password, state.confirmPassword))
    }
    const formValidation = () => {
        return state.username !== ''
    }

    const jasonLocalStorageValidationForm = () => {
        if (matchPassword() && formValidation()) {
            state.users.push({
                username: state.username,
                password: state.password,
                confirmPassword: state.confirmPassword,
                select_option: state.select_option
            })
            console.log(state.users)
            setState(prevState => ({
                ...prevState,
                users: state.users

            }))
            localStorage.setItem('items', JSON.stringify(state.users))
            goToLogin();
        }
        else {
            alert('Something Wrong')
        }
    }

    const goToLogin = () => {
        props.history.push('/')
    }
    return (
        <>
            {
                state.users.length > 0 &&
                state.users.map((el, i) => {
                    return (
                        <div key={i}>
                            {el.username}
                        </div>
                    )
                })
            }
            <form >
                <Select
                    callback={handleChange}
                    name="select_option"
                    className="array_image"
                    arrayImage={[image1, image2]}
                />
                <Input
                    value={state.username}
                    type="text"
                    name="username"
                    placeholder="Username"
                    callback={handleChange}
                />
                <Input
                    value={state.password}
                    type="password"
                    name="password"
                    placeholder="Password"
                    callback={handleChange}
                />
                <Input
                    value={state.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    callback={handleChange}
                />
                <Button
                    type="button"
                    name="loginButton"
                    title="Conferma"
                    callback={jasonLocalStorageValidationForm}
                />
            </form>
        </>
    )
}

export default Registration