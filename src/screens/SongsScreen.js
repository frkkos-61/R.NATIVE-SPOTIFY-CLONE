import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import TrackPlayer from 'react-native-track-player';
import Modal from 'react-native-modal';

const SongsScreen = () => {
  const [searchText, setSearchText] = useState('Türkiye de popüler müzikler');
  const [searchedTracks, setSearchTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async () => {
    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: 'teoman',
        locale: 'tr-TR',
        offset: '0',
        limit: '5',
      },
      headers: {
        'x-rapidapi-key': '5f49bd1d6cmsh04cbb3f05f68355p1bf458jsnc34ed8ffdd41',
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setSearchTracks(response?.data?.tracks?.hits);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const setupPlayer = async () => {
    try {
      /*
      Trackplayer kütüphanesinin oynatıcıyı kurmasını sağlar.bu işlemde oynatıcıyı
      başlatmak için gerekli olan yapılandırmayı yaptık.
      
       */
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
      });
    } catch (error) {
      console.log('Error setting up player:', error);
    }
  };

  const handlePlay = async track => {
    const trackData = {
      id: track?.track?.key,
      url: track?.track?.hub?.actions?.find(action => action.type === 'uri')
        ?.uri,
      title: track?.track?.title,
      artist: track?.track?.subtitle,
      artwork: track?.track?.images?.coverart,
    };

    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData);
      await TrackPlayer.play();
      setSelectedTrack(track.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = seconds => {
    // toplam saniyeyi dakiyaya çevir
    const mins = Math.floor(seconds / 60);
    //toplam saniye sayısından geriye kalan saniyeyi hesapla
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ' '}${secs}`;
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      //müzik oynatılıyorsa durdur
      await TrackPlayer.pause();
    } else {
      //müzik duruyorsa oynat
      await TrackPlayer.play();
    }
    //isplaying değerini oynatma ve durdurma butonuna basıldığında tam tersi değerine çevir
    setIsPlaying(!isPlaying);
  };

  // müziği 10 sn geri aldk
  const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  };

  // müziği 10 sn ileri aldık
  const seekForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  };

  useEffect(() => {
    handleSearch();
    setupPlayer();
  }, []);

  return (
    <LinearGradient colors={['#614385', '#516395']} style={{flex: 1}}>
      <View style={{flex: 1, marginTop: 40}}>
        {/* Arama Çubuğu */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Pressable style={{marginHorizontal: 10}}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                height: 40,
                backgroundColor: '#422775',
                maxWidth: '95%',
                borderRadius: 8,
                paddingHorizontal: 8,
              }}>
              <Ionicons name="search" size={24} color="white" />
              <TextInput
                placeholder="Find in Search Songs"
                placeholderTextColor={'white'}
                style={{
                  fontWeight: '500',
                  width: '85%',
                  color: 'white',
                }}
                onChangeText={setSearchText}
              />
            </Pressable>
          </Pressable>
        </View>

        {/* Şarkı Listesi */}
        {loading ? (
          <ActivityIndicator size={'large'} color={'white'} />
        ) : (
          <FlatList
            nestedScrollEnabled={true}
            data={searchedTracks}
            keyExtractor={item => item?.track?.key}
            renderItem={({item}) => (
              <Pressable>
                <View style={styles.trackContainer}>
                  <Image
                    source={{uri: item?.track?.images?.coverart}}
                    style={styles.albumCover}
                  />
                  <View style={styles.trackInfo}>
                    <Text style={styles.trackName}>{item?.track?.title}</Text>
                    <Text style={styles.artistName}>
                      {item?.track?.subtitle}
                    </Text>
                  </View>

                  <Entypo name="controller-play" size={24} color="white" />
                </View>
              </Pressable>
            )}
            contentContainerStyle={{paddingBottom: 20}}
          />
        )}
      </View>
    </LinearGradient>
  );
};

export default SongsScreen;

const styles = StyleSheet.create({
  trackContainer: {
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#ccc',
  },
  albumCover: {
    width: 70,
    height: 70,
    borderRadius: 30,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 7,
  },
  trackName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 14,
    color: '#EEEEEE',
  },
});
