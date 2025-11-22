import React from 'react';
import { Text, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { appStyles } from '../../../app/theme/app-theme';

const WatchlistScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <View style={[appStyles.container, { paddingTop: insets.top }]}>
        <Text style={appStyles.title}>WatchlistScreen</Text>
      </View>
    </SafeAreaProvider>
  );
};

export default WatchlistScreen;
