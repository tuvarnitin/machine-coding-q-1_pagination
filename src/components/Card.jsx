
const Card = ({p}) => {
  return (
      <div className="card">
          <img src={p.thumbnail} alt={p.title} width="100px" />
          <h3>{p.title}</h3>
          <p>{p.description}</p>
      </div>
  )
}

export default Card
