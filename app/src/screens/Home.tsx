import React, {FC, useState} from 'react';
import {StyleSheet,} from 'react-native';
import {getAllTheaters} from '../hooks/getAllTheaters';
import MovieView from './MovieView';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
interface HomeProps {
  // navigation: any;
}

const Home: FC<HomeProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isMovieScreen, setIsMovieScreen] = useState(true);
  const toggleScreen = () => {
    setIsMovieScreen(!isMovieScreen);
  };
  const {data: theaterData} = getAllTheaters();

  return <MovieView navigation={navigation} />;
};

const styles = StyleSheet.create({});

export default Home;
// <TouchableOpacity style={styles.button} onPress={toggleScreen}>
//   <Text style={styles.buttonText}>
//     {isMovieScreen ? 'movies' : 'theaters'}
//   </Text>
// </TouchableOpacity>
// {isMovieScreen ? (
//   <MovieView navigation={navigation} />
// ) : (
//   <View>
//     <Text>this will be the theater sort view</Text>
//   </View>
// )}
