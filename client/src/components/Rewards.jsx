import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Rewards = ({ user }) => {

  const [rewardClaimed, setRewardClaimed] = useState(false);


  const updateUser = () => {
    axios.put(`/routes/userDatabase/users/${user[0]}`, {
      users: {
        money: user[5] + 200
      }
    })
    .then(() => {
      setRewardClaimed(true);
      console.log('put worked');
    })
    .catch((err) => {
      console.error(err);
    })
  }


  return (
    <h3>

      <div>
        {
          user[5] === 8400 ? <Link to='/rewards'><button className='rewardButton'>New Reward!</button></Link> : ''
        }
        </div>
        
      <div>As a thank you for returning, here is $200!</div>

      <div>
        {
          rewardClaimed ? <button>Reward Claimed</button> : <button style ={{fontSize: '25px', lineHeight: '25px'}} onClick={updateUser}>Claim Reward</button>
        }
      </div>

      <div>
        {
          user[5] > 8400 ? <Link to='/rewards'><button className='rewardButton' style={{fontSize: '13px', lineHeight: '13px'}}>See Earned Rewards</button></Link> : ''
        }
      </div>

    </h3>
  )
}


export default Rewards;
