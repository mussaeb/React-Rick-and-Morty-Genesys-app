import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

export interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCharacters();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search Characters"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Species</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCharacters.map((character) => (
            <TableRow key={character.id}>
              <TableCell>
                <img src={character.image} alt={character.name} />
              </TableCell>
              <TableCell>
                <Link to={`/profile/${character.id}`}>{character.name}</Link>
              </TableCell>
              <TableCell>{character.species}</TableCell>
              <TableCell>{character.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;
