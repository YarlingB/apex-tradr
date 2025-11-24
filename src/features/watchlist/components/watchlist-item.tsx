import { View } from 'react-native';
import { Typography } from '@shared/components/ui';
import { Card } from '@shared/components/ui/card/card';
import { spacingStyles } from '@app/theme/spacing';
import { IWatchlist } from '@shared/data-types/interfaces/watchlist';
import { ITradeMarketData } from '@shared/data-types/interfaces/market-data';
import { calculatePercentChange } from '../utils/calculate-percent-change';
import StockMarginalChange from './stock-marginal-change';

interface IWatchlistItemProps {
  stock: IWatchlist;
  symbolData: ITradeMarketData[];
}

export const WatchlistItem = ({ stock, symbolData }: IWatchlistItemProps) => {
  const { quote } = stock;
  const latestTrade = symbolData[symbolData.length - 1];
  const percentChangeValue =
    quote && latestTrade && quote.pc
      ? calculatePercentChange(latestTrade?.p, quote?.pc)
      : 'N/A';

  return (
    <Card key={stock.symbol} style={spacingStyles.smVerticalMargin}>
      <Typography variant="lg">{stock.description}</Typography>
      <Typography variant="sm" style={spacingStyles.smTopMargin}>
        {stock.symbol}
      </Typography>
      <View
        style={[
          spacingStyles.mdVerticalMargin,
          { flexDirection: 'row', gap: 10 },
        ]}
      >
        <Typography variant="sm">Currency: {stock.currency}</Typography>
        <Typography variant="sm">MIC: {stock.mic}</Typography>
      </View>
      {latestTrade ? (
        <View style={spacingStyles.smTopMargin}>
          <Typography variant="md" style={{ fontWeight: '600' }}>
            Price: ${latestTrade.p.toFixed(2)}
          </Typography>
          <StockMarginalChange marginalChangeValue={percentChangeValue} />
        </View>
      ) : (
        <View style={spacingStyles.smTopMargin}>
          <Typography variant="sm" style={{ fontStyle: 'italic' }}>
            Waiting for data...
          </Typography>
        </View>
      )}
    </Card>
  );
};
