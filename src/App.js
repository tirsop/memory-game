import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const countries = [
  { "src": "/img/afghanistan.png", country: "afghanistan", capital: "kabul", matched: false },
  { "src": "/img/albania.png", country: "albania", capital: "tirana", matched: false },
  { "src": "/img/algeria.png", country: "algeria", capital: "algiers", matched: false },
  { "src": "/img/armenia.png", country: "armenia", capital: "yerevan", matched: false },
  { "src": "/img/australia.png", country: "australia", capital: "canberra", matched: false },
  { "src": "/img/austria.png", country: "austria", capital: "vienna", matched: false },
  { "src": "/img/azerbaijan.png", country: "azrbaijan", capital: "baku", matched: false },
]

const capitals = [
  { "src": "/img/afghanistan.png", country: "afghanistan", capital: "kabul", matched: false },
  { "src": "/img/albania.png", country: "albania", capital: "tirana", matched: false },
  { "src": "/img/algeria.png", country: "algeria", capital: "algiers", matched: false },
  { "src": "/img/armenia.png", country: "armenia", capital: "yerevan", matched: false },
  { "src": "/img/australia.png", country: "australia", capital: "canberra", matched: false },
  { "src": "/img/austria.png", country: "austria", capital: "Vienna", matched: false },
  { "src": "/img/azerbaijan.png", country: "azrbaijan", capital: "baku", matched: false },
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false) // to prevent the user to make lots of clicks

  // function that return X random elements of an array
  const random = (array, elements) => {
    const result = []
    for (let i = 0; i < elements; i++) {
      const element = Math.floor(Math.random() * array.length)
      result.push(array[element])
      array.splice(element, 1)
    }
    return result
  }


  // func that duplicates the images (so there are pairs), shuffle them and puts an id on each
  const shuffleCards = () => {
    const countryCards = random(countries, 6)
    const capitalCards = countryCards.map(country => (
      capitals.find(capital => (
        capital.country === country.country
      ))
    ))
    const shuffledCards = [...countryCards, ...capitalCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null) // so choices are reset when pressing NewGame
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // user choices and is assigned to the first or second choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {     // only execute code when we have the 2 choices
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

  // start a new game as soos as Ienter the page
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Memory</h1>
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
  )
}

export default App