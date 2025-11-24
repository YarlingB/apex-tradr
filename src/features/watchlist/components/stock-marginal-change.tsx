import { View } from 'react-native';
import { Typography } from '@shared/components/ui/typography';
import { COLORS } from '@app/theme/app-theme';

interface IStockMarginalChangeProps {
  marginalChangeValue: number | string;
}
const StockMarginalChange = ({
  marginalChangeValue,
}: IStockMarginalChangeProps) => {
  const isAValidPercentalChangeValue =
    typeof marginalChangeValue === 'number' && !isNaN(marginalChangeValue);

  const isPositive = isAValidPercentalChangeValue && marginalChangeValue > 0;

  return (
    <View>
      {isAValidPercentalChangeValue && (
        <View>
          {isPositive ? (
            <Typography
              variant="lg"
              style={{ color: COLORS.greenColors.green500 }}
            >
              {marginalChangeValue.toFixed(2)}%
            </Typography>
          ) : (
            <Typography variant="lg" style={{ color: COLORS.redColors.red500 }}>
              {marginalChangeValue.toFixed(2)}%
            </Typography>
          )}
        </View>
      )}

      {/* it shows the value if it is not a valid percental change value */}
      {!isAValidPercentalChangeValue && (
        <Typography variant="sm">{marginalChangeValue}</Typography>
      )}
    </View>
  );
};

export default StockMarginalChange;
