import { useState, useEffect, useCallback } from "react";
import { Box } from "@fower/react";
import { styled } from "@fower/styled";

import usePokemon from "./custom-hooks/usePokemon";
import PokemonCard from "./Components/PokemonCard";

const Input = styled("input");

const App = (): JSX.Element => {
  const [count, setCount] = useState(1);

  const { pokemon, filter, setFilter, selected, selectPokemon } = usePokemon();

  useEffect(() => {
    console.log("Changed!");
  }, [setFilter]);

  // With the use of useCallback, the component will not change
  const onSetFilter = useCallback(e => setFilter(e.target.value), [setFilter]);

  return (
    <Box p-10 maxW-1200 m="auto">
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Input
        p-5
        text4XL
        border-1
        roundedXL
        borderGray500
        w="100%"
        value={filter}
        onChange={onSetFilter}
      />
      <Box
        grid
        gridTemplateColumns-2--md
        gridTemplateColumns-1--sm
        gap-10
        mt-10
      >
        {pokemon.map((p) => (
          <PokemonCard
            key={p.id}
            {...p}
            selected={selected.has(p.name.english)}
            onSelected={selectPokemon}
          />
        ))}
      </Box>
    </Box>
  );
};

export default App;
