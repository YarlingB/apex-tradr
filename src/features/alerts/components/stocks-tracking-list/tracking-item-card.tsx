import { StyleSheet, View } from 'react-native';
import { Typography } from '@shared/components/ui';
import { IWatchlist } from '@shared/data-types/interfaces/watchlist';
import { Card } from '@shared/components/ui/card/card';
import { spacingStyles } from '@app/theme/spacing';

import { ConfigAlert } from '../config-alert';

interface ITrackingItemCardProps {
  stock: IWatchlist;
  key: string;
  showAlertConfigAcction?: boolean;
}

const TrackingItemCard = ({
  stock,
  showAlertConfigAcction = false,
  key,
}: ITrackingItemCardProps) => {
  return (
    <Card
      key={key}
      style={[spacingStyles.smVerticalMargin, styles.cardContainer]}
    >
      <View>
        <Typography variant="lg">{stock.description}</Typography>
        <Typography variant="sm">{stock.symbol}</Typography>
        <View style={[spacingStyles.mdVerticalMargin, styles.contentContainer]}>
          <Typography variant="sm">Currency: {stock.currency}</Typography>
          <Typography variant="sm">MIC: {stock.mic}</Typography>
        </View>
      </View>
      {showAlertConfigAcction && <ConfigAlert stock={stock} />}
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: { flexDirection: 'row', gap: 10 },
});

export default TrackingItemCard;
