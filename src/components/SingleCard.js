import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div className="front" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${card.src})` }}>
          {/* <img src={card.src} alt="card front" /> */}
          <h3 className="">{card.country[0].toUpperCase()}{card.country.slice(1)}</h3>
          {/* <p className="population">Poplulation: {card.poplulation}</p> */}
        </div>
        <img src="/img/bahamas.png"
          className="back"
          alt="card back"
          onClick={handleClick} />
      </div>
    </div >
  )
}
