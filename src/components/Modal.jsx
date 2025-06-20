import { createPortal } from "react-dom";

export default function Modal({
    show,
    content,
    confirmButton,
    closeButton,
    searchBar,
    onCloseButton,
    classNameLyoutAlert
}) {
    return createPortal(
        <>
            {show &&
                <div className="modal-container">
                    <div className={`${classNameLyoutAlert} modal`}>
                        {/* Buttone di annulla per la modale di cambio */}
                        {closeButton}
                        {/* Barra di ricerca per la modale di cambio */}
                        {searchBar}
                        <div>
                            {content}
                        </div>
                        <div>
                            {confirmButton}
                            {onCloseButton}
                        </div>
                    </div>
                </div>}
        </>, document.body
    )
}