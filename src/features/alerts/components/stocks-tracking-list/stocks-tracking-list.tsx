import { ScrollView, View } from 'react-native';
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
        { flex: 1 },
      ]}
    >
      {watchlist.length > 0 ? (
        <View style={[spacingStyles.mdTopMargin, { flex: 1 }]}>
          <Typography variant="lg" style={spacingStyles.smVerticalMargin}>
            My Watchlist
          </Typography>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {watchlist.map(stock => (
              <TrackingItemCard key={stock.symbol} stock={stock} />
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

export default StocksTrackingList;
