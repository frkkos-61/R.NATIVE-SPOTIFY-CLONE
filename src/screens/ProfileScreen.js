import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ProfileContext} from '../context/ProfileContext';
import round from 'lodash/round';

const ProfileScreen = () => {
  const {profilData, loading, error} = useContext(ProfileContext);

  const {name, image_url, followers_count, public_playlists} = profilData;

  const formatFollowers = count => {
    if (count >= 10000000) {
      return `${round(count / 10000000, 1)}M`;
    }
    if (count >= 1000) {
      return `${round(count / 1000, 1)}K`;
    }
    return count.toString();
  };

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView style={{marginTop: 30}}>
        <View style={{padding: 15}}>
          <View style={styles.profileContainer}>
            <Image source={{uri: image_url}} style={styles.profilImage} />
            <View>
              <Text style={styles.profileName}> {name} </Text>
              <Text style={styles.profilFollowers}>
                {' '}
                {formatFollowers(followers_count)}{' '}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Your Playlist</Text>
        <View style={styles.playlistContainer}>
          {public_playlists?.map(playlist => (
            <View
              key={playlist.uri}
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <Image
                source={{
                  uri: `https://picsum.photos/200/300?random=${Math.random()}`,
                }}
                style={styles.playlistImage}
              />
              <View>
                <Text style={styles.playlistName}> {playlist.name} </Text>
                <Text style={styles.playlistFollowers}>
                  {formatFollowers(playlist.followers_count)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {flexDirection: 'row', alignItems: 'center', gap: 10},
  profilImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  profileName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profilFollowers: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  playlistContainer: {
    padding: 15,
  },
  playlistImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  playlistName: {
    color: 'white',
  },
  playlistFollowers: {
    color: 'white',
    marginTop: 5,
  },
});
