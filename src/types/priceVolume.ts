export interface PriceVolumeMix {
  priceChange: number;
  volumeChange: number;
  mixChange: number;
  totalChange: number;
}

export interface SKUData {
  id: string;
  name: string;
  category: string;
  geography: string;
  currentRevenue: number;
  previousRevenue: number;
  currentPrice: number;
  previousPrice: number;
  currentVolume: number;
  previousVolume: number;
  priceVolumeMix: PriceVolumeMix;
  insight?: string;
}

export interface CategoryBreakdown {
  name: string;
  currentRevenue: number;
  previousRevenue: number;
  priceVolumeMix: PriceVolumeMix;
  skuCount: number;
  topDriver: 'price' | 'volume' | 'mix';
  insight: string;
}

export interface GeographyBreakdown extends CategoryBreakdown {
  region: string;
}

export interface ProductGroupBreakdown extends CategoryBreakdown {
  productLine: string;
}

export interface RevenueSummary {
  totalCurrentRevenue: number;
  totalPreviousRevenue: number;
  totalChange: number;
  totalChangePercent: number;
  priceVolumeMix: PriceVolumeMix;
  period: string;
  previousPeriod: string;
}

export interface PriceVolumeData {
  summary: RevenueSummary;
  geographies: GeographyBreakdown[];
  productGroups: ProductGroupBreakdown[];
  skus: SKUData[];
  keyInsights: string[];
}
