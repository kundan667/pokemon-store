import PokemonCardContainer from "@/components/client/PokemonCardContainer";
import Header from "@/components/server/Header";
import PokemonCard from "@/components/server/PokemonCard";
import constants from "@/constants";
import Image from "next/image";
import pokemonBg from '../../public/images/pokemon_bg_1.jpg'
import { PokemonContextProvider } from "@/context/pokemonContext";
import PokemonSelection from "@/components/client/PokemonSelection";

export default function Home() {
  return (
    <main className="pt-4 px-2 sm:px-10" style={{ marginTop: constants.HEADER_HEIGHT }}>
      <PokemonContextProvider>
        <Header />
        {/* <Image src={pokemonBg}/> */}
        {/* <PokemonSelection /> */}
        <PokemonCardContainer />
      </PokemonContextProvider>
    </main>
  );
}
