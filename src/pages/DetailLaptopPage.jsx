import LaptopCardDetail from "../components/LaptopCardDetail";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import ChangeModal from "../components/ChangeModal";
import "../css/laptopDetailStyle.css"

export default function DetailLaptopPage() {

    const { laptop, fetchLaptopById, selectedLaptops, isAlready, handleSelectAndReplace, showChange } = useGlobalContext();

    // Ottengo l'id del laptop dalla URL
    const { id } = useParams();

    // Effettua il fetch del laptop quando il componente viene montato
    useEffect(() => {
        (async () => {
            try {
                await fetchLaptopById(id);
            } catch (error) {
                console.error("Error fetching laptop details:", error);
            }
        })()
    }, [id])

    const isAlreadyToCompare = isAlready(laptop, selectedLaptops);

    // Uso useMemo per evitare ricalcoli inutili dato che ogni volta che il laptop cambia, viene ricalcolato il bottone
    const addButton = useMemo(() => (
        <button
            onClick={() => handleSelectAndReplace(id, laptop)}
            className={`${isAlreadyToCompare ? 'red-button' : 'blue-button'}`}
        >
            {isAlreadyToCompare ? 'Deseleziona' : 'Confronta con altri laptop'}
        </button>)
        // il bottone viene ricalcolato solo se cambia l'id del laptop, il laptop stesso, lo stato di isAlreadyToCompare o la funzione handleSelectAndReplace
        , [id, laptop, isAlreadyToCompare, handleSelectAndReplace]);

    return (
        <div className="container-detail">
            {/* Stampo i laptop in pagina */}
            {laptop &&
                <LaptopCardDetail
                    // classe css che sistema diversamente il contenitore dei dettagli tecnici 
                    containerDetails='container-details'
                    laptop={laptop}
                    // Passo il bottone per aggiungere il laptop alla lista di confronto
                    addButton={addButton}
                />}

            {/* Mostro la modale di cambio se showChange è true */}
            {showChange && <ChangeModal />}
        </div>
    );
}