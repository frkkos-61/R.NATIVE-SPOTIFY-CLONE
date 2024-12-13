import {useRoute, useNavigation} from '@react-navigation/native';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const SonginfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  //*Homescreenden gönderilen veriyi useRoute ile aldık.
  const {album} = route.params || {};

  //*Gelen verileri parçalayarak aldık
  const {coverArt, name, artist, year} = album;

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.imageView}>
            <Image source={{uri: album.coverArt}} style={styles.coverImage} />
          </View>
        </View>
        <Text style={styles.albumName}>{album.name}</Text>

        <View style={styles.artistView}>
          <Text style={styles.artistText}>{album.artist}</Text>
        </View>

        <Pressable style={styles.controlView}>
          <Pressable style={styles.downloadBtn}>
            <AntDesign name="arrowdown" size={24} color="white" />
          </Pressable>
          <View style={styles.playBtnView}>
            <MaterialCommunityIcons
              name="cross-bolnisi"
              size={24}
              color="#1DB954"
            />

            <Pressable style={styles.playButton}>
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>

        <View>
          <View style={styles.infoView}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Album {album.name} </Text>
              <Text style={styles.infoText}>Artist {album.artist} </Text>
              <Text style={styles.infoText}>Year : {album.year} </Text>
            </View>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SonginfoScreen;

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20,
  },
  paddingView: {
    padding: 10,
  },
  coverImage: {
    width: 150,
    height: 150,
  },
  imageView: {
    flex: 1,
    alignItems: 'center',
  },
  albumName: {
    color: 'white',
    marginHorizontal: 12,
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  artistView: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  artistText: {
    color: '#909090',
    fontSize: 13,
    fontWeight: 'bold',
  },
  controlView: {
    paddingLeft: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  downloadBtn: {
    backgroundColor: '#1DB954',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  playBtnView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#1DB954',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  infoContainer: {
    gap: 5,
  },
  infoText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
