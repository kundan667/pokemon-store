'use client'
import { createContext, useState } from "react";

const PokemonContext = createContext();
export const PokemonContextProvider = ({ children }) => {
    const [searchText, setSearchText] = useState(undefined);
    const [pokemonType, setPokemonType] = useState('');

    const values = {
        searchText,
        setSearchText,
        pokemonType,
        setPokemonType
    }
    return (
        <PokemonContext.Provider value={values}>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonContext;
