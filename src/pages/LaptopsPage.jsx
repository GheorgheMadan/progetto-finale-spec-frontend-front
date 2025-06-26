import LaptopsList from "../components/LaptopsList";
import { useGlobalContext } from "../contexts/GlobalContext";
import ChangeModal from "../components/ChangeModal";

export default function LaptopsPage() {

    // Importo le funzioni necessarie per gestire i preferiti
    const { handleSelectAndReplace, showChange } = useGlobalContext();
    return (
        <>
            <div>
                <div className="container-filter">
                    <h1>Laptops Page</h1>
                </div>
                <LaptopsList
                    onSelectFromHomePage={handleSelectAndReplace}
                />
            </div>
            {/* Mostro la modale di cambio se showChange è true */}
            {showChange && <ChangeModal />}
        </>
    );
}