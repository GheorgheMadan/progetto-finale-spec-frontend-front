import { useGlobalContext } from "../contexts/GlobalContext";
import LaptopCard from "../components/LaptopCard";
import { useCallback } from "react";

export default function FavPage() {

    // Recupera la lista dei laptop preferiti dal contesto globale
    const { favLaptops, addToList, setFavLaptops, isAlready } = useGlobalContext();

    // ottimizzo la funzione handleAddToList con useCallback per evitare re-render inutili
    // e per evitare di creare una nuova funzione ad ogni render
    const handleAddToList = useCallback((laptop) => {
        addToList(laptop, favLaptops, setFavLaptops);
    }, [addToList, favLaptops, setFavLaptops]);

    return (
        <div>
            <div className="container-filter">
                <h1>Lista dei preferiti</h1>
            </div>
            {favLaptops.length === 0 &&
                <h1 className="msg-err">No favorite laptops added yet.</h1>}
            <div className="container-list">
                {/* Passo le props alla laptopCard */}
                {favLaptops.map(laptop => {
                    const isAlreadyFav = isAlready(laptop, favLaptops)
                    return (
                        <LaptopCard
                            key={laptop.id} laptop={laptop}
                            toggleFavorite={handleAddToList}
                            isAlreadyFav={isAlreadyFav}

                        />)
                })
                }
            </div>
        </div>
    );
}