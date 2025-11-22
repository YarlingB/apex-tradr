import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#121212',
  primary: '#007AFF',
};

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
});

export const bottomTabStyles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: COLORS.background,
  },
});
