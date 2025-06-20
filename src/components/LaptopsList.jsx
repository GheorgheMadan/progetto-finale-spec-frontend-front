import { useEffect, useState, useMemo, memo, useCallback } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
// import della card dei laptop
import LaptopCard from "./LaptopCard";

// import del css
import "../css/mainStyle.css"


export default memo(function LaptopsList({ newContainer, onSelectLaptop, onSelectFromHomePage }) {

    // Importo il contesto globale
    const { laptops, fetchLaptops, addToList, isAlready, favLaptops, setFavLaptops, selectedLaptops } = useGlobalContext();

    // Effettua il fetch dei laptop al caricamento del componente
    useEffect(() => {
        (async () => {
            try {
                await fetchLaptops();
            } catch (error) {
                console.error('Errore durante il fetch dei laptop:', error);
            }
        })()
    }, [])

    // Stato per l'ordinamento
    const [orderBy, setOrderBy] = useState('title')
    // Stato per la direzione dell'ordinamento
    const [direction, setDirection] = useState("1")

    // Uso useMemo per memorizzare la lista dei laptop ordinata
    // in base ai criteri di ordinamento selezionati
    const sortedLaptops = useMemo(() => {
        if (!laptops) return [];
        return [...laptops].sort((a, b) => {
            let comparison
            if (orderBy === "title") {
                comparison = a.title.localeCompare(b.title)
            }
            if (orderBy === "category") {
                comparison = a.category.localeCompare(b.category)
            }
            return comparison * Number(direction)
        })
    }, [orderBy, direction, laptops])

    const handleToggleFavorite = useCallback((laptop) => addToList(laptop, favLaptops, setFavLaptops), [addToList, favLaptops, setFavLaptops]);

    return (
        <>
            <div className="container-filter">
                <span> Ordina per:</span>
                <select value={orderBy} onChange={e => setOrderBy(e.target.value)}>
                    <option value="title">Titolo</option>
                    <option value="category">Categoria</option>
                </select>
                <select value={direction} onChange={e => setDirection(e.target.value)}>
                    <option value="1">A - Z</option>
                    <option value="-1">Z - A</option>
                </select>
            </div>
            <div className={`container-list ${newContainer}`} >
                {/* Se laptops è null */}
                {!laptops && <p>Errore del server!</p>}
                {/* Se laptops è un array vuoto */}
                {laptops && laptops.length === 0 && <p>Nessun laptop trovato!</p>}
                {/* Mappo i laptop ordinati */}
                {sortedLaptops?.map(laptop => {
                    const isAlreadyFav = isAlready(laptop, favLaptops)
                    const isAlreadyCompare = isAlready(laptop, selectedLaptops)
                    return (
                        <LaptopCard
                            key={laptop.id}
                            laptop={laptop}
                            onSelectLaptop={onSelectLaptop}
                            onSelectFromHomePage={onSelectFromHomePage}
                            isAlreadyFav={isAlreadyFav}
                            isAlreadyCompare={isAlreadyCompare}
                            toggleFavorite={handleToggleFavorite}
                        />)
                })
                }
            </div>
        </>
    )
})