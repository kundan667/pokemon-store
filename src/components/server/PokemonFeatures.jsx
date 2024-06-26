const PokemonFeatures = ({ data, mainKey, subKey, clip = 0 }) => {
    let finalData = data[mainKey];
    if (clip !== 0) {
        finalData = data[mainKey].slice(0, clip);
    }
    return (
        <div className="flex flex-wrap">
            {
                finalData.map((item, index) => (
                    <span key={`${item.name}-${index}`} className='capitalize text-sm'>
                        <span> {item[subKey].name.split("-").join(" ")} </span>
                        <span className="pr-1"> {data[mainKey].length - 1 !== index && ', '}  </span>
                    </span>
                ))
            }
        </div>
    )
}

export default PokemonFeatures
