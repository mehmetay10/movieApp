// Bu component AI desteği ile geliştirildi (ChatGPT)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#ffe5e5',
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  text: {
    color: '#d32f2f',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ErrorMessage; 