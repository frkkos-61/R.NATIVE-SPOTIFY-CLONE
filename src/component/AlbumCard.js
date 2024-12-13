import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AlbumCard = ({album}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Info', {album})}
      style={styles.albumContainer}>
      <Image source={{uri: album.coverArt}} style={styles.albumImage} />
      <Text style={styles.albumName}> {album.name} </Text>
      <Text style={styles.albumArtist}> {album.artist} </Text>
    </TouchableOpacity>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  albumContainer: {
    width: 100,
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: 2,
  },
  albumImage: {
    width: 80,
    height: 80,
  },
  albumName: {
    color: 'white',
    marginTop: 3,
  },
  albumArtist: {
    color: 'gray',
    fontSize: 12,
  },
});
