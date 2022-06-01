import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import Rewards from './Rewards.jsx';

class Profile extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: [] 
    };
    this.getUser = this.getUser.bind(this);
  }

  async getUser() {
    const data = await axios.get('/routes/profile/user'); 
    
    return data.data;
   
      
  }
  async componentDidMount() {
    const userData = await this.getUser(); 
    
    this.setState({
      user: [Object.values(userData)] 
    });
  }

  render() {
    const style = {
      backgroundColor: '#35654d',
      padding: '10px',
      textShadow: '0px 0px 4px #fff, 1px 1px 2px black, 0px 0px 1px red',
      textAlign: 'center',
      fontWeight: '900',
      
      
    };
    const border = {
      borderWidth: '5px',
      borderStyle: 'dotted',
      paddingLeft: '15px',
      marginRight: '80px',
      marginLeft: '80px',
      borderShadow: '4px',
      boxShadow: '3px 3px 3px',
      
    };

    //map over user profile from database and render to profile page
    return (
      <div style={style}>
        <div className='card-panel green darken-2' style={border}><h1>Player's Room</h1></div>
        
        {
          this.state.user.map((info, i) => {
            return (
              <div key={i}>
                <div className='row'>
                  <h2>{info[2]}</h2>
                </div>
                <img className='circle responsive-img z-depth-4' src={info[3]} style={{width: 200}} />
                <h3>{info[4]}</h3>
                <h4>Baller Status: {info[5] > 75 ? 'Baller' : info[5] <= 75 && info[5] >= 35 ? 'Bum' : 'Broke!!!'}</h4>
                <h3>$: {info[5]}</h3>
                <div><Rewards initUser={info} /></div>
              </div>
            );
          })
        }
      </div>
    );
  }

}

export default Profile;