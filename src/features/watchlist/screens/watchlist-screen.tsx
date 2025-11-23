import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appStyles } from '@app/theme/app-theme';

const WatchlistScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={[appStyles.container, { paddingTop: insets.top + 10 }]}>
        <Text style={appStyles.title}>WatchlistScreen</Text>
      </View>
    </>
  );
};

export default WatchlistScreen;
