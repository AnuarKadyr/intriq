import { PriceVolumeData } from "@/types/priceVolume";

export const priceVolumeData: PriceVolumeData = {
  summary: {
    totalCurrentRevenue: 142500000,
    totalPreviousRevenue: 128700000,
    totalChange: 13800000,
    totalChangePercent: 10.7,
    priceVolumeMix: {
      priceChange: 5.2,
      volumeChange: 4.8,
      mixChange: 0.7,
      totalChange: 10.7
    },
    period: "FY 2024",
    previousPeriod: "FY 2023"
  },
  geographies: [
    {
      name: "North America",
      region: "NA",
      currentRevenue: 62500000,
      previousRevenue: 55200000,
      priceVolumeMix: {
        priceChange: 6.8,
        volumeChange: 5.4,
        mixChange: 1.0,
        totalChange: 13.2
      },
      skuCount: 128,
      topDriver: "price",
      insight: "Strong pricing power driven by premium product launches and reduced promotional activity. Volume growth supported by new retail partnerships."
    },
    {
      name: "Europe",
      region: "EU",
      currentRevenue: 45800000,
      previousRevenue: 42100000,
      priceVolumeMix: {
        priceChange: 4.2,
        volumeChange: 4.6,
        mixChange: 0.0,
        totalChange: 8.8
      },
      skuCount: 95,
      topDriver: "volume",
      insight: "Volume growth outpaced price increases due to market share gains in Germany and France. Currency headwinds partially offset pricing gains."
    },
    {
      name: "Asia Pacific",
      region: "APAC",
      currentRevenue: 24200000,
      previousRevenue: 22400000,
      priceVolumeMix: {
        priceChange: 3.1,
        volumeChange: 4.9,
        mixChange: 0.0,
        totalChange: 8.0
      },
      skuCount: 67,
      topDriver: "volume",
      insight: "Expansion into Southeast Asian markets drove volume growth. Competitive pricing environment limited price increases."
    },
    {
      name: "Latin America",
      region: "LATAM",
      currentRevenue: 10000000,
      previousRevenue: 9000000,
      priceVolumeMix: {
        priceChange: 8.2,
        volumeChange: 2.9,
        mixChange: 0.0,
        totalChange: 11.1
      },
      skuCount: 42,
      topDriver: "price",
      insight: "Inflationary environment enabled significant price increases. Volume growth limited by economic uncertainty in key markets."
    }
  ],
  productGroups: [
    {
      name: "Premium Solutions",
      productLine: "Enterprise",
      currentRevenue: 52000000,
      previousRevenue: 44500000,
      priceVolumeMix: {
        priceChange: 8.5,
        volumeChange: 7.3,
        mixChange: 1.1,
        totalChange: 16.9
      },
      skuCount: 45,
      topDriver: "price",
      insight: "Premium tier benefited from new feature releases enabling 8.5% average price increase. Strong demand from enterprise customers drove volume."
    },
    {
      name: "Core Products",
      productLine: "Business",
      currentRevenue: 48500000,
      previousRevenue: 46200000,
      priceVolumeMix: {
        priceChange: 3.2,
        volumeChange: 1.6,
        mixChange: 0.2,
        totalChange: 5.0
      },
      skuCount: 120,
      topDriver: "price",
      insight: "Mature product line with limited volume growth. Price increases aligned with inflation, maintaining competitive positioning."
    },
    {
      name: "Entry Level",
      productLine: "Starter",
      currentRevenue: 28000000,
      previousRevenue: 26500000,
      priceVolumeMix: {
        priceChange: 2.1,
        volumeChange: 3.5,
        mixChange: 0.1,
        totalChange: 5.7
      },
      skuCount: 85,
      topDriver: "volume",
      insight: "Volume-driven growth through expanded distribution channels. Pricing kept competitive to drive market penetration."
    },
    {
      name: "Services & Support",
      productLine: "Services",
      currentRevenue: 14000000,
      previousRevenue: 11500000,
      priceVolumeMix: {
        priceChange: 12.2,
        volumeChange: 9.5,
        mixChange: 0.0,
        totalChange: 21.7
      },
      skuCount: 22,
      topDriver: "price",
      insight: "Strong demand for professional services enabled significant price increases. New consulting offerings expanded revenue base."
    }
  ],
  skus: [
    {
      id: "SKU-001",
      name: "Enterprise Platform Pro",
      category: "Premium Solutions",
      geography: "North America",
      currentRevenue: 8500000,
      previousRevenue: 6800000,
      currentPrice: 12500,
      previousPrice: 11200,
      currentVolume: 680,
      previousVolume: 607,
      priceVolumeMix: {
        priceChange: 11.6,
        volumeChange: 12.0,
        mixChange: 1.4,
        totalChange: 25.0
      },
      insight: "Top performer with balanced price and volume growth. New AI features justified premium pricing."
    },
    {
      id: "SKU-002",
      name: "Business Suite Standard",
      category: "Core Products",
      geography: "Europe",
      currentRevenue: 6200000,
      previousRevenue: 5900000,
      currentPrice: 4200,
      previousPrice: 4100,
      currentVolume: 1476,
      previousVolume: 1439,
      priceVolumeMix: {
        priceChange: 2.4,
        volumeChange: 2.6,
        mixChange: 0.1,
        totalChange: 5.1
      },
      insight: "Steady performer with modest price and volume gains aligned with market growth."
    },
    {
      id: "SKU-003",
      name: "Starter Package Basic",
      category: "Entry Level",
      geography: "Asia Pacific",
      currentRevenue: 4800000,
      previousRevenue: 3900000,
      currentPrice: 890,
      previousPrice: 920,
      currentVolume: 5393,
      previousVolume: 4239,
      priceVolumeMix: {
        priceChange: -3.3,
        volumeChange: 27.2,
        mixChange: -0.8,
        totalChange: 23.1
      },
      insight: "Aggressive pricing strategy drove significant volume growth in APAC expansion markets."
    },
    {
      id: "SKU-004",
      name: "Professional Services Tier 1",
      category: "Services & Support",
      geography: "North America",
      currentRevenue: 3200000,
      previousRevenue: 2400000,
      currentPrice: 185,
      previousPrice: 155,
      currentVolume: 17297,
      previousVolume: 15484,
      priceVolumeMix: {
        priceChange: 19.4,
        volumeChange: 11.7,
        mixChange: 2.2,
        totalChange: 33.3
      },
      insight: "Premium consulting rates reflecting increased demand and expertise. Strong growth across both dimensions."
    },
    {
      id: "SKU-005",
      name: "Core Platform License",
      category: "Core Products",
      geography: "North America",
      currentRevenue: 5100000,
      previousRevenue: 5000000,
      currentPrice: 3400,
      previousPrice: 3350,
      currentVolume: 1500,
      previousVolume: 1493,
      priceVolumeMix: {
        priceChange: 1.5,
        volumeChange: 0.5,
        mixChange: 0.0,
        totalChange: 2.0
      },
      insight: "Mature product with limited growth opportunity. Focus on retention over expansion."
    },
    {
      id: "SKU-006",
      name: "Enterprise Analytics Add-on",
      category: "Premium Solutions",
      geography: "Europe",
      currentRevenue: 4200000,
      previousRevenue: 3100000,
      currentPrice: 6800,
      previousPrice: 5900,
      currentVolume: 618,
      previousVolume: 525,
      priceVolumeMix: {
        priceChange: 15.3,
        volumeChange: 17.7,
        mixChange: 2.5,
        totalChange: 35.5
      },
      insight: "High-growth add-on product benefiting from data analytics trend. Strong demand enabled premium pricing."
    }
  ],
  keyInsights: [
    "Overall revenue growth of 10.7% was balanced between price (5.2%) and volume (4.8%) contributions, indicating healthy demand elasticity.",
    "Premium Solutions segment drove 53% of total growth with 16.9% increase, primarily through price realization (+8.5%).",
    "North America remains the strongest market with 13.2% growth, led by pricing power in enterprise segment.",
    "Services & Support showed exceptional growth (21.7%) with significant price increases (12.2%) reflecting high demand.",
    "APAC expansion strategy focused on volume growth (4.9%) with measured price increases (3.1%) to gain market share.",
    "SKU-level analysis reveals top 10% of SKUs contribute 42% of total growth, suggesting portfolio optimization opportunity."
  ]
};
