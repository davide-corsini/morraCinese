import './Game.css';
import React, { useState, useEffect } from 'react'

const Game = (props) => {
    let storageGet = JSON.parse(localStorage.getItem('users')) // [{}, {}, {}]
    console.log("storageGet: ", storageGet)
    console.log(props)
    const [result, setResult] = useState({
        rankUser: props.location.state.rank,
        round: 3,
        pointsUser: 0,
        pointsCPU: 0,
        choice: null
    })
    let risultato = 0;

    console.log(result)
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

        if (result.round > 0) { //controllare se cambiare con IF
            if (moveUser === moveComputer) return handleScore("draw") //ritorna risultato o risultato+1
            else {
                if (moveUser === "paper") return (moveComputer === "scissor" ? handleScore("lose") : handleScore("win")) //ritorna risultato-1 o risultato+1
                if (moveUser === "scissor") return (moveComputer === "rock" ? handleScore("lose") : handleScore("win")) //ritorna risultato-1 o risultato+1
                if (moveUser === "rock") return (moveComputer === "paper" ? handleScore("lose") : handleScore("win")) //ritorna risultato-1 o risultato+1
            }
        }

        if (moveUser > moveComputer) {
            setResult({
                ...result,
                rankUser: result.rankUser += 1
            })
            console.log("rankUser: ", result.rankUser)

            // console.log("Prova rank", parseInt(storageGet[0].rank) + 1) //incrementa rank
            let currentUser = storageGet.find((i) => props.location.state.username === i.username)
            console.log("prova:", currentUser)
            currentUser.rank = currentUser.rank + 1
            console.log("rank di currentUser", currentUser.rank)
            localStorage.setItem('users', JSON.stringify(storageGet))
        };

    }


    useEffect(() => {
        let currentUser = storageGet.find((i) => props.location.state.username === i.username)
        console.log("prova:", currentUser)

        if (result.round === 1 && result.pointsUser > result.pointsCPU) {
            currentUser.rank = currentUser.rank + 1
            console.log("rank di currentUser", currentUser.rank)
        } else {

        }
    }, [result]);

    const goToRanking = () => {
        props.history.push('/ranking')
    }
    return (

        <>
            <div>
                {/* {storageUser.username} */}
                {props.location.state.username}

                <button>GO TO RANKING</button>
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