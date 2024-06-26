import constants from '@/constants'
import { isEmpty } from '@/utils/commonUtils';
import React from 'react'

const PokemonCard = ({ data, navigate }) => {
    const splitUrl = 'https://pokeapi.co/api/v2/pokemon/';
    const id = isEmpty(data?.pokemon?.url) ? data.url.split(splitUrl)[1].split('/')[0] : data.pokemon.url.split(splitUrl)[1].split('/')[0];
    const imgUrl = `${constants.POKEMON_IMG_URL}/${id}.svg`;
    function handleError(img) {
        img.target.src = './images/pokeball.png';
        img.alt = "Image failed to load";
    }

    return (
        <div className="relative shadow-lg cursor-pointer max-w-[40%] sm:max-w-[220px] p-[1rem] rounded-lg aspect-[9/10] bg-gray-100 mt-[55px] bg-center inline-block">
            <div className='overflow-hidden absolute inset-0 rounded-lg'>
                <div className='absolute inset-0 bg-no-repeat bg-center blur-[50px] z-0 top-[50%] left-[50%]'
                    style={{
                        backgroundImage: `url(${imgUrl})`,
                        transform: 'translate(-50%, -50%) scale(2)'
                    }}>
                </div>
            </div>

            <div className='relative z-1'>
                <figure className='w-full h-full'>
                    <img src={imgUrl}
                        alt="pokemon"
                        className='w-[200px] rounded-lg aspect-[9/10] object-contain mt-[-80px]'
                        onError={(e) => handleError(e)}
                        loading="lazy"
                    />
                </figure>
                <div className='font-poppins text-gray-700 capitalize font-bold mb-3 mt-2'>{isEmpty(data?.pokemon) ? data.name : data.pokemon.name}</div>
                <button className='btn btn-sm bg-primary border-0 text-gray-700' onClick={() => navigate(id)}>Details</button>

            </div>
        </div>
    )
}

export default PokemonCard
