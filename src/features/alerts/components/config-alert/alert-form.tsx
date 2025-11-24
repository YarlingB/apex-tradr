import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Typography } from '@shared/components/ui';
import { Card } from '@shared/components/ui/card/card';
import { useStockAlerts } from '@shared/hooks/use-stock-alerts';
import { CustomTouchableOpacity } from '@shared/components/ui/button';
import { appTextStyles, COLORS } from '@app/theme/app-theme';

interface IAlertFormProps {
  currentStockSymbol: string;
  onSuccessCallback: () => void;
}
export const AlertForm = ({
  currentStockSymbol,
  onSuccessCallback,
}: IAlertFormProps) => {
  const { stockAlerts, actions } = useStockAlerts();
  const existingAlert = stockAlerts.find(
    alert => alert.symbol === currentStockSymbol,
  );

  const [alertValue, setAlertValue] = useState(
    existingAlert?.targetValue?.toString() || '',
  );
  const defaultAlertCondition = 'gt';

  const handleCreateAlert = () => {
    // TODO: extend to support other alert conditions
    const numericValue = parseFloat(alertValue);
    console.log('numericValue', numericValue);
    if (isNaN(numericValue)) return;

    console.log('saved alert value', alertValue);

    actions.addStockAlert({
      symbol: currentStockSymbol,
      alertCondition: defaultAlertCondition,
      targetValue: numericValue,
      alertFired: false,
    });
    // TODO: show feedback to the user
    onSuccessCallback();
  };

  return (
    <Card style={styles.container}>
      <Typography variant="md">
        You will be notified when the price is greater than the value you enter
        below.
      </Typography>
      <TextInput
        placeholder="Enter your target value, max 10 digits"
        value={alertValue}
        onChangeText={setAlertValue}
        keyboardType="decimal-pad"
        inputMode="decimal"
        style={styles.input}
        maxLength={10}
      />
      <View>
        <CustomTouchableOpacity onPress={handleCreateAlert} variant="primary">
          <Typography style={[appTextStyles.alignCenter, appTextStyles.light]}>
            {existingAlert ? 'Update Alert' : 'Create Alert'}
          </Typography>
        </CustomTouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    paddingVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primaryColors.primary600,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
