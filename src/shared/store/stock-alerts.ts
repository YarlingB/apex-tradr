import { create } from 'zustand';
import {
  IStockAlert,
  IStockAlertsStore,
} from '../data-types/interfaces/stock-alert';

/**
 * @description Store to manage the stock alerts
 * Important: This store is used to manage the stock alerts in the app: get, set stock alerts list
 */
const useStockAlertsStore = create<IStockAlertsStore>(set => ({
  stockAlerts: [],
  setStockAlerts: (stockAlerts: IStockAlert[]) => set({ stockAlerts }),
}));

export default useStockAlertsStore;
