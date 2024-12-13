import axios from 'axios';
import {createContext, useContext, useEffect, useState} from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
  const [profilData, setProfilData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfilData = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/user_profile/',
      params: {
        id: 'nocopyrightsounds',
        playlistLimit: '10',
        artistLimit: '10',
      },
      headers: {
        'x-rapidapi-key': '12197d4bfemshb8a873fa34e160cp15f039jsneb219346b264',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setProfilData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfilData();
  }, []);

  return (
    <ProfileContext.Provider value={{profilData, loading, error}}>
      {children}
    </ProfileContext.Provider>
  );
};
