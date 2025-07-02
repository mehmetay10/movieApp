// src/screens/Loader.js (veya src/components/Loader.js)
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assests/icon.png')} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cbbfe6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
});

export default Loader;