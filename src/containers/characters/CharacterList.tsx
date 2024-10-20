import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack } from "@mui/material";

import { SearchBar } from "../../components/SearchBar/SearchBar";
import { CharacterModal } from "../../components/Character/CharacterModal/CharacterModal";
import {
  useLazyGetPeopleQuery,
  useGetFilmsQuery,
} from "../../api/characterAPI";
import {
  charactersSelector,
  hasMoreCharactersSelector,
  resetCharacters,
} from "../../redux/slices/charactersSlice";
import { getPageNumber } from "../../utils/utils";
import { Character } from "../../interfaces/character/character";
import Loader from "../../components/Loader/Loader";
import { ErrorComponent } from "src/components/Error/ErrorComponent";
import { useDebounce } from "src/hooks/useDebounce";
import { InfiniteScroll } from "src/components/InfiniteScroll/InfiniteScroll";
import { CharacterList } from "src/components/Character/CharacterList/CharacterList";
import { SelectDropdown } from "src/components/core/SelectDropdown/SelectDropdown";

export const Characters: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilm, setSelectedFilm] = useState("");
  const [speciesMap, setSpeciesMap] = useState<{ [key: string]: string }>({});
  const [fetchedSpeciesUrls, setFetchedSpeciesUrls] = useState<Set<string>>(
    new Set()
  );
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const characters = useSelector(charactersSelector);
  const hasMoreCharacters = useSelector(hasMoreCharactersSelector);

  const [getPeople, { isLoading, isError }] = useLazyGetPeopleQuery();
  const { data: filmsData, isLoading: isFilmLoading } = useGetFilmsQuery({});

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch characters when the component mounts
  useEffect(() => {
    getPeople({ page: 1 });
  }, [getPeople]);

  // Memoize character fetching
  const fetchSpeciesData = useCallback(async () => {
    const speciesUrls = characters.flatMap((character) => character.species);
    const uniqueSpeciesUrls = [...new Set(speciesUrls)];
    const newSpeciesUrls = uniqueSpeciesUrls.filter(
      (url) => !fetchedSpeciesUrls.has(url)
    );

    if (newSpeciesUrls.length === 0) return;

    try {
      const speciesPromises = newSpeciesUrls.map((url) =>
        fetch(url).then((res) => res.json())
      );

      const speciesData = await Promise.all(speciesPromises);
      const newSpeciesMap = speciesData.reduce((map, species) => {
        map[species.url] = species.name;
        return map;
      }, {} as { [key: string]: string });

      setSpeciesMap((prev) => ({ ...prev, ...newSpeciesMap }));
      setFetchedSpeciesUrls((prev) => new Set([...prev, ...newSpeciesUrls]));
    } catch (error) {
      console.error("Failed to fetch species data", error);
    }
  }, [characters, fetchedSpeciesUrls]);

  useEffect(() => {
    if (characters.length > 0) {
      fetchSpeciesData();
    }
  }, [characters, fetchSpeciesData]);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (debouncedSearchTerm) {
        dispatch(resetCharacters());
        await getPeople({ search: debouncedSearchTerm, page: 1 });
      } else {
        await getPeople({ page: 1 });
      }
    };

    fetchCharacters();
  }, [debouncedSearchTerm, dispatch, getPeople]);

  const loadMoreData = () => {
    let payload: { page: number; search?: string } = {
      page: getPageNumber(hasMoreCharacters),
    };
    if (debouncedSearchTerm) {
      payload.search = debouncedSearchTerm;
    }
    getPeople(payload);
  };

  // Retry function for errors
  const onRetry = useCallback(() => {
    window.location.reload();
  }, []);

  // Memoize filtered characters
  const searchedAndFilteredCharacters = useMemo(
    () =>
      characters.filter((character) =>
        selectedFilm ? character.films.includes(selectedFilm) : true
      ),
    [characters, selectedFilm]
  );

  const filmOptions = filmsData
    ? filmsData.map((film) => ({ label: film.title, value: film.url }))
    : [];

  if (isError) {
    return <ErrorComponent onRetry={onRetry} />;
  }

  return (
    <Stack p={4} alignItems="center">
      <Stack gap={2} width="500px">
        <SearchBar
          searchQuery={searchTerm}
          onSearch={setSearchTerm}
          title="characters"
        />

        <SelectDropdown
          label="Film"
          value={selectedFilm}
          onChange={(e) => setSelectedFilm(e.target.value)}
          options={filmOptions}
          isLoading={isFilmLoading}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <InfiniteScroll
            hasMore={!!hasMoreCharacters}
            onLoadMore={loadMoreData}
            isLoading={isLoading}
          >
            <CharacterList
              characters={searchedAndFilteredCharacters}
              speciesMap={speciesMap}
              onSelectCharacter={setSelectedCharacter}
            />
          </InfiniteScroll>
        )}

        {selectedCharacter && (
          <CharacterModal
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </Stack>
    </Stack>
  );
};
