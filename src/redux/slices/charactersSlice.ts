import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../../interfaces/character/character';
import { RootState } from '../store';

interface CharactersState {
  data: Character[];
  hasMore: string;
}

const initialState: CharactersState = {
  data: [],
  hasMore: '',
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, { payload }) => ({
      data: [...state.data, ...payload.results],
      hasMore: payload.next,
    }),
    resetCharacters: state => {
      state.data = [];
      state.hasMore = '';
    },
  },
});

export const { setCharacters, resetCharacters } = charactersSlice.actions;

export default charactersSlice.reducer;

// Selectors
export const charactersSelector = (state: RootState) => state.characters.data;
export const hasMoreCharactersSelector = (state: RootState) =>
  state.characters.hasMore;
