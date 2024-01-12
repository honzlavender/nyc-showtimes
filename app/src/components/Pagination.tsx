import {FC} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';

const {width} = Dimensions.get('screen');

interface PaginationProps {
  data: any;
  scrollX: any;
  index: number;
}

const Pagination: FC<PaginationProps> = ({data, scrollX}) => {
  return (
    <View style={styles.container}>
      {data.map((_: any, idx: number) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 40, 12],
          //   outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });

        // const opacity = scrollX.interpolate({
        //   inputRange,
        //   outputRange: [0.2, 1, 0.1],
        //   extrapolate: 'clamp',
        // });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#ccc', '#000', '#ccc'],
          extrapolate: 'clamp',
        });
        return (
          <View style={styles.dotBackground}>
            <Animated.View
              key={idx.toString()}
              style={[styles.dot, {width: dotWidth, backgroundColor}]}
            />
          </View>
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 35,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 3,
        backgroundColor: '#ccc',
      },
//   container: {
//     position: 'absolute',
//     flexDirection: 'row',
//     width: 66,
//     alignItems: 'center',
//     backgroundColor: '#ccc',
//     justifyContent: 'center',
//   },
  dotBackground: {
    // backgroundColor: '#ccc',
    // borderTopEndRadius: 12,
  },
//   dot: {
//     width: 12,
//     height: 22,
//     borderTopEndRadius: 12,
//     borderRightColor: '#000',
//     borderTopColor: '#000',
//     borderWidth: 1,
//     borderLeftColor: '#ccc',
//     // marginHorizontal: -1,
//   },
  dotActive: {
    backgroundColor: '#000',
  },
});
