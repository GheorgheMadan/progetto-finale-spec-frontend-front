import { createContext, useContext } from "react";

export const GlobalContext = createContext()

import useProducts from "../hooks/useProducts";

export default function GlobalProvider({ children }) {

    const laptopsData = useProducts(); // contiene già tutte le variabili e funzioni


    return (
        < GlobalContext.Provider value={laptopsData} >
            {children}
        </GlobalContext.Provider >
    )
}

export function useGlobalContext() {
    const context = useContext(GlobalContext)
    if (context === undefined) throw new Error('Il global context non contiene dati')
    return context
}