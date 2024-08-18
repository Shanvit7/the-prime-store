import ApiService from "@/services";

interface LocationData {
  country_name: string;
  currency: string;
}

interface ExchangeRateData {
  rates: { [key: string]: number };
  base: string;
  timestamp: number;
}

class CurrencyService {
  private geoLocationService: ApiService;
  private exchangeRateService: ApiService;
  private appId: string;

  constructor() {
    this.geoLocationService = new ApiService(process.env.NEXT_PUBLIC_GEOLOCATION_API_URL as string);
    this.exchangeRateService = new ApiService(process.env.NEXT_PUBLIC_EXCHANGERATE_API_URL as string);
    this.appId = process.env.NEXT_PUBLIC_EXCHANGERATES_APP_ID as string;
  }

  async getLocationData(): Promise<LocationData> {
    return await this.geoLocationService.get<LocationData>('/json/');
  }

  async getExchangeRate(baseCurrency: string): Promise<ExchangeRateData> {
    return this.exchangeRateService.get<ExchangeRateData>(`/latest.json?app_id=${this.appId}&base=${baseCurrency}`);
  }
}

export const currencyApi = new CurrencyService();