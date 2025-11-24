import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appStyles } from '@app/theme/app-theme';
import WatchlistCards from '../components/watchlist-cards';

const WatchlistScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[appStyles.container, { paddingTop: insets.top + 10 }]}>
      <WatchlistCards />
    </View>
  );
};

export default WatchlistScreen;
