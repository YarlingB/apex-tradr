/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Typography } from '@shared/components/ui';
import { appTextStyles } from '@app/theme/app-theme';
import { CustomTouchableOpacity } from '@shared/components/ui/button';
import useStockSymbols from '@shared/hooks/use-stock-symbols';
import {
  BottomSheet,
  BottomSheetContent,
} from '@shared/components/ui/bottomsheet/bottomsheet';
import { RenderStockItem } from './stock-item';

const StockSelection = () => {
  const [open, setOpen] = useState(false);
  const { stockSymbols, actions } = useStockSymbols();

  useEffect(() => {
    actions.getStockSymbols();
  }, []);

  return (
    <>
      {/* <Select value={selectedStock} onValueChange={setSelectedStock}>
        <SelectTrigger>
          <SelectValue placeholder="Select Stock" />
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>Select Stock</SelectLabel>
          <FlatList
            data={options}
            keyExtractor={item => item.value}
            renderItem={({ item }) => renderStockItem({ item })}
          />
        </SelectContent>
      </Select> */}

      <CustomTouchableOpacity onPress={() => setOpen(true)}>
        <Typography style={[appTextStyles.light, appTextStyles.alignCenter]}>
          Add stocks to your watchlist
        </Typography>
      </CustomTouchableOpacity>
      <BottomSheet open={open} onOpenChange={setOpen}>
        <BottomSheetContent>
          <View>
            <Typography>
              Please choose from the list below to add to your watchlist
            </Typography>
            <FlatList
              data={stockSymbols}
              keyExtractor={item => item.symbol}
              renderItem={({ item }) => <RenderStockItem item={item} />}
            />
          </View>
        </BottomSheetContent>
      </BottomSheet>
    </>
  );
};

export default StockSelection;
