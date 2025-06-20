import SearchBar from "./header-components/SearchBar"
import '../css/headerStyle.css'
import { MdFavorite } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
export default function Header() {

    const { favLaptops, selectedLaptops } = useGlobalContext()

    return (
        <header>
            <div className="container-header">
                <div>
                    <h1>
                        <Link to='/'>LapMatch</Link>
                    </h1>
                </div>
                <nav>
                    <NavLink to='/'>Home</NavLink>
                </nav>

                <div className="container-nav">
                    {selectedLaptops.length > 0 &&
                        <button className={selectedLaptops.length > 0 && "pulsing"}>
                            <Link to="compare-laptops">
                                Vedi confronto tra laptop ({selectedLaptops.length})
                            </Link>
                        </button>}
                    <SearchBar />
                    <div className="container-fav-icon">
                        <Link to='favourites'>
                            <MdFavorite className="fav-icon" />
                            {favLaptops.length === 0 ? null :
                                <span className="number-fav">{favLaptops.length}</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}