import { AlertConditionType } from '../types/alert-condition';

export interface IStockAlert {
  symbol: string;
  alertCondition: AlertConditionType;
  targetValue: number;
  alertFired: boolean;
}

export interface IStockAlertsStore {
  stockAlerts: IStockAlert[];
  setStockAlerts: (stockAlerts: IStockAlert[]) => void;
}
