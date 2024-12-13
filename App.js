import {AlbumsProvider} from './src/context/AlbumContext';
import {ArtistProvider} from './src/context/ArtistContext';
import {ProfileProvider} from './src/context/ProfileContext';
import Routes from './src/navigation/Routes';

const App = () => {
  return (
    <ProfileProvider>
      <ArtistProvider>
        <AlbumsProvider>
          <Routes />
        </AlbumsProvider>
      </ArtistProvider>
    </ProfileProvider>
  );
};

export default App;
