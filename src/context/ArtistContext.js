import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

const ArtistContext = createContext();

const ArtistProvider = ({children}) => {
  const [artists, setArtist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getArtist = async () => {
    //*Axios.get demek yerine böyle de yazabiliriz.
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {
        q: 'Türkiye de popüler olanlar',
        type: 'artists',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5',
      },
      headers: {
        'x-rapidapi-key': '12197d4bfemshb8a873fa34e160cp15f039jsneb219346b264',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data.artists.items;
      setArtist(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <ArtistContext.Provider value={{artists, loading, error}}>
      {children}
    </ArtistContext.Provider>
  );
};

export {ArtistContext, ArtistProvider};
