import React, { Component } from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { allCards } from '../game-data/card-data';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

function Field() {
  
  useFirestoreConnect([{ collection: "deck" }]);
  const deck = useSelector((state) => state.firestore.ordered.deck);
  //sort through deck
  //shuffle 5 random cards (make functions)
  //remainder of deck should be draw pile
  //add logic to play a card (up to action limit)
  //click handler on card to set selectedcard target
  //click handler on enemy to set selectedEnemy target and then resolve
  //end turn button - resolve some end turn effects - 
  //enemy turn setTimeout - 2 s - animation library: anime.js, resolve their attacks/debuffs, etc
  
  
  return (
    <div>
      
    </div>
  )
  
}


export default Field;
