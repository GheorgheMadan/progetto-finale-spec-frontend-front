import { useState, useCallback, useEffect } from "react"
import { useGlobalContext } from "../../contexts/GlobalContext"
import { debounce } from "lodash"
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
    const { handleSearchFilter } = useGlobalContext()
    const [search, setSearch] = useState('')
    const [optionValue, setOptionValue] = useState('tutte')
    const [openInput, setOpenInput] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                handleSearchFilter(search, optionValue)
            } catch (err) {
                console.error(err)
            }
        })()

    }, [search, optionValue])

    const debouncedInput = useCallback(
        debounce((value) => {
            setSearch(value)
        }, 1000),
        [])

    return (
        <>
            <select onChange={e => setOptionValue(e.target.value)}>
                <option value="tutte">Tutto</option>
                <option value="Editing">Editing</option>
                <option value="Gaming">Gaming</option>
                <option value="Business">Business</option>
                <option value="Produttività">Produttività</option>
            </select>
            <div className="search-container">
                {openInput &&
                    <input
                        type="text"
                        onChange={e => debouncedInput(e.target.value)}
                        placeholder="Cerca..."
                        className={`search-input ${openInput ? 'animate-in' : 'animate-out'}`}
                    />}
                <IoSearch className="search-icon" onClick={() => setOpenInput(!openInput)} />
            </div>
        </>
    )
}