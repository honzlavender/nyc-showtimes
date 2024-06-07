import {FC} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {width} from '../utils/utils';
import {Showtime} from '../hooks/types';

interface ExpandedItemProps {
  theaterName?: string;
  movieTitle?: string;
  // isMovieScreen: boolean;
  showtimeInfo: Showtime[];
  //   index: number;
  //   totalTheaters: number;
}

export const ExpandedItem: FC<ExpandedItemProps> = ({
  theaterName,
  movieTitle,
  showtimeInfo,
}) => {
  const header = theaterName;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>{header}</Text>
        <FlatList
          snapToInterval={width}
          snapToAlignment="center"
          data={showtimeInfo}
          renderItem={({item}) => <Text>{item.showtimeTime}{item.isOpenCaption && ' - open caption' }</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width,
    marginVertical: 24,
  },
  content: {
    // flex: 0.4,
    width: '80%',
    borderWidth: 2,
    backgroundColor: '#ffffff50'
  },
});
