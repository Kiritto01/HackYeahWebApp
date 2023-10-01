import "./Card.css"

const Card = (props) => {
    const [pointA, setPointA] = useState({ lat: null, lng: null, address: "" });
    const replaceSpacesAndCommas = (input) => {
        return input.replace(/ /g, '+').replace(/,/g, '%2C');
      };
    return (
        <div className="card">
            <div className="card-left">
                <main>
                    <header>{props.course}</header>
                    <section className="card-info">
                        <strong>Nazwa uczelni: </strong>{props.name}<br/>
                        <strong>Typ kierunku: </strong>{props.type}<br/>
                        <strong>Wydział: </strong>{props.faculty}<br/>
                        <strong>Adres: </strong>{props.address}<br/>
                    </section>
                </main>
                <section className="card-buttons">
                    <a href={props.moreLink} className="card-link">Więcej informacji</a>
                    <a href={props.timeLink} className="card-link">Sprawdź dojazd</a>
                </section>
            </div>
            <div className="card-right">
                <div className="card-logo">
                    <img src={props.logoUrl} alt="logo"/>
                </div>
                <section className="card-price">
                    <h1>{props.price} zł</h1>
                    miesięcznie
                </section>
            </div>
        </div>
    );
}

export default Card;