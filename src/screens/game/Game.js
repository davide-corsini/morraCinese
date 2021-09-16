import './Game.css';
import React, { useState, useEffect, useRef } from 'react'
import BIRDS from 'vanta/dist/vanta.birds.min'
// import FirstImage from './../../assets/images/clipart1623921.png'
// import SecondImage from './../../assets/images/clipart1717870.png'
import Spritesheet from 'react-responsive-spritesheet';
import Rock from './../../assets/images/rock.gif'
import Paper from './../../assets/images/paper.gif'
import Scissors from './../../assets/images/scissors.gif'
import Button from './../../funcComponents/UI/button/Button'


const Game = (props) => {
    let storageGet = JSON.parse(localStorage.getItem('users'))
    let currentUser = storageGet.find((i) => props.location.state.username === i.username)

    const [result, setResult] = useState({
        rankUser: props.location.state.rank,
        round: 3,
        pointsUser: 0,
        pointsCPU: 0,
        choiceCPU: '',
        ending: ''
    })
    let moveComputer = "";
    let endingSentence = "";


    const handleScore = (input) => {
        switch (input) {
            case "win":
                setResult({ ...result, choiceCPU: moveComputer, round: result.round - 1, pointsUser: result.pointsUser + 1, pointsCPU: result.pointsCPU - 1 });
                break;
            case "lose":
                setResult({ ...result, choiceCPU: moveComputer, round: result.round - 1, pointsUser: result.pointsUser - 1, pointsCPU: result.pointsCPU + 1 });
                break;
            default:
                setResult({ ...result, choiceCPU: moveComputer, round: result.round - 1, pointsUser: result.pointsUser, pointsCPU: result.pointsCPU });
                break;
        }
    }

    const handleGame = (moveUser) => {

        if (result.round >= 1) {
            moveComputer = ["paper", "scissor", "rock"][Math.floor(Math.random() * 3)]
            if (moveUser === moveComputer) return handleScore("draw")
            else {
                if (moveUser === "paper") return (moveComputer === "scissor" ? handleScore("lose", moveComputer) : handleScore("win", moveComputer))
                if (moveUser === "scissor") return (moveComputer === "rock" ? handleScore("lose", moveComputer) : handleScore("win", moveComputer))
                if (moveUser === "rock") return (moveComputer === "paper" ? handleScore("lose", moveComputer) : handleScore("win", moveComputer))
            }
        }

        if (result.pointsUser > result.pointsCPU) {
            console.log("L'utente ha vinto")
            endingSentence = "You win"
            currentUser.rank = currentUser.rank + 1
            localStorage.setItem('users', JSON.stringify(storageGet))
        } else if (result.pointsUser < result.pointsCPU) {
            console.log("L'utente ha perso")
            endingSentence = "You lose"
            currentUser.rank = currentUser.rank - 1
            localStorage.setItem('users', JSON.stringify(storageGet))
        } else {
            console.log("L'utente ha pareggiato")
            endingSentence = "You draw"
        }
        setResult({ ...result, ending: endingSentence })
    }

    const goToRanking = () => {
        props.history.push('/ranking')
    }

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
        <div style={{ width: '100', height: '100' }} ref={myRef} className="GameMainContainer">
            <div className="GameContainer">

                <div className="GameCardUser">
                    <div className="GameCardTitle GameUserName">

                        <h3
                            className="GameUserName"
                            style={{ textTransform: 'capitalize' }}
                        >{props.location.state.username}</h3>

                    </div>
                    <div className="GameUserImage">
                        <img className="GameImageChoice" src={props.location.state.select_option} alt="title" />
                    </div>

                    <div className="GameUserAttack">
                        <div className="GameUserChoice" onClick={() => handleGame("rock")}><img src={Rock} alt="title" /></div>
                        <div className="GameUserChoice" onClick={() => handleGame("paper")}><img src={Paper} alt="title" /></div>
                        <div className="GameUserChoice" onClick={() => handleGame("scissor")}><img src={Scissors} alt="title" /></div>
                    </div>
                </div>


                <div className="GameMenu">

                    <Button
                        title="Ranking"
                        className="GameGoToRanking"
                        callback={goToRanking}
                    />

                    <div className="GameRound">
                        <span className="GameRemaining">REMAINING ROUNDS: {result.round}</span>
                    </div>
                    <div className="GamePoints">
                        <span>{result.pointsUser}</span>
                        <span>VS</span>
                        <span>{result.pointsCPU}</span>
                    </div>
                    <div className="GamePoints">
                        <span>{result.ending}</span>
                    </div>
                </div>

                <div className="GameCardCpu">
                    <div className="GameCardTitle GameUserName">
                        <h3
                            className="GameUserName"
                            style={{ textTransform: 'capitalize' }}
                        >CPU</h3>
                    </div>
                    <div className="GameUserImage">
                        <Spritesheet
                            className={`my-element__class--style`}
                            image={`https://raw.githubusercontent.com/danilosetra/react-responsive-spritesheet/master/assets/images/examples/sprite-image-horizontal.png`}
                            widthFrame={420}
                            heightFrame={500}
                            steps={14}
                            fps={10}
                            autoplay={false}
                            loop={true}
                            onMouseEnter={spritesheet => {
                                spritesheet.pause();
                            }}
                            onMouseLeave={spritesheet => {
                                spritesheet.play();
                            }}
                        />
                    </div>
                    <div className="GameUserDescription" style={{ fontFamily: 'Open Sans Condensed' }}>
                        My choice is: {result.choiceCPU}
                    </div>
                </div>
            </div>
            <div>
                <div className="GameSocialContainer">
                    <div className="flex social-btns">
                        <a className="app-btn blu flex vert" href="http:apple.com">
                            <i className="fab fa-apple"></i>
                            <p><span className="apple"> Available on the </span><br /> <span className="big-txt">App Store</span></p>
                        </a>

                        <a className="app-btn blu flex vert" href="http:google.com">
                            <i className="fab fa-google-play"></i>
                            <p>Get it on <br /> <span className="big-txt">Google Play</span></p>
                        </a>

                        <a className="app-btn blu flex vert" href="http:alphorm.com">
                            <i className="fas fa-desktop"></i>
                            <p>Application <br /> <span className="big-txt">Desktop</span></p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Game;