import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled, level }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div className="front" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${card.src})` }}>
          {card.isCountry && <h3 className="content">{card.country[0].toUpperCase()}{card.country.slice(1)}</h3>}
          {!card.isCountry && <h3 className="content">{card.capital[0].toUpperCase()}{card.capital.slice(1)}</h3>}
        </div>

        {level === 'easy' &&
          <img src={`/img/mapamundi/image_part_${card.id}.jpg`}
            className="back"
            alt="card back"
            onClick={handleClick} />
        }
        {level === 'hard' &&
          <img src={`/img/mapamundi_hard/image_part_${card.id}.jpg`}
            className="back"
            alt="card back"
            onClick={handleClick} />
        }

      </div>
    </div >
  )
}
