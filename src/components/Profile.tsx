import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';

export interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  return (
    <div>
      {character ? (
        <>
          <img src={character.image} alt={character.name} />
          <h2>{character.name}</h2>
          <p>Species: {character.species}</p>
          <p>Status: {character.status}</p>
          <Link to="/">Back</Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
