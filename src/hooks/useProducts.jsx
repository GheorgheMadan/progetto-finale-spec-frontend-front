import { useEffect, useState, useCallback } from 'react';
const api = import.meta.env.VITE_API_URL

export default function useProducts() {

    // stato per la lista dei laptop
    const [laptops, setLaptops] = useState()

    // stato per il singolo laptop
    const [laptop, setLaptop] = useState()

    // stato per la lista dei laptop preferiti
    const [favLaptops, setFavLaptops] = useState(() => {
        // recupero la lista dei laptop preferiti dal localStorage
        const favLaptops = localStorage.getItem('favLaptops')
        // se la lista esiste e non è vuota, la converto in un array di oggetti
        return favLaptops ? JSON.parse(favLaptops) : []
    })
    // stato per la lista dei laptop selezionati per il confronto
    const [selectedLaptops, setSelectedLaptops] = useState(() => {
        // recupero la lista dei laptop preferiti dal localStorage
        const compareLaptops = sessionStorage.getItem('selectedLaptops')
        // se la lista esiste e non è vuota, la converto in un array di oggetti
        return compareLaptops ? JSON.parse(compareLaptops) : []
    })

    // stato per il laptop in attesa di essere aggiunto alla lista di confronto
    const [pendingLaptop, setPendingLaptop] = useState();

    // stato per mostrare il modal di sostituzione del laptop nella lista di confronto
    const [showChange, setShowChange] = useState(false);

    useEffect(() => {
        localStorage.setItem('favLaptops', JSON.stringify(favLaptops))
    }, [favLaptops])

    useEffect(() => {
        sessionStorage.setItem('selectedLaptops', JSON.stringify(selectedLaptops))
    }, [selectedLaptops])

    // Funzione per la chiamata API per ottenere tutti i laptop
    const fetchLaptops = async () => {
        try {
            const response = await fetch(`${api}/laptops`)
            if (!response.ok) {
                throw new Error('Errore durante il fetch dei dati: ' + response.statusText)
            }
            const data = await response.json()
            setLaptops(data)
        } catch (error) {
            console.error('Fetch error:', error)
        }
    }

    // funzione per la gestione della chiamata api per il filtro e ricerca
    const handleSearchFilter = async (searchQuery, optionValue) => {
        try {
            // imposto l'url di default
            let url = `${api}/laptops?search=${searchQuery}`

            // se ci sono due input da parte del utente è l'opzione della categoria è diversa da tutte 
            if (optionValue && optionValue !== 'tutte') {
                // al url di default aggiungo la parte del filtro per categoria 
                url += `&category=${optionValue}`
            }
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error('Errore durante il fetch dei dati: ' + res.statusText)
            }
            const data = await res.json()
            // aggiorno lo stato dei laptop con i dati ottenuti
            setLaptops(data)

        } catch (err) {
            console.error(err);
        }
    }

    // Funzione per il fetch del singolo laptop
    const fetchLaptopById = useCallback(async (id) => {
        try {
            const response = await fetch(`${api}/laptops/${id}`)
            if (!response.ok) {
                throw new Error('Errore durante il fetch del laptop: ' + response.statusText)
            }
            const data = await response.json()
            setLaptop(data.laptop)
            return data.laptop;
        } catch (error) {
            console.error('Fetch error:', error)
        }
    }, [])

    // Funzione globale per verifica se un laptop si trova gia un una determinata lista
    // accetta un laptop e una lista di laptop e ritorna true se il laptop è già presente nella lista
    const isAlready = useCallback((laptop, laptopsList) => {
        if (!laptop || !laptopsList) return false;
        return laptopsList.some(l => l.id === laptop.id)
    }, [])

    // Funzione che aggiunge o rimuove un laptop da una lista, accetta un laptop, una lista di laptop e una funzione di setState
    const addToList = useCallback((laptop, laptopsList, setLaptopsList) => {
        const isExist = laptopsList.some(l => l.id === laptop.id)
        setLaptopsList(prev => isExist ? prev.filter(l => l.id !== laptop.id) : [...prev, laptop])
    }, [])

    // funzione che rimuove un laptop da una lista, accetta un laptop, una lista di laptop e una funzione di setState
    const removeFromList = useCallback((laptop, setLaptopsList) => {
        setLaptopsList(prev => prev.filter(l => l.id !== laptop.id))
    }, [])

    // Funzione per sostituire un laptop nella lista di confronto
    // con il pendingLaptop quando l'utente seleziona un laptop da sostituire
    const replaceLaptop = useCallback((indexToReplace, pendingLaptop) => {
        // Sostituisci il laptop in posizione 'index' con il pendingLaptop
        setSelectedLaptops(currentLaptops => {
            return currentLaptops.map((laptop, index) =>
                index === indexToReplace ? pendingLaptop : laptop
            );
        });
    }, [setSelectedLaptops]);

    // Funzione che gestisce l'aggiunta di un prodotto alla lista di confronto 
    const handleSelectAndReplace = useCallback(async (id, laptop) => {
        // assegno alla variabile laptopData il laptop passato come parametro o il laptop ottenuto dal fetch
        const laptopData = laptop || await fetchLaptopById(id)

        // se il laptopData è gia presente nella lista dei laptop selezionati per il confronto
        const alreadySelected = selectedLaptops.some(l => l.id === laptopData.id)

        // se il laptop è già presente nella lista dei laptop selezionati per il confronto, lo rimuovo
        if (alreadySelected) {
            removeFromList(laptopData, setSelectedLaptops)
            return
        }
        // se la lista dei laptop selezionati per il confronto ha già 3 elementi
        // imposto il laptop in attesa di essere aggiunto alla lista di confronto
        // e mostro il modal di sostituzione
        if (selectedLaptops.length >= 3) {
            setPendingLaptop(laptopData);
            setShowChange(true);
            return
        }

        // altrimenti aggiungo il laptop alla lista dei laptop selezionati per il confronto
        addToList(laptopData, selectedLaptops, setSelectedLaptops)
    }, [selectedLaptops, fetchLaptopById, setSelectedLaptops, setPendingLaptop, setShowChange]);

    return {
        // lista dei laptop
        laptops,
        // funzione di aggiornamento della lista dei laptop
        setLaptops,
        // funzione per il fetch dei laptop
        fetchLaptops,
        // funzione per il filtro e ricerca dei laptop
        handleSearchFilter,
        // funzione per il fetch del singolo laptop
        fetchLaptopById,
        // stato del singolo laptop
        laptop,
        // funzione per la verifica se un laptop è nei preferiti
        isAlready,
        // funzione per aggiungere o rimuovere un laptop dai preferiti
        addToList,
        // lista dei laptop preferiti
        favLaptops,
        // funzione per aggiornare la lista dei laptop preferiti
        setFavLaptops,
        // lista dei laptop selezionati per il confronto
        selectedLaptops,
        // funzione per aggiornare la lista dei laptop selezionati per il confronto
        setSelectedLaptops,
        // funzione per rimuovere un laptop da una lista
        removeFromList,
        // funzione per sostituire un laptop nella lista di confronto
        replaceLaptop,
        // laptop in attesa di essere aggiunto alla lista di confronto
        pendingLaptop,
        // funzione per aggiornare il laptop in attesa di essere aggiunto alla lista di confronto
        setPendingLaptop,
        // funzione per gestire la selezione e sostituzione di un laptop nella lista di confronto
        handleSelectAndReplace,
        // stato per mostrare il modal di sostituzione
        showChange,
        // funzione per aggiornare lo stato del modal di sostituzione
        setShowChange
    }
}