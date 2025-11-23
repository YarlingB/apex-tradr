export interface IBaseServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  status?: number;
}
