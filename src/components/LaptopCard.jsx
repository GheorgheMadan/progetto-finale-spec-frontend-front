import { memo, useMemo } from "react"
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useLocation } from "react-router-dom";
// icona bilancia piena 
import { FaScaleBalanced } from "react-icons/fa6";
// icona bilancia vuota
import { LiaBalanceScaleSolid } from "react-icons/lia";


import { Link } from "react-router-dom";

export default memo(function LaptopCard({ laptop, onSelectLaptop, onSelectFromHomePage, isAlreadyFav, toggleFavorite, isAlreadyCompare }) {

    // Uso useLocation per ottenere la posizione corrente
    // e verificare se siamo nella pagina di confronto
    const location = useLocation();

    console.log(`Re-render LaptopCard`);

    return (
        <>
            <div className="laptop-card-without-detail">
                <div className="container-img">
                    <Link to={`/laptops-list/${laptop.id}`}>
                        <img src={laptop.image} alt={laptop.title} />
                    </Link>
                </div>
                <h3>
                    <Link to={`/laptops-list/${laptop.id}`}>
                        {laptop.title}
                    </Link>
                </h3>
                <span className="category-laptop">{laptop.category}</span>
                <div className="fav-container">
                    <button
                        className={`balance-icon ${isAlreadyCompare ? 'green-balance' : 'white-balance'} `}
                        onClick={() => onSelectFromHomePage(laptop.id)}>
                        {isAlreadyCompare ? <FaScaleBalanced /> : <LiaBalanceScaleSolid />}
                    </button>
                    <span onClick={() => toggleFavorite(laptop)} className="card-fav-icon" >
                        {isAlreadyFav ?
                            <MdFavorite className="fav-icon " />
                            :
                            <MdFavoriteBorder className="fav-icon" />}
                    </span>
                </div>

                <span className="price-laptop-card">{laptop.price}€</span>
                {/* verifico se ci troviamo nella pagina di confronto */}
                {location.pathname === "/compare-laptops" && (
                    <button
                        disabled={isAlreadyCompare}
                        className={`${isAlreadyCompare ? 'disabled' : 'green-button'}`}
                        onClick={() => onSelectLaptop(laptop.id)}>Scegli</button>

                )}
            </div>
        </>
    )
})