import { useCallback } from 'react'
import { useEffect, useState } from 'react'
import random from './utils/random.js'
// import background from './canvas.js'
// styles
import './App.css'
// components
import SingleCard from './components/SingleCard'
// data
import { countries, capitals } from './data.js'


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false) // to prevent the user to make lots of clicks



  // func that randomly picks 6 countryCards, find their capitalCards, shuffle them and puts an id on each
  const shuffleCards = useCallback(() => {
    const countryCards = random(countries, 6)
    const capitalCards = countryCards.map(country => (
      capitals.find(capital => (
        capital.country === country.country
      ))
    ))
    const shuffledCards = [...countryCards, ...capitalCards]
      .sort(() => Math.random() - 0.5)

    // add an id (1~12) that matches the numbers on the mapamundi image's title
    for (let i = 0; i < shuffledCards.length; i++) {
      shuffledCards[i] = { ...shuffledCards[i], id: i + 1 }
    }
    setChoiceOne(null) // so choices are reset when pressing NewGame
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }, [])



  // user choices and is assigned to the first or second choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }



  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {     // only runs if we have the 2 choices
      setDisabled(true)
      if (choiceOne.country === choiceTwo.country) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.country === choiceOne.country) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])



  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }



  // start a new game as soos as user enters the page
  useEffect(() => {
    shuffleCards()
    // background()
  }, [shuffleCards])



  return (
    <>
      <div className="App">
        <canvas id="canvas"></canvas>
        <h1 className='web-title' >Countries & Capitals</h1>
        <button onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map(card =>
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          )}
        </div>
        <p>Turns: {turns}</p>
      </div>
    </>
  )
}

export default App