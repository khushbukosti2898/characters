import React, { memo } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Character } from "../../../interfaces/character/character";
import { getSpeciesColor } from "../../../utils/colorMapper";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = memo(
  ({ character, onClick }) => {
    const backgroundColor = getSpeciesColor(
      (character.species[0] || "").toLowerCase()
    );

    console.log("character 111", character);

    return (
      <Card
        onClick={onClick}
        data-testid={`character-card-${character.name.toLowerCase()}`}
        sx={{
          bgcolor: backgroundColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 0",
          borderRadius: 2,
          width: "100%",
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={`https://picsum.photos/200?random=${Math.random()}`}
          alt={character.name}
          sx={{
            width: 200,
            height: 200,
            borderRadius: 2,
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography variant="h6" align="center">
            {character.name}
          </Typography>
        </CardContent>
      </Card>
    );
  }
);
