import { useCallback } from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
// import background from './canvas.js'

const countries = [
  { "src": "/img/afghanistan.png", country: "afghanistan", capital: "kabul", poplulation: "38.9million", matched: false },
  { "src": "/img/albania.png", country: "albania", capital: "tirana", poplulation: "38.9million", matched: false },
  { "src": "/img/algeria.png", country: "algeria", capital: "algiers", poplulation: "38.9million", matched: false },
  { "src": "/img/armenia.png", country: "armenia", capital: "yerevan", poplulation: "38.9million", matched: false },
  { "src": "/img/australia.png", country: "australia", capital: "canberra", poplulation: "38.9million", matched: false },
  { "src": "/img/austria.png", country: "austria", capital: "vienna", poplulation: "38.9million", matched: false },
  { "src": "/img/azerbaijan.png", country: "azerbaijan", capital: "baku", poplulation: "38.9million", matched: false },
]

const capitals = [
  { "src": "/img/afghanistan.png", country: "afghanistan", capital: "kabul", poplulation: "38.9million", matched: false },
  { "src": "/img/albania.png", country: "albania", capital: "tirana", poplulation: "38.9million", matched: false },
  { "src": "/img/algeria.png", country: "algeria", capital: "algiers", poplulation: "38.9million", matched: false },
  { "src": "/img/armenia.png", country: "armenia", capital: "yerevan", poplulation: "38.9million", matched: false },
  { "src": "/img/australia.png", country: "australia", capital: "canberra", poplulation: "38.9million", matched: false },
  { "src": "/img/austria.png", country: "austria", capital: "Vienna", poplulation: "38.9million", matched: false },
  { "src": "/img/azerbaijan.png", country: "azerbaijan", capital: "baku", poplulation: "38.9million", matched: false },
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false) // to prevent the user to make lots of clicks

  // function that return X random elements of an array
  const random = (array, elements) => {
    const arrayCopy = array.map(element => element)   // so original array doesn't change with splice
    const result = []
    for (let i = 0; i < elements; i++) {
      const element = Math.floor(Math.random() * arrayCopy.length)
      result.push(arrayCopy[element])
      arrayCopy.splice(element, 1)
    }
    return result
  }

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

  // useEffect(() => {
  // const script = document.createElement('script')
  // script.src = "./canvas.js"
  // script.async = true
  // document.body.appendChild(script)
  // return () => {
  //   document.body.removeChild(script)
  // }
  //   background()
  // }, [])

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