import React, {useState, useEffect} from 'react';
import * as api from "../utils/api";

const Trivia = (props) => {
    const [gameStarted, setGameStarted] = useState(false)
    const [trivia, setTrivia] = useState({question:null, answer:null})
    const [yourAnswer, setYourAnswer] = useState(null);
    const [partnerAnswer, setPartnerAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    let [points, setPoints] = useState(0);
    const {connection, pair, roomLobby} = props
    
    useEffect(()=>{

      connection.on("recievedQuestion", (triv)=>{
        console.log(triv, "<<< -- recieved question")
        setTrivia(triv.results[0])
        setGameStarted(true)
      })
  
      connection.on("recievedAnswer", (ans)=>{
        console.log(ans, "<<< -- recieved answer")
        setPartnerAnswer(ans)
      })

    }, [partnerAnswer, trivia])

    function sendAnswer(e){
      const ans = e.target.value
      console.log(ans, "<<< -- sent answer")
      setYourAnswer(ans)
      connection.emit("sendAns", {pair, roomLobby, ans})
    }

    function getTrivia(){
      api.fetchTrivia()
      .then((triv) => {
        setSubmitted(false)
        setTrivia(triv.results[0])
        connection.emit("sendQuestion", {pair, roomLobby, triv})
      })
    }

    function startGame(){
      setGameStarted(true)
      getTrivia()
    }

    function submitAnswers(){
      if( yourAnswer === trivia.correct_answer){
        setPoints(points++)
      }
      if( partnerAnswer === trivia.correct_answer){
        setPoints(points++)
      }
      setSubmitted(true)
    }
    
    return (
        <>
          <h2> Trivia Game </h2> 
          {gameStarted === false ? 
            <button onClick={startGame} value={startGame}> Start Game </button> 
            :
            <>
              <p> {points} </p> 
              <p> {trivia.question} </p> 
              <button onClick={sendAnswer} value={true}> True </button>
              <button onClick={sendAnswer} value={false}> False </button>
              <br/>
              {yourAnswer && partnerAnswer && <button onClick={submitAnswers}> Submit </button>}
              <br/>
              {submitted && 
              <>
                <p> {trivia.correct_answer} </p> 
                <button onClick={getTrivia}> Next Question </button>
              </>
              }
            </>
          }
        </>
    );
};

export default Trivia;