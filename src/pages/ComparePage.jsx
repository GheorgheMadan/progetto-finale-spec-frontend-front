import { useGlobalContext } from "../contexts/GlobalContext"
import LaptopCardDetail from "../components/LaptopCardDetail"
import "../css/compareStyle.css"
import Modal from "../components/Modal"
import LaptopsList from "../components/LaptopsList"
import SearchBar from "../components/header-components/SearchBar"
import { useCallback, useState } from "react"
import { IoClose } from "react-icons/io5";
export default function ComparePage() {

    const { selectedLaptops, replaceLaptop, fetchLaptopById, setSelectedLaptops } = useGlobalContext()

    // Stato per gestire la visibilità della modale
    const [showList, setShowList] = useState(false);

    // Stato per gestire la visibilità dell'alert 
    const [showAlert, setShowAlert] = useState(false);

    // stato per la gestione degli indici dei laptop selezionati dato che la funzione replaceLaptop richiede un indice
    const [indexToReplace, setIndexToReplace] = useState(null);

    // Stato per gestire la visibilità del terzo slot
    const [showSlot, setShowSlot] = useState(false)

    // Stato per gestire la visibilità dell'alert di avviso 
    const [showAlert2, setShowAlert2] = useState(false)

    // Funzione per gestire la selezione e la sostituzione del laptop
    const handleSelectAndReplace = useCallback(async (id) => {
        try {
            const isAlreadySelected = selectedLaptops.some(l => l.id === id)

            // Effettua il fetch del laptop da sostituire
            const laptop = await fetchLaptopById(id);

            if (isAlreadySelected) {
                setShowAlert(true)
                return console.error("Laptop already selected for comparison.");
            }

            // se non ce un indice da sostituire, significa che si sta aggiungendo un nuovo laptop
            if (indexToReplace === null) {
                // Controlla se il numero di laptop selezionati è inferiore a 3 o se non ce ne sono
                if (selectedLaptops.length < 3 || selectedLaptops.length === 0) {
                    setSelectedLaptops(prev => [...prev, laptop]);
                    // Chiude la modale
                    setShowList(false);
                    return;
                }
                // altrimenti mostro la modale di cambio laptop
            } else {
                // Sostituisce il laptop selezionato con quello ottenuto dal fetch
                replaceLaptop(indexToReplace, laptop);
                // Chiude la modale e resetta l'indice
                setShowList(false);
                // Resetta l'indice per la sostituzione
                setIndexToReplace(null);

            }
        } catch (err) {
            console.error("Error fetching laptop for replacement:", err);
        }
    }, [fetchLaptopById, indexToReplace, setIndexToReplace, replaceLaptop, selectedLaptops, setSelectedLaptops]);

    return (
        <>
            {/* Se non ce nessun elemento nella pagina di confronto mostro il messaggio */}
            {selectedLaptops.length === 0 &&
                <p className="alert-msg">Non hai ancora selezionato nessun laptop. Inizia scegliendone uno qui sotto!</p>}

            {/* Contenitore della navigaizone */}
            <div className="container-header-buttons">

                {/* Button che azzera il comparatore */}
                {selectedLaptops.length > 0 &&
                    <button
                        className="red-button"
                        onClick={() => setShowAlert2(true)}>
                        Azzera tutto
                    </button>}

                {/* button che mostra il terzo slot */}
                {selectedLaptops.length === 2 &&
                    <button
                        className={`${showSlot ? 'red-button' : 'green-button'}`}
                        onClick={() => setShowSlot(!showSlot)}>
                        {`${showSlot ? "Rimuovi slot" : "Aggiungi il terzo laptop"}`}
                    </button>}
            </div>

            {/* Con le classi addatto il layout in base a quanti elementi ci sono */}
            <div className={` ${selectedLaptops.length === 3 || showSlot ? 'compare-page-full' : 'compare-page'}`}>

                {/* Mappo i laptop selezionati per il confronto */}
                {selectedLaptops.map((laptop, index) => (
                    // Laptop Card dettagliata 
                    <div
                        key={laptop.id}
                        className="laptop-card-compare">
                        <LaptopCardDetail

                            laptop={laptop}
                            openModalButton={
                                <button
                                    className="blue-button"
                                    onClick={() => {
                                        setShowList(true)
                                        setIndexToReplace(index)
                                    }}>
                                    Cambia
                                </button>}
                        />
                    </div>
                ))}

                {/* se viene cliccato il button di aggiunta e i laptop selezionati sono meo di 3 mostro il 3 slot */}
                {showSlot && selectedLaptops.length < 3 &&
                    <div className="empty-card" onClick={() => {
                        setShowList(true);
                    }}>
                        <h3>Aggiungi un altro laptop</h3>
                    </div>}

                {/* Se non ce nessun laptop mostro il primo slot vuoto */}
                {selectedLaptops.length === 0 &&
                    <div className="empty-card" onClick={() => {
                        setShowList(true);
                    }}>
                        <h3>Aggiungi un altro laptop</h3>
                    </div>}

                {/* Mostro il secondo slot vuoto */}
                {selectedLaptops.length === 0 &&
                    <div className="empty-card" onClick={() => {
                        setShowList(true);
                    }}>
                        <h3>Aggiungi un altro laptop</h3>
                    </div>}

                {/* Se ce solo un elemento mostro solo uno slot vuoto */}
                {selectedLaptops.length === 1 &&
                    <div className="empty-card" onClick={() => {
                        setShowList(true);
                    }}>
                        <h3>Aggiungi un altro laptop</h3>
                    </div>}
            </div>

            {/* Modale che mostra la search bar di ricerca e la lista dei laptop */}
            <Modal
                show={showList}
                // search bar
                searchBar={
                    <div className="search-bar-modal">
                        <SearchBar />
                    </div>
                }
                // lista dei laptops
                content={<LaptopsList
                    // Passo la funzione per gestire la selezione e sostituzione del laptop
                    onSelectLaptop={handleSelectAndReplace}
                    newContainer='new-container' />}

                // pulsante di chiusura modale personalizzato
                closeButton={
                    <div className="modal-button-close">
                        <span>
                            <IoClose className="close-icon" onClick={() => setShowList(false)} />
                        </span>
                    </div>}
            />

            {/* Modale di avviso di esistenza del laptop nella selectedLaptops */}
            <Modal
                show={showAlert}
                content={<h3>Laptop già presente. Scegli un altro laptop!</h3>}
                // button di chiusura personalizzato
                onCloseButton={
                    <button
                        className="red-button"
                        onClick={() => setShowAlert(false)}>
                        Ok
                    </button>}
                classNameLyoutAlert="modal-alert"
            />
            <Modal
                show={showAlert2}
                content={<h3>Sei sicuro di voler cancellare tutto ?</h3>}
                confirmButton={
                    <button
                        className="green-button"
                        onClick={() => {
                            setSelectedLaptops([])
                            // nascondo il terzo slot
                            setShowSlot(false)
                            setShowAlert2(false)
                        }}>
                        Si
                    </button>}
                onCloseButton={<button
                    className="red-button"
                    onClick={() => setShowAlert2(false)}>Annulla</button>}
                classNameLyoutAlert="modal-alert"
            />
        </>
    )
}