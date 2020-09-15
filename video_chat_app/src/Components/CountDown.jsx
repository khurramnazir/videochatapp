import React, {useState, useEffect} from 'react';


const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState(10);
    
    const take1Second = () => {
        if (timeLeft>0) {
            console.log(timeLeft)
            return setTimeLeft(timeLeft-1)
        }
    }
    
    if (timeLeft>0){setInterval(take1Second, 1000)}
    
    return (
        <div>
            {timeLeft>0 && <p>{timeLeft}</p>}
            {timeLeft===0 && <p>WTF</p>}
        </div>
    );
};

export default CountDown;