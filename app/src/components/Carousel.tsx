import {FC} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Movie, TheaterDetails} from '../hooks/types';
import {ExpandedItem} from './ExpandedItem';

interface CarouselProps {
  theaterInfo: TheaterDetails[];
  movieData?: Movie[];
  // isMovieScreen: boolean;
}

const Carousel: FC<CarouselProps> = ({theaterInfo}) => {
  return (
    <View>
      <FlatList
        data={theaterInfo}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.container}>
            <ExpandedItem
              showtimeInfo={item.showtimes}
              theaterName={item.theaterName}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
