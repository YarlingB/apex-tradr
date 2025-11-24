import { IStockAlert } from '../data-types/interfaces/stock-alert';
import useStockAlertsStore from '../store/stock-alerts';

export const useStockAlerts = () => {
  const { stockAlerts, setStockAlerts } = useStockAlertsStore();

  const addStockAlert = (stockAlert: IStockAlert) => {
    // check if the alert already exists
    const existingAlert = stockAlerts.find(
      alert => alert.symbol === stockAlert.symbol,
    );
    if (existingAlert) {
      updateStockAlert(stockAlert);
    } else {
      setStockAlerts([...stockAlerts, stockAlert]);
    }
  };

  const removeStockAlert = (stockAlert: IStockAlert) => {
    setStockAlerts(
      stockAlerts.filter(alert => alert.symbol !== stockAlert.symbol),
    );
  };

  const updateStockAlert = (stockAlert: IStockAlert) => {
    setStockAlerts(
      stockAlerts.map(alert =>
        alert.symbol === stockAlert.symbol ? stockAlert : alert,
      ),
    );
  };

  const resetAlertFired = (symbol: string) => {
    setStockAlerts(
      stockAlerts.map(alert =>
        alert.symbol === symbol ? { ...alert, alertFired: false } : alert,
      ),
    );
  };

  const actions = {
    addStockAlert,
    removeStockAlert,
    updateStockAlert,
    resetAlertFired,
  };
  return { stockAlerts, actions };
};
