import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import Home from './src/screens/Home';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Home />
    </SafeAreaView>
  );
};

export default App;
