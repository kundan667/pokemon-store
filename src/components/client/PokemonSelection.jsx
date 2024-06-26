'use client'
import PokemonContext from '@/context/pokemonContext';
import useFetch from '@/hooks/useFetch';
import { isEmpty } from '@/utils/commonUtils';
import React, { useContext, useEffect, useRef, useState } from 'react';

// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';

const PokemonSelection = () => {
    const { setSearchText, searchText, setPokemonType, pokemonType } = useContext(PokemonContext);
    const [pokemonTypesArr, setPokemonTypesArr] = useState([]);
    const firstRender = useRef(true);

    const fetchPokemonTypes = async (url) => {
        const { data } = await useFetch(url);
        setPokemonTypesArr(data.results);
        setPokemonType(getIdFromUrl(data?.results[0]?.url)); // set default type
    }

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return
        }
        if (isEmpty(pokemonTypesArr)) {
            fetchPokemonTypes('https://pokeapi.co/api/v2/type?offset=0&limit=22')
        }
    }, []);

    const handlePokemonType = (e) => {
        // setSearchText('')
        setPokemonType(e.target.value);
    }

    function getIdFromUrl(url) {
        if (isEmpty(url)) return ''
        return url.split('https://pokeapi.co/api/v2/type/')[1].split('/')[0];
    }

    return (

        <div className='flex gap-2'>
            <select className="select select-bordered w-full max-w-xs capitalize"
                onChange={handlePokemonType}
                value={pokemonType}
            >
                {
                    pokemonTypesArr.map(item => (
                        <option key={item.name} value={getIdFromUrl(item.url)}>{item.name}</option>
                    ))
                }
            </select>
            <input type="text" placeholder="Search Pokemon" className="input input-bordered w-full max-w-xs"
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
            />
        </div>
    )
}

export default PokemonSelection
