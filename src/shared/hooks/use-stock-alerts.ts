import { IStockAlert } from '../data-types/interfaces/stock-alert';
import useStockAlertsStore from '../store/stock-alerts';

export const useStockAlerts = () => {
  const { stockAlerts, setStockAlerts } = useStockAlertsStore();

  const addStockAlert = (stockAlert: IStockAlert) => {
    setStockAlerts([...stockAlerts, stockAlert]);
  };

  const removeStockAlert = (stockAlert: IStockAlert) => {
    setStockAlerts(stockAlerts.filter(alert => alert.id !== stockAlert.id));
  };

  const updateStockAlert = (stockAlert: IStockAlert) => {
    setStockAlerts(
      stockAlerts.map(alert =>
        alert.id === stockAlert.id ? stockAlert : alert,
      ),
    );
  };

  const actions = {
    addStockAlert,
    removeStockAlert,
    updateStockAlert,
  };
  return { stockAlerts, actions };
};
