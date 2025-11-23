import { View } from 'react-native';
import { Typography } from '@shared/components/ui/typography';
import { CustomTouchableOpacity } from '@shared/components/ui/button';
import { IStockSymbol } from '@shared/data-types/interfaces/stock-symbols';
import { useWatchlist } from '@shared/hooks/use-watchlist';
import useThrottle from '@shared/hooks/use-throtle';
import { spacingStyles } from '@app/theme/spacing';

export const RenderStockItem = ({ item }: { item: IStockSymbol }) => {
  const { watchlist, actions } = useWatchlist();
  const stockInWatchlist = watchlist.find(
    stock => stock.symbol === item.symbol,
  );
  const handleSelect = () => {
    console.log('Clicked on stock item');
    if (stockInWatchlist) {
      actions.removeFromWatchlist(stockInWatchlist);
    } else {
      actions.addToWatchlist(item);
    }
  };

  return (
    <CustomTouchableOpacity
      onPress={useThrottle({ callback: handleSelect, delay: 500 })}
      variant={stockInWatchlist ? 'secondary' : 'ghost'}
      style={spacingStyles.smVerticalMargin}
    >
      <View>
        <Typography>
          {stockInWatchlist ? '✓' : ''} {item.description}
        </Typography>
      </View>
    </CustomTouchableOpacity>
  );
};
