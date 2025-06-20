import { useGlobalContext } from "../contexts/GlobalContext"
import { createPortal } from "react-dom"

export default function ChangeModal() {
    const { selectedLaptops, replaceLaptop, setShowChange, setPendingLaptop, pendingLaptop, } = useGlobalContext()
    return createPortal(
        <div className="modal-container">
            <div className="modal modal-change">
                <h3>Hai già selezionato 3 laptop per il confronto. Vuoi sostituire un laptop presente ?</h3>
                {selectedLaptops.map((laptop, index) => {
                    return (
                        <div key={index} className="container-replace-buttons">
                            <button
                                onClick={() => {
                                    replaceLaptop(index, pendingLaptop)
                                    setShowChange(false)
                                    setPendingLaptop([])
                                }}
                                className="blue-button"
                            >
                                sostituisici "{laptop.title}"
                            </button>
                        </div>
                    )
                })}
                <div>
                    <button
                        className="red-button"
                        onClick={() => {
                            setShowChange(false)
                            setPendingLaptop([])
                        }}>Annulla</button>
                </div>
            </div>
        </div>, document.body
    )
}