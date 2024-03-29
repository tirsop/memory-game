import { useEffect, useState, useCallback } from 'react'
import random from './utils/random.js'
// styles
import './App.css'
// components
import SingleCard from './components/SingleCard'
import ButtonLevel from './components/ButtonLevel.jsx'
import Footer from './components/Footer.jsx'
// data
import { countries, capitals } from './data.js'


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false) // to prevent the user to make lots of clicks
  const [level, setLevel] = useState('easy') // 6 pairs of cards is EASY level. 8 pair of cards is HARD level.



  // func that randomly picks 6 countryCards, find their capitalCards, shuffle them and puts an id on each
  const shuffleCards = useCallback((difficulty) => {
    let num
    difficulty === 'easy' ? num = 6 : num = 8
    const countryCards = random(countries, num)
    const capitalCards = countryCards.map(country => (
      capitals.find(capital => (
        capital.country === country.country
      ))
    ))
    const shuffledCards = [...countryCards, ...capitalCards]
      .sort(() => Math.random() - 0.5)

    // add an id (1~) that matches the numbers on the mapamundi image's title
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
    shuffleCards(level)
  }, [shuffleCards, level])


  return (
    <>
      <div className="App">
        <h1 className='web-title' >Countries & Capitals</h1>

        <ButtonLevel onClick={() => shuffleCards(level)} id='new-game-btn'>New Game</ButtonLevel>
        {/* style={{ width: '200px' }} */}


        <div className="level">
          <ButtonLevel onClick={() => setLevel('easy')} id={level === 'easy' ? 'lv-selected' : ''}>Easy</ButtonLevel>
          <ButtonLevel onClick={() => setLevel('hard')} id={level === 'hard' ? 'lv-selected' : ''}>Hard</ButtonLevel>
        </div>

        <p className='turns'>Turns: {turns}</p>
        <div className="card-grid">
          {cards.map(card =>
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
              level={level}
            />
          )}
        </div>

        <Footer />
      </div>
    </>
  )
}

export default App
