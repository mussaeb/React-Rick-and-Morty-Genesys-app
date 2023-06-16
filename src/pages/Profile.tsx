import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';

export {};

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  // Add other properties based on the API response
}

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    // Fetch data for the selected character from the API and update the character state
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {character ? (
        <div>
          <img src={character.image} alt={character.name} />
          <h2>{character.name}</h2>
          <p>Species: {character.species}</p>
          <p>Status: {character.status}</p>
          {/* Display other information about the character */}
        </div>
      ) : (
        <p>Loading character...</p>
      )}
      <Button component={Link} to="/" variant="outlined">
        Back
      </Button>
    </div>
  );
};

export default Profile;
