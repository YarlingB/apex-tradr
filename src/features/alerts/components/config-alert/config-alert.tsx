import { StyleSheet, View } from 'react-native';
import { Typography } from '@shared/components/ui';
import { useState } from 'react';
import { BottomSheet, BottomSheetContent } from '@shared/components/ui';
import { CustomTouchableOpacity } from '@shared/components/ui/button';
import { appTextStyles, COLORS } from '@app/theme/app-theme';
import { IWatchlist } from '@shared/data-types/interfaces/watchlist';
import { spacingStyles } from '@app/theme/spacing';
import { AlertForm } from './alert-form';

interface IConfigAlertProps {
  stock: IWatchlist;
}

const ConfigAlert = ({ stock }: IConfigAlertProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccessCallback = () => {
    console.log('close bottom sheet callback');
    setOpen(false);
  };
  return (
    <>
      <CustomTouchableOpacity onPress={() => setOpen(true)} variant="secondary">
        <Typography style={[appTextStyles.alignCenter]}>
          Configure Alert
        </Typography>
      </CustomTouchableOpacity>
      <BottomSheet open={open} onOpenChange={setOpen}>
        <BottomSheetContent>
          <View style={styles.contentContainer}>
            <View
              style={[spacingStyles.mdVerticalMargin, styles.headerContainer]}
            >
              <Typography variant="lg">Set your alert for</Typography>
              <Typography variant="lg" style={{ color: COLORS.primary }}>
                {stock.description}
              </Typography>
            </View>
            <Typography variant="sm">{stock.symbol}</Typography>
            <AlertForm
              currentStockSymbol={stock.symbol}
              onSuccessCallback={handleSuccessCallback}
            />
          </View>
        </BottomSheetContent>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default ConfigAlert;
