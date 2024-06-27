'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import PokemonCard from '../server/PokemonCard';
import { debounce, isEmpty } from '@/utils/commonUtils';
import loader from '../../../public/images/loader.png'
import Image from 'next/image';
import PokemonContext from '@/context/pokemonContext';
import constants from '@/constants';
import { useRouter } from 'next/navigation';

const PokemonCardContainer = () => {
    const router = useRouter();
    const { searchText, pokemonType } = useContext(PokemonContext);
    const [pokemonData, setPokemonData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const pokemonDataMainRef = useRef([]);

    // handles fetching of pokemon types
    const handlePokemonType = async (url, key) => {
        setIsLoading(true)
        const { data } = await useFetch(url);
        setPokemonData(data.pokemon);
        pokemonDataMainRef.current = data[key];
        setIsLoading(false)
    }

    // handles search input for pokemon
    useEffect(() => {
        const filteredPokemonArr = pokemonDataMainRef.current.filter(d => d.pokemon.name.includes(searchText));
        setPokemonData(filteredPokemonArr);
    }, [searchText])

    // handles pokemon types changes
    useEffect(() => {
        if (!isEmpty(pokemonType)) {
            handlePokemonType(`${constants.POKEMON_API_BASE_URL}/type/${pokemonType}`, 'pokemon');
        }
    }, [pokemonType]);

    const handleNavigate = (id) => {
        router.push(`/${id}`)
    }

    // handles infinite page scroll for pagination
    useEffect(() => {
        const handleScroll = () => {
            let parentEl = document.getElementById("pokemon-container");
            let boundedRect = parentEl.getBoundingClientRect();
            if (Math.round(Math.abs(boundedRect.top)) + window.innerHeight >= parentEl.scrollHeight - 50) {
                // console.log("pokemonType:", pokemonType);
                if (isEmpty(pokemonType) || pokemonType == 'all') {
                    // setIsLoading(true);
                    // debouncedSearch(nextPageData.current);
                }
            }
        };
        // window.addEventListener("scroll", handleScroll);
        return () => {
            // window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (<>
        {isLoading && <div className='flex items-center justify-center py-4'>
            <Image src={loader} width={30} className='animate-rotate' alt="loader" />
        </div>
        }
        <div className='flex flex-wrap gap-6 justify-center pb-10' id="pokemon-container">
            {
                pokemonData.map((item, index) => (
                    <PokemonCard key={`${item.name}-${index}`} data={item} navigate={handleNavigate} />
                ))
            }
        </div>

        {
            isEmpty(pokemonData) && !isLoading && <div className='flex items-center justify-center py-4'>No Pokemon</div>
        }
    </>
    )
}

export default PokemonCardContainer
