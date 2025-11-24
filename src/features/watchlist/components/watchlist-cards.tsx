import { ScrollView, View } from 'react-native';
import { Typography } from '@shared/components/ui';
import { useWatchlist } from '@shared/hooks/use-watchlist';
import { useWatchlistInRealTime } from '@shared/hooks/use-watchlist-real-time';
import { spacingStyles } from '@app/theme/spacing';
import { WatchlistItem } from './watchlist-item';

const WatchlistCards = () => {
  const { watchlist } = useWatchlist();
  const { stockData } = useWatchlistInRealTime();

  if (watchlist.length === 0) {
    return (
      <View style={spacingStyles.mdVerticalMargin}>
        <Typography variant="md">
          No stocks in watchlist. Add stocks to start tracking.
        </Typography>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={spacingStyles.mdVerticalMargin}
    >
      {watchlist.map(stock => (
        <WatchlistItem
          stock={stock}
          symbolData={stockData[stock.symbol] || []}
        />
      ))}
    </ScrollView>
  );
};

export default WatchlistCards;
