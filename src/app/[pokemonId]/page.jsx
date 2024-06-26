import Header from '@/components/server/Header'
import PokemonDetails from '@/components/client/PokemonDetails'
import constants from '@/constants'
import { PokemonContextProvider } from '@/context/pokemonContext'
import React from 'react'

const page = ({ params }) => {
    const pokemonId = params.pokemonId;
    return (
        <PokemonContextProvider>
            <div className="pt-4 px-2 sm:px-10" style={{ marginTop: constants.HEADER_HEIGHT }}>
                <Header search={false} />
                <PokemonDetails id={pokemonId} />
            </div>
        </PokemonContextProvider>
    )
}

export default page
