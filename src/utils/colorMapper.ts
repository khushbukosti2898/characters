export const getSpeciesColor = (species: string): string => {
  const speciesBackgroundColors: { [key: string]: string } = {
    human: '#f5f5dc',
    droid: '#e0e0e0',
    wookie: '#8b4513',
    rodian: '#32cd32',
    hutt: '#8fbc8f',
    "yoda's species": '#90ee90',
    trandoshan: '#556b2f',
    'mon calamari': '#b22222',
    ewok: '#a0522d',
    sullustan: '#f0e68c',
    Unknown: '#e0e0e0',
  };

  return speciesBackgroundColors[species] || speciesBackgroundColors['Unknown'];
};
