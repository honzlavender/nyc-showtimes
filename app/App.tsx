import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import Home from './src/screens/Home';
import {ThemeProvider} from './theme/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaView style={{flex: 1}}>
        <Home />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
