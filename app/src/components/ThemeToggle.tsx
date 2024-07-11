import React, {FC, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {width} from '../utils/utils';
import {ThemeContext} from '../../theme/theme';

interface ThemeToggleProps {}

export const ThemeToggle: FC<ThemeToggleProps> = () => {
  const {toggleTheme} = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={toggleTheme}>
      <View style={styles.container}>
        <Text style={styles.text}>Theme Toggle</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    width: width / 3,
    justifyContent: 'center',
    height: 54,
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
  },
});
