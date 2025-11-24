import { View } from 'react-native';
import { Typography } from '@shared/components/ui';
import { IWatchlist } from '@shared/data-types/interfaces/watchlist';
import { Card } from '@shared/components/ui/card/card';
import { spacingStyles } from '@app/theme/spacing';

interface ITrackingItemCardProps {
  stock: IWatchlist;
  key: string;
}

const TrackingItemCard = ({ stock, key }: ITrackingItemCardProps) => {
  return (
    <Card key={key} style={spacingStyles.smVerticalMargin}>
      <Typography variant="lg">{stock.description}</Typography>
      <Typography variant="sm">{stock.symbol}</Typography>
      <View
        style={[
          spacingStyles.mdVerticalMargin,
          { flexDirection: 'row', gap: 10 },
        ]}
      >
        <Typography variant="sm">Currency: {stock.currency}</Typography>
        <Typography variant="sm">MIC: {stock.mic}</Typography>
      </View>
    </Card>
  );
};

export default TrackingItemCard;
