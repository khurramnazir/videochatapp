import React, {useState, useEffect} from 'react';
import * as api from "../utils/api";


const Trivia = () => {
    const [trivia, setTrivia] = useState({question:'', answer:null})
    const {question, correct_answer} = trivia
    const [showAnswer, setShowAnswer] = useState(false);
    const [yourAnswer, setYourAnswer] = useState(null);
    const [partnerAnswer, setPartnerAnswer] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    let [points, setPoints] = useState(0);
    
    const submitAnswers = () => {
        if( yourAnswer === correct_answer){
          setPoints(points++)
        }
        if( partnerAnswer === correct_answer){
          setPoints(points++)
        }
        setShowAnswer(!showAnswer)
        setSubmitted(!submitted)
    }

    const getTrivia = () => {
        api.fetchTrivia()
        .then((trivia) => {
          setShowAnswer(!showAnswer)
          setSubmitted(!submitted)
          setTrivia(trivia.results[0])
        })
    }

    useEffect(()=>{
        getTrivia()
    }, [])
    
    return (
        <>
          <h2> Trivia Game </h2> 
          <p> {points} </p> 
          <p> {question} </p> 
          <button onClick={()=>{setYourAnswer(true)}}> True </button>
          <button onClick={()=>{setYourAnswer(false)}}> False </button>
          <br/>
          <button onClick={submitAnswers}> Submit </button>
          <br/>
          {showAnswer && <p> {correct_answer} </p> }
          {submitted && <button onClick={getTrivia}> Next Question </button>}
        </>
    );
};

export default Trivia;