import { IBaseServiceResponse } from '@shared/data-types/interfaces/services';
import { FINNHUB_API_URL } from '@shared/constants/app';
import { ICompanyProfile } from '@shared/data-types/interfaces/stock-symbols';

export const getCompanyProfileService = async (
  symbol: string,
): Promise<IBaseServiceResponse<ICompanyProfile>> => {
  try {
    const response = await fetch(
      `${FINNHUB_API_URL}/stock/profile2?symbol=${symbol}`,
    );
    return {
      success: true,
      data: await response.json(),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Oops! Something went wrong while fetching company profile',
    };
  }
};
