"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { currencyApi } from '@/services/currency';

interface CurrencyState {
  localCurrency: string;
  exchangeRate: number;
  isLoading: boolean;
  fetchCurrencyData: () => Promise<void>;
  convertPrice: (usdPrice: number) => string;
}

const useGetCurrency = create<CurrencyState>()(
  persist(
    (set, get) => ({
      localCurrency: 'USD',
      exchangeRate: 1,
      isLoading: true,

      fetchCurrencyData: async () => {
        try {
          const locationData = await currencyApi.getLocationData();
          const userCurrency = locationData.currency;
          
          let rate = 1;
          if (userCurrency !== 'USD') {
            const rateData = await currencyApi.getExchangeRate('USD');
            rate = rateData.rates[userCurrency];
          }

          set({ 
            localCurrency: userCurrency, 
            exchangeRate: rate,
            isLoading: false 
          });
        } catch (error) {
          console.error('Error fetching currency data:', error);
          set({ isLoading: false });
        }
      },

      convertPrice: (usdPrice: number) => {
        const { exchangeRate } = get();
        return (usdPrice * exchangeRate).toFixed(2);
      },
    }),
    {
      name: 'currency-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useGetCurrency;