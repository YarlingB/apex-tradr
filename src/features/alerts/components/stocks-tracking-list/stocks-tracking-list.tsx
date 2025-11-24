import { ScrollView, StyleSheet, View } from 'react-native';
import { spacingStyles } from '@app/theme/spacing';
import { Typography } from '@shared/components/ui';
import { useWatchlist } from '@shared/hooks/use-watchlist';

import TrackingItemCard from './tracking-item-card';

const StocksTrackingList = () => {
  const { watchlist } = useWatchlist();
  return (
    <View
      style={[
        spacingStyles.lgTopMargin,
        spacingStyles.smBottomMargin,
        styles.flex1Container,
      ]}
    >
      {watchlist.length > 0 ? (
        <View style={[spacingStyles.mdTopMargin, styles.flex1Container]}>
          <Typography variant="lg" style={spacingStyles.smVerticalMargin}>
            My Watchlist
          </Typography>
          <ScrollView
            style={styles.flex1Container}
            showsVerticalScrollIndicator={false}
          >
            {watchlist.map(stock => (
              <TrackingItemCard
                key={`stock-item-${stock.symbol}`}
                stock={stock}
                showAlertConfigAcction={true}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <Typography>
          No stocks tracking. Please add stocks to your watchlist.
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flex1Container: {
    flex: 1,
  },
});

export default StocksTrackingList;
