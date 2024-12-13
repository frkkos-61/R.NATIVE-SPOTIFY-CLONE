import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../component/Loader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {ArtistContext} from '../context/ArtistContext';
import ArtistCard from '../component/ArtistCard';
import AlbumCard from '../component/AlbumCard';
import {AlbumContext} from '../context/AlbumContext';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const {artists, loading, error} = useContext(ArtistContext);
  const {
    albums,
    loading: albumsLoading,
    error: albumsError,
  } = useContext(AlbumContext);

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjes9As0KBB_ufe_alnSpFsvwJLQFkrZws7g&s',
              }}
              style={styles.headerImage}
            />
            <Text style={styles.headerText}>Message</Text>
          </View>

          <MaterialCommunityIcons
            name="lightning-bolt-outline"
            color="white"
            size={24}
          />
        </View>

        <View style={styles.tabButtons}>
          <Pressable style={styles.tabButton}>
            <Text style={styles.tabButtonText}>Music</Text>
          </Pressable>
          <Pressable style={styles.tabButton}>
            <Text style={styles.tabButtonText}>Podcast & Shows</Text>
          </Pressable>
        </View>

        {/* */}
        <View>
          <Pressable
            onPress={() => navigation.navigate('Songs')}
            style={styles.LikedSongs}>
            <LinearGradient colors={['#33006F', '#FFFFFF']}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="heart" color="white" size={24} />
              </Pressable>
            </LinearGradient>
            <Text style={styles.LikedSongsText}>Songs</Text>
          </Pressable>

          <Pressable style={styles.LikedSongs}>
            <LinearGradient colors={['#33006F', '#FFFFFF']}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Entypo name="moon" color="white" size={24} />
              </Pressable>
            </LinearGradient>
            <Text style={styles.LikedSongsText}> Rock & Roll</Text>
          </Pressable>

          <Pressable style={styles.LikedSongs}>
            <LinearGradient colors={['#33006F', '#FFFFFF']}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="star" color="white" size={24} />
              </Pressable>
            </LinearGradient>
            <Text style={styles.LikedSongsText}> Caz </Text>
          </Pressable>

          <Text style={styles.sectionTitle}>Your Top Artist</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {artists?.map((artist, index) => (
              <ArtistCard key={index} artist={artist} />
            ))}
          </ScrollView>

          <View style={styles.albumSection}>
            <Text style={styles.sectionTitle}>Popular Albums</Text>
            <ScrollView horizontal>
              {albums?.map((album, index) => (
                <AlbumCard key={index} album={album} />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerImage: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
  },
  tabButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 5,
    marginHorizontal: 12,
  },
  tabButton: {
    backgroundColor: '#282828',
    padding: 10,
    borderRadius: 30,
  },
  tabButtonText: {
    color: 'white',
    fontSize: 15,
  },
  LikedSongs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: '#202020',
  },
  LikedSongsText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  albumSection: {
    marginTop: 10,
    marginBottom: 15,
    flex: 1,
  },
  sectionTitle: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
