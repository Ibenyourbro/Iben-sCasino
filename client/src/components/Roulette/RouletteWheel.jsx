import React, { useState, useEffect } from 'react';
import WheelComponent from 'react-wheel-of-prizes';

const RouletteWheel = ({bets, setBets}) => {
  const [winNum, setWinNum] = useState(null);
  const [firstRender, setFirstRender] = useState(true);
  const segments = [
    '0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2'
  ];
  const [nextWinner, setNextWinner] = useState(segments[Math.floor(Math.random() * segments.length)]);
  const segColors = [
    'green', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'green', 'black', 'red', 'black',
    'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red'
  ];
  const onFinished = (winner) => {
    setWinNum(winner);
  };
  useEffect(()=>{
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    for (const bet in bets) {
      bets[bet] > 0 ? console.log(`You bet on ${bet} and ${winNum === bet ? `won $${bets[bet] * 35}` : 'lost'}`) : null;
    }
    
  }, [winNum]);
  
  
  return (
    <div>
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment='00'// { nextWinner.toString() }
        onFinished={(winner) => onFinished(winner)}
        primaryColor='black'
        contrastColor='white'
        buttonText='Spin!'
        isOnlyOnce={true}
        size={290}
        upDuration={100}
        downDuration={1000}
        fontFamily='Arial'
      />
    </div>
  );
};


export default RouletteWheel;