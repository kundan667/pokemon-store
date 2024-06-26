import Image from 'next/image'
import React from 'react'
import pokemonTextImage from '../../../public/images/pokemon_text.png'
import constants from '@/constants';
import PokemonSelection from '../client/PokemonSelection';

const Header = ({ search = true }) => {
    return (
        <div className='fixed top-0 right-0 left-0 py-4 px-4 sm:px-10 bg-primary shadow-md z-[999] flex items-center justify-center sm:justify-between' style={{ height: constants.HEADER_HEIGHT }}>
            <div className='hidden sm:flex items-center content-center gap-2'>
                <Image src={pokemonTextImage} width={120} alt="logo" />
            </div>
            {
                search && (
                    <PokemonSelection />
                )
            }
        </div>
    )
}
export default Header
