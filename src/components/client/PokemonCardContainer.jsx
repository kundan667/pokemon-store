'use client'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    const nextPageData = useRef();
    const firstRender = useRef(true);
    const firstLoadSearchRef = useRef(true);
    const pokemonDataMainRef = useRef([]);

    // debounced search
    // const debouncedSearch = useCallback(debounce((q) => {
    //     fetchData(q);
    // }, 500), []);

    const handlePokemonType = async (url, key) => {
        setIsLoading(true)
        const { data } = await useFetch(url);
        setPokemonData(data.pokemon);
        pokemonDataMainRef.current = data[key];
        setIsLoading(false)
    }
    // handles search input for movies
    useEffect(() => {
        if (firstLoadSearchRef.current) {
            firstLoadSearchRef.current = false;
            return
        }
        const filteredPokemonArr = pokemonDataMainRef.current.filter(d => d.pokemon.name.includes(searchText));
        console.log("filteredPokemonArr:", filteredPokemonArr);
        setPokemonData(filteredPokemonArr);

    }, [searchText])

    useEffect(() => {
        if (firstLoadSearchRef.current) {
            firstLoadSearchRef.current = false;
            return
        }
        if (!isEmpty(pokemonType)) {
            handlePokemonType(`${constants.POKEMON_API_BASE_URL}/type/${pokemonType}`, 'pokemon');
        }
    }, [pokemonType]);

    const handleNavigate = (id) => {
        router.push(`/${id}`)
    }

    // const fetchData = async (url, reset = false) => {
    //     setIsLoading(true)
    //     const { data } = await useFetch(url);
    //     console.log(data);
    //     nextPageData.current = data.next;
    //     const resData = isEmpty(data?.results) ? data : data.results;
    //     if (reset) {
    //         setPokemonData(resData);
    //     } else {
    //         setPokemonData(prev => [...prev, ...resData]);
    //     }
    //     setIsLoading(false)
    // }

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
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        // <div className='flex flex-wrap mx-auto mt-2 sm:mt-10 justify-items-start px-2 md:px-[4rem]  '>
        // <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        <>
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
                isEmpty(pokemonData) && <div className='flex items-center justify-center py-4'>No Pokemon</div>
            }
        </>
    )
}

export default PokemonCardContainer
