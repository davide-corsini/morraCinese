import './Game.css';
import React, { useState, useEffect } from 'react'

const Game = (props) => {
    let storageGet = JSON.parse(localStorage.getItem('users'))
    console.log("storageGet: ", storageGet)
    console.log(props)
    const [result, setResult] = useState({
        rankUser: props.location.state.rank,
        round: 3,
        pointsUser: 0,
        pointsCPU: 0,
        choice: null
    })

    // console.log("punti Utente", result.pointsUser)
    // console.log("punti CPU", result.pointsCPU)

    const handleScore = (input) => {
        switch (input) {
            case "win":
                setResult({ round: result.round - 1, pointsUser: result.pointsUser + 1, pointsCPU: result.pointsCPU - 1 });
                break;
            case "lose":
                setResult({ round: result.round - 1, pointsUser: result.pointsUser - 1, pointsCPU: result.pointsCPU + 1 });
                break;
            default:
                setResult({ round: result.round - 1, pointsUser: result.pointsUser, pointsCPU: result.pointsCPU });
                break;
        }
    }



    const handleGame = (moveUser) => {
        let moveComputer = ["paper", "scissor", "rock"][Math.floor(Math.random() * 3)]
        console.log(`user: ${moveUser} \ncomputer: ${moveComputer}`)

        if (result.round > 0) {
            if (moveUser === moveComputer) return handleScore("draw")
            else {
                if (moveUser === "paper") return (moveComputer === "scissor" ? handleScore("lose") : handleScore("win"))
                if (moveUser === "scissor") return (moveComputer === "rock" ? handleScore("lose") : handleScore("win"))
                if (moveUser === "rock") return (moveComputer === "paper" ? handleScore("lose") : handleScore("win"))
            }
        }

        if (result.pointsUser > result.pointsUser) {
            setResult({ ...result, rankUser: result.rankUser += 1 })
            console.log("L'utente ha vinto")
            console.log("rankUser: ", result.rankUser)
            // console.log("Prova rank", parseInt(storageGet[0].rank) + 1) //incrementa rank
            let currentUser = storageGet.find((i) => props.location.state.username === i.username)
            currentUser.rank = currentUser.rank + 1
            console.log("rank di currentUser", currentUser.rank)
            localStorage.setItem('users', JSON.stringify(storageGet))
        } else {
            console.log("L'utente ha perso")
        }
    }

    useEffect(() => {
        let currentUser = storageGet.find((i) => props.location.state.username === i.username)
        if (result.round === 1 && result.pointsUser > result.pointsCPU) {
            currentUser.rank = currentUser.rank + 1
            console.log("rank di currentUser", currentUser.rank)
        }
    }, [result]);

    const goToRanking = () => { props.history.push('/ranking') }
    return (

        <>
            <div>
                {/* {storageUser.username} */}
                {props.location.state.username}

                <button onClick={goToRanking}>GO TO RANKING</button>
                <div>
                    <button onClick={() => handleGame("rock")}>ROCK</button>
                    <button onClick={() => handleGame("paper")}>PAPER</button>
                    <button onClick={() => handleGame("scissor")}> SCISSORS</button>
                </div>

                <div>
                    ROUND: {result.round}
                    USERS: {result.pointsUser}
                    CPU: {result.pointsCPU}
                </div>
            </div>
        </>
    )
}


export default Game;