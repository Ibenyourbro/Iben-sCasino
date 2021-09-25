import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import axios from 'axios';

import BlackjackDealer from './BlackjackDealer.jsx';
import BlackjackUser from './BlackjackUser.jsx';

class Blackjack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealerHand: [],
      userHand: [],
      deckId: ''
    };
    this.initialDeal = this.initialDeal.bind(this);
    this.userHitCard = this.userHitCard.bind(this);
    this.dealerHitCard = this.dealerHitCard.bind(this);
  }

  /**
   * a initialDeal function that deals cards.
   * @returns the cards to be distributed
   * this initialDeal is attatched to the deal button
   *    * 
   */

  async initialDeal() {
    try {
      console.log('click')
      const data = await axios.get('/routes/blackjack');
      console.log('d.dh', data.data.dealerHand, 'd.uH', data.data.userHand, data)

      await this.setState({
        dealerHand: data.data.dealerHand,
        userHand: data.data.userHand,
        deckId: data.data.deckId
      })
      console.log('thisstate', this.state)
      return;
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * this is a function to add a card for the user
 
   */
  async userHitCard() {
    try {
      const hand = await axios.get(`/routes/blackjack/hit/${this.state.deckId}&user`)
      console.log('hand', hand)
      this.setState({
        userHand: hand.data.user
      })
    }
    catch (err) {
      console.log('err in userHitCard', err )
    }
  }

  async dealerHitCard() {
    try {
      const hand = await axios.get(`/routes/blackjack/hit/${this.state.deckId}&dealer`)
      this.setState({
        dealerHand: hand.data.dealer
      });
      console.log('thissstate', this.state)
    }
    catch (err) {
      console.log('err in dealerHitCard', err)
    }
  }


  render() {
    const {dealerHand, userHand} = this.state
    return (
      <div>blackjack div
        <div>cards</div>
        <button onClick={this.initialDeal}>deal</button>
        <button onClick={this.userHitCard}>user hit card</button>
        <button onClick={this.dealerHitCard}> dealer hit card</button>
        <BlackjackDealer dealerHand={dealerHand} />
        <BlackjackUser userHand={userHand} />
      </div>
    )
  }
}

export default Blackjack;