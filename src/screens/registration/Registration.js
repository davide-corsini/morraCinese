import React, { useState } from 'react'
import Button from '../../funcComponents/UI/button/Button'
import Input from '../../funcComponents/UI/input/Input'
import utils from '../../utils'


const Registration = (props) => {
    let storage = JSON.parse(localStorage.getItem('items'))
    const [state, setState] = useState({
        username: '',
        password: '',
        confirmPassword: '',
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
        let isValid = formValidation();
        if (matchPassword() && isValid) {
            let array = state.users;
            array.push({
                username: state.username,
                password: state.password,
                confirmPassword: state.confirmPassword
            })
            console.log(array)
            setState(prevState =>({
                ...prevState,
                users: array

            }))
            localStorage.setItem('items', JSON.stringify(array))
            goToGame();
        }
        else{
            alert('Something Wrong')
        }
    }

    const goToGame = () => {
        props.history.push('/game:id')
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