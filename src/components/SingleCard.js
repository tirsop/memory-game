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
        <div className="front">
          <img src={card.src} alt="card front" />
          <p className="">{card.country}</p>
        </div>
        <img src="/img/cover.png"
          className="back"
          alt="card back"
          onClick={handleClick} />
      </div>
    </div>
  )
}
