'use client'
import React, { useEffect, useState } from 'react'
import constants from '@/constants';
import useFetch from '@/hooks/useFetch';
import { isEmpty } from '@/utils/commonUtils';
import Image from 'next/image';
import loader from '../../../public/images/loader.png'
import pokemonTextImg from '../../../public/images/pokemon_text.png'
import PokemonFeatures from '../server/PokemonFeatures';
import { useRouter } from 'next/navigation';

const PokemonDetails = ({ id }) => {
    const router = useRouter();
    const [pokemonDetails, setPokemonDetails] = useState();
    const [errorMsz, setErrorMsz] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const imgUrl = `${constants.POKEMON_IMG_URL}/${id}.svg`;

    function handleError(img) {
        img.target.src = './images/pokeball.png';
        img.alt = "Image failed to load";
    }

    // handles fetching of pokemon based on id
    const fetchPokemonDetails = async () => {
        const { data, error } = await useFetch(`${constants.POKEMON_API_BASE_URL}/pokemon/${id}`);
        if (error) {
            setErrorMsz('No pokemon found')
            setIsLoading(false);
            return
        }
        setPokemonDetails(data)
        setIsLoading(false);
    }
    useEffect(() => {
        if (!isEmpty(pokemonDetails)) return
        fetchPokemonDetails();
    }, []);

    return (
        <div>
            {
                isLoading ? (
                    <div className='flex items-center justify-center py-4'>
                        <Image src={loader} width={30} className='animate-rotate' alt="loader" />
                    </div>
                ) : (
                    isEmpty(errorMsz) ? (
                        <div className='w-[90%] sm:w-[80%] mx-auto mb-[2rem]'>
                            <div className="breadcrumbs text-sm">
                                <ul>
                                    <li><a onClick={() => router.push('/')}>Home</a></li>
                                    <li><a onClick={() => router.push(`/${id}`)}>Pokemon</a></li>
                                </ul>
                            </div>
                            <div className='block sm:flex sm:mt-[4rem]'>
                                <div className='flex flex-col items-center content-center w-full sm:w-[40%] sm:min-h-[350px] relative p-[3rem] rounded-tl-lg rounded-tr-lg sm:rounded-tr-none sm:rounded-bl-lg border'>
                                    <div className='overflow-hidden absolute inset-0 rounded-tl-lg rounded-tr-lg sm:rounded-tr-none sm:rounded-bl-lg z-1'
                                        style={{ clipPath: 'polygon(0 0, 115% 0, 0 115%)' }}
                                    >
                                        <div className='absolute inset-0 bg-no-repeat bg-center blur-[50px] z-0 top-[50%] left-[50%]'
                                            style={{
                                                backgroundImage: `url(${imgUrl})`,
                                                transform: 'translate(-50%, -50%) scale(2)'
                                            }}>
                                        </div>
                                    </div>

                                    <Image src={pokemonTextImg} className='relative z-1 w-[50%] mb-4' alt="loader" />
                                    <img src={imgUrl} alt="pokemon"
                                        style={{ filter: 'drop-shadow(10px 10px 6px #272727ab)' }}
                                        className='relative z-1 transform hover:scale-[1.1] duration-300'
                                        onError={(e) => handleError(e)}
                                    />

                                </div>
                                <div className='w-full sm:w-[60%] px-[1rem] sm:px-[3rem] py-[1rem] bg-[#eee] rounded-bl-lg sm:rounded-bl-none sm:rounded-tr-lg rounded-br-lg flex items-center'>
                                    <div>
                                        <div className='font-oswald font-thin text-2xl pl-2'><i>{`#00${id}`}</i></div>
                                        <div className='capitalize font-oswald font-bold text-5xl'><i>{pokemonDetails.name}</i></div>
                                        <table cellspacing="4" cellpadding="4">
                                            <tr className='font-poppins  pr-2 text-sm'>
                                                <td class="font-semibold text-left align-top">Types:</td>
                                                <td class="first"><PokemonFeatures data={pokemonDetails} mainKey={'types'} subKey={'type'} /></td>
                                            </tr>
                                            <tr className='font-poppins  pr-2 text-sm'>
                                                <td class="font-semibold text-left align-top">Abilities:</td>
                                                <td class="first"><PokemonFeatures data={pokemonDetails} mainKey={'abilities'} subKey={'ability'} clip={4} /></td>
                                            </tr>
                                            <tr className='font-poppins  pr-2 text-sm'>
                                                <td class="font-semibold text-left align-top">Moves:</td>
                                                <td class="first"><PokemonFeatures data={pokemonDetails} mainKey={'moves'} subKey={'move'} clip={5} /></td>
                                            </tr>
                                            <tr className='font-poppins  pr-2 text-sm'>
                                                <td class="font-semibold text-left align-top">Stats:</td>
                                                <td class="first"><PokemonFeatures data={pokemonDetails} mainKey={'stats'} subKey={'stat'} /></td>
                                            </tr>
                                            <tr className='font-poppins  pr-2 text-sm'>
                                                <td class="font-semibold text-left align-top">Weight:</td>
                                                <td class="first"><span>{pokemonDetails.weight}</span></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>{errorMsz}</div>
                    )
                )
            }

        </div>
    )
}

export default PokemonDetails;
