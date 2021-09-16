import Button from '../../funcComponents/UI/button/Button'
import './Ranking.css'
import React, { useState,useEffect, useRef } from 'react'
import BIRDS from 'vanta/dist/vanta.birds.min'


const Ranking = (props) => {
    let users = JSON.parse(localStorage.getItem('users'))
    users = users === null ? [] : users

    const sort = (property) => {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (b[property] < a[property]) ? -1 : (b[property] > a[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    const goToLogin = () => { props.history.push('/') }

    users.sort(sort("rank"))

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
        <div style={{ width: '100', height: '100' }} ref={myRef} className="RankingContainer">
                <div className="SubRankingContainer">
                    {
                        users && users.map((el, _) => {
                            return (
                                    <div className="nameAndRank">
                                        <p>{el.username}</p>
                                        <p>{el.rank}</p>
                                    </div>
                            )
                        })
                    }
                </div>
                <Button
                    callback={goToLogin}
                    type="button"
                    name="returnToLogin"
                    title="Return to login"
                    className="LoginForRegisterBtn"
                />
            </div>
    )
}
export default Ranking