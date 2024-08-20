"use client";
// UTILS
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// SERVICES
import { currencyApi } from '@/services/currency';
// CONSTANTS
import { CURRENCY_CACHE_DURATION } from '@/utils/constants';
// TYPES
interface CurrencyState {
  localCurrency: string;
  exchangeRate: number;
  lastUpdated: number;
  isLoading: boolean;
  fetchCurrencyData: () => Promise<void>;
  convertPrice: (usdPrice: number) => string;
};

// Used to localize the currency based on users geo location (persists in local storage, syncs with server on app initialize, data changes)
const useGetCurrency = create<CurrencyState>()(
  persist(
    (set, get) => ({
      localCurrency: 'USD',
      exchangeRate: 1,
      lastUpdated: 0,
      isLoading: false,

      fetchCurrencyData: async () => {
        const { localCurrency, exchangeRate, lastUpdated } = get();
        const now = Date.now();

        // Check if cached data is still valid
        if (localCurrency !== 'USD' && exchangeRate !== 1 && (now - lastUpdated) < CURRENCY_CACHE_DURATION) {
          return;
        }

        set({ isLoading: true });

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
            lastUpdated: now,
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
    }
  )
);

export default useGetCurrency;