import React, { useEffect, useState, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Character } from '../../../interfaces/character/character';
import { useLazyGetHomeworldQuery } from '../../../api/characterAPI';
import { getIdFromUrl } from '../../../utils/utils';
import Loader from '../../Loader/Loader';

interface HomeworldDetailsProps {
  homeworld: Homeworld;
}

const HomeworldDetails: React.FC<HomeworldDetailsProps> = ({ homeworld }) => (
  <>
    <Typography variant="h6" mt={2}>
      Homeworld: {homeworld.name}
    </Typography>
    <Typography variant="body2">
      <strong>Terrain:</strong> {homeworld.terrain}
    </Typography>
    <Typography variant="body2">
      <strong>Climate:</strong> {homeworld.climate}
    </Typography>
    <Typography variant="body2">
      <strong>Population:</strong> {homeworld.population}
    </Typography>
  </>
);

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

interface Homeworld {
  name: string;
  terrain: string;
  climate: string;
  population: string;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
}) => {
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null);
  const [getHomeworld, { isLoading }] = useLazyGetHomeworldQuery();
  console.log('character', character);

  // Fetch homeworld details
  useEffect(() => {
    if (character?.homeworld) {
      const homeworldId = getIdFromUrl(character.homeworld);
      getHomeworld({ id: homeworldId })
        .unwrap()
        .then(setHomeworld)
        .catch(error => console.error('Failed to fetch homeworld:', error));
    }
  }, [character?.homeworld, getHomeworld]);

  // Memoized formatted date for better performance
  const formattedDate = useMemo(() => {
    return character?.created
      ? new Intl.DateTimeFormat('en-GB').format(new Date(character.created))
      : '';
  }, [character?.created]);

  return (
    <Dialog
      open={!!character}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="character-dialog-title"
      aria-describedby="character-dialog-description"
    >
      <DialogTitle
        id="character-dialog-title"
        data-testid="modal-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {character?.name}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box tabIndex={0} aria-label="Character details">
          <Typography id="character-dialog-description" variant="body1">
            <strong>Height:</strong>{' '}
            {(parseInt(character?.height || '0') / 100).toFixed(2)} meters
          </Typography>
          <Typography variant="body1">
            <strong>Mass:</strong> {character?.mass} kg
          </Typography>
          <Typography variant="body1">
            <strong>Birth Year:</strong> {character?.birth_year}
          </Typography>
          <Typography variant="body1">
            <strong>Date Added:</strong> {formattedDate}
          </Typography>
          <Typography variant="body1">
            <strong>Films:</strong> {character?.films.length}
          </Typography>

          {isLoading ? (
            <Loader />
          ) : (
            homeworld && <HomeworldDetails homeworld={homeworld} />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          aria-label="Close character details"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
