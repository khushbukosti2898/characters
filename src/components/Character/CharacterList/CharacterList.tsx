import React from 'react';
import { Stack } from '@mui/material';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { NoDataFound } from '../../NoDataFound/NoDataFound';
import ErrorBoundary from '../../Error/ErrorBoundary';
import { Character } from '../../../interfaces/character/character';

interface CharacterListProps {
  characters: Character[];
  speciesMap: { [key: string]: string };
  onSelectCharacter: (character: Character) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  speciesMap,
  onSelectCharacter,
}) => {
  if (characters.length === 0) {
    return <NoDataFound info="No characters found" />;
  }

  return (
    <Stack gap={2} alignItems="center">
      {characters.map(character => {
        const speciesNames = character.species.map(url => speciesMap[url]);
        return (
          <ErrorBoundary key={character.name}>
            <CharacterCard
              character={{ ...character, species: speciesNames }}
              onClick={() => onSelectCharacter(character)}
            />
          </ErrorBoundary>
        );
      })}
    </Stack>
  );
};
