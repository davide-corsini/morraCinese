import './Ranking.css'
import React, { useState, useEffect, useRef } from 'react'

const Ranking = () => {
    let storage = JSON.parse(localStorage.getItem('users'))
    const [state, setState] = useState({
        users: storage === null ? [] : storage
    });
    const prova = () => {
        console.log(storage)

    }
    return (
        <>
            <div className="RankingContainer">
                <div className="SubRankingContainer">
                    {
                        state.users &&
                        state.users.map((el, index) => {
                            return (

                                <div className="RankingRow">
                                    {el.username}
                                    {el.rank}
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={prova}>click</button>
            </div>
        </>
    )
}
export default Ranking