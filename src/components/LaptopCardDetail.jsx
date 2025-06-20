import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { memo } from "react";

export default memo(function LaptopCardDetail({
    laptop, addButton, openModalButton, containerDetails }) {

    // Importo le funzioni necessarie per gestire i preferiti
    const { addToList, isAlready, favLaptops, setFavLaptops, setSelectedLaptops, removeFromList } = useGlobalContext();

    // Controllo se il laptop è già presente nella lista dei preferiti
    // Utilizzo la funzione isAlready per verificare se il laptop è già nei preferiti
    const isAlreadyFav = isAlready(laptop, favLaptops);

    // da location riesco a ricavare il path della pagina
    const location = useLocation();

    return (
        <>
            <div>
                {/* Immagine del laptop */}
                <img src={laptop.image} alt={laptop.title} style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div className="title-container">
                {/* Titolo */}
                <h2>
                    <Link to={`/laptops-list/${laptop.id}`}>{laptop.title}</Link>
                </h2>
                {/* Marca */}
                <span>Marca: {laptop.brand}</span>

                {/* icona dei preferiti che rimuove o aggiunge un laptop ai preferiti */}
                <div>
                    <span
                        onClick={() => addToList(laptop, favLaptops, setFavLaptops)}
                        className="container-fav-icons" >
                        {isAlreadyFav ?
                            <span>
                                Rimuovi dai preferiti
                                <MdFavorite className="fav-icon detail-fav-icon" />
                            </span> :
                            <span>
                                Aggiungi ai preferiti
                                <MdFavoriteBorder className="fav-icon detail-fav-icon" />
                            </span>}
                    </span>
                </div>
                {/* Prezzo */}
                <p>{laptop.price.toFixed(2)}€</p>

                {/* Bottone per l'aggiunta di un laptop alla lista di confronto passato da DetailLaptopPage.jsx*/}
                {addButton}
                {/* Bottone per cambiare un laptop nella lista di confronto passato da ComparePage.jsx */}
                {openModalButton}

                {/* Button che aparira solo quando questo componente verrà montato nella pagina ComparePage */}
                {location.pathname === '/compare-laptops' &&
                    <button
                        className="red-button"
                        onClick={() => removeFromList(laptop, setSelectedLaptops)}>Elimina</button>}
            </div>

            {/* CONTENITORE DEI DETTAGLI TECNICI */}
            <div className={containerDetails}>
                <h4>Dettagli Tecnici</h4>
                <ul>
                    <li><strong>Processore (CPU):</strong> {laptop.cpu}</li>
                    <li><strong>Grafica Integrata:</strong> {laptop.gpuIntegrated}</li>
                    <li><strong>GPU:</strong> {laptop.gpuDedicated ? laptop.gpuDedicated : "Assente"}</li>
                    <li><strong>RAM:</strong> {laptop.ramGB} GB</li>
                    <li><strong>Storage:</strong> {laptop.storageSizeGB} GB {laptop.storageType}</li>
                    <li><strong>Dimensioni Schermo:</strong> {laptop.screenSizeInch} pollici</li>
                    <li><strong>Risoluzione Schermo:</strong> {laptop.screenResolution}</li>
                    <li><strong>Refresh Rate Schermo:</strong> {laptop.screenRefreshRateHz} Hz</li>
                    <li><strong>Sistema Operativo (OS):</strong> {laptop.os}</li>
                    <li><strong>Peso:</strong> {laptop.weightKg} Kg</li>
                    <li><strong>Anno di Rilascio:</strong> {laptop.releaseYear}</li>
                </ul>
            </div>
        </>
    )
})