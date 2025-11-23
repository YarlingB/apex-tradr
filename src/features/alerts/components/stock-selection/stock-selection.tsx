/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { ISelectOption, SelectItem } from '@shared/components/ui/select';
import { Typography } from '@shared/components/ui';
import {
  BottomSheet,
  BottomSheetContent,
} from '@shared/components/ui/bottomsheet/bottomsheet';
import { CustomTouchableOpacity } from '@shared/components/ui/button';
import { appTextStyles } from '@app/theme/app-theme';
import useStockSymbols from '@shared/hooks/use-stock-symbols';

const StockSelection = () => {
  const [open, setOpen] = useState(false);
  const { stockSymbols, actions } = useStockSymbols();

  useEffect(() => {
    actions.getStockSymbols();
  }, []);

  const [selectedStock, setSelectedStock] = useState<ISelectOption | null>(
    null,
  );

  const handleSelect = (item: ISelectOption) => {
    setSelectedStock(item);
  };

  const options = stockSymbols.map(symbol => ({
    label: symbol.description,
    value: symbol.symbol,
  }));

  const renderStockItem = ({ item }: { item: ISelectOption }) => (
    <SelectItem
      value={item.value}
      label={item.label}
      onSelectItem={() => handleSelect(item)}
    >
      <View>
        <Typography>{item.label}</Typography>
      </View>
    </SelectItem>
  );
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
        <Typography style={appTextStyles.light}>
          Choose the stocks you want to watch
        </Typography>
      </CustomTouchableOpacity>
      <BottomSheet open={open} onOpenChange={setOpen}>
        <BottomSheetContent>
          <View>
            <Typography>
              Please choose from the list below to add to your watchlist
            </Typography>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => renderStockItem({ item })}
            />
          </View>
        </BottomSheetContent>
      </BottomSheet>
    </>
  );
};

export default StockSelection;
