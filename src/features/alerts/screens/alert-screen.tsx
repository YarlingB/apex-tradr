import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appStyles } from '@app/theme/app-theme';
import { Typography } from '@shared/components/ui';
import { spacingStyles } from '@app/theme/spacing';
import { StockSelection } from '../components/stock-selection';
import StocksTrackingList from '../components/stocks-tracking-list/stocks-tracking-list';

const AlertsScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        appStyles.container,
        { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 10 },
      ]}
    >
      <Typography variant="2xl" style={spacingStyles.lgVerticalMargin}>
        Stock Settings
      </Typography>
      <StockSelection />

      <StocksTrackingList />
    </View>
  );
};

export default AlertsScreen;
