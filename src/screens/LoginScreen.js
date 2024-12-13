import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <SafeAreaView>
        <View style={{height: 85}} />
        <Entypo
          name="spotify"
          color="white"
          size={80}
          style={{textAlign: 'center'}}
        />
        <Text style={styles.loginTitle}>
          Millions Of Songs Free on Spotify !
        </Text>

        <View style={{height: 80}} />

        <Pressable
          style={styles.loginButton}
          onPress={() => navigation.navigate('Main')}>
          <Text style={styles.Textt}>Sign In with Spotify 🖤</Text>
        </Pressable>

        <Pressable style={styles.Btn}>
          <MaterialIcons name="phone-android" color="white" size={24} />
          <Text style={styles.Tekst}>Continue with phone number </Text>
        </Pressable>

        <Pressable style={styles.Btn}>
          <AntDesign name="google" color="white" size={24} />
          <Text style={styles.Tekst}>Continue with Google</Text>
        </Pressable>

        <Pressable style={styles.Btn}>
          <Entypo name="facebook" color="white" size={24} />
          <Text style={styles.Tekst}>Continue with Facebook</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginTitle: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  Textt: {
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'green',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 30,
  },
  Btn: {
    backgroundColor: '#131624',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    borderColor: '#C0C0C0',
    width: 300,
    borderWidth: 0.8,
    marginVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  Tekst: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
});
