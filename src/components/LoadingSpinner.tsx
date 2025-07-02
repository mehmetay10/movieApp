// Bu component AI desteği ile geliştirildi (ChatGPT)
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#1976d2" />
    {text && <Text style={styles.text}>{text}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#1976d2',
    fontWeight: 'bold',
  },
});

export default LoadingSpinner; 