import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Barcode, TrendingUp, TrendingDown, Info, Sparkles } from "lucide-react";
import { SKUData } from "@/types/priceVolume";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { Sparkline } from "./Sparkline";

interface SKUAnalysisProps {
  skus: SKUData[];
}

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `£${(value / 1000000).toFixed(1)}M`;
  }
  return `£${(value / 1000).toFixed(0)}K`;
}

function PriceVolumePill({ priceChange, volumeChange, mixChange }: { priceChange: number; volumeChange: number; mixChange: number }) {
  return (
    <div className="flex gap-1.5">
      <span className={`text-xs px-2 py-1 rounded-md font-medium transition-all ${priceChange >= 0 ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-600'}`}>
        P: {priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%
      </span>
      <span className={`text-xs px-2 py-1 rounded-md font-medium transition-all ${volumeChange >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-50 text-emerald-600'}`}>
        V: {volumeChange > 0 ? '+' : ''}{volumeChange.toFixed(1)}%
      </span>
      {mixChange !== 0 && (
        <span className={`text-xs px-2 py-1 rounded-md font-medium transition-all ${mixChange >= 0 ? 'bg-amber-100 text-amber-700' : 'bg-amber-50 text-amber-600'}`}>
          M: {mixChange > 0 ? '+' : ''}{mixChange.toFixed(1)}%
        </span>
      )}
    </div>
  );
}

export function SKUAnalysis({ skus }: SKUAnalysisProps) {
  const [selectedSku, setSelectedSku] = useState<SKUData | null>(null);

  return (
    <Card className="shadow-lg border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-muted/30 to-transparent border-b border-border/50">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 rounded-lg bg-primary/10">
            <Barcode className="h-5 w-5 text-primary" />
          </div>
          SKU-Level Analysis
          <Badge variant="outline" className="ml-auto text-xs">
            {skus.length} items
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold">SKU</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Geography</TableHead>
                <TableHead className="font-semibold text-right">Revenue</TableHead>
                <TableHead className="font-semibold text-center">Trend</TableHead>
                <TableHead className="font-semibold text-right">Change</TableHead>
                <TableHead className="font-semibold">Price/Volume/Mix</TableHead>
                <TableHead className="font-semibold text-center">Insight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skus.map((sku) => {
                const changePercent = ((sku.currentRevenue - sku.previousRevenue) / sku.previousRevenue) * 100;
                const isPositive = changePercent >= 0;
                
                return (
                  <TableRow 
                    key={sku.id} 
                    className={`cursor-pointer transition-all duration-300 ${selectedSku?.id === sku.id ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-muted/50'}`}
                    onClick={() => setSelectedSku(selectedSku?.id === sku.id ? null : sku)}
                  >
                    <TableCell>
                      <div>
                        <p className="font-semibold text-sm">{sku.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{sku.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs font-medium">{sku.category}</Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{sku.geography}</TableCell>
                    <TableCell className="text-right font-bold">{formatCurrency(sku.currentRevenue)}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Sparkline 
                          previousValue={sku.previousRevenue} 
                          currentValue={sku.currentRevenue}
                          width={60}
                          height={24}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className={`p-1 rounded ${isPositive ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                          {isPositive ? (
                            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                          )}
                        </div>
                        <span className={`font-bold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                          {isPositive ? '+' : ''}{changePercent.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <PriceVolumePill 
                        priceChange={sku.priceVolumeMix.priceChange}
                        volumeChange={sku.priceVolumeMix.volumeChange}
                        mixChange={sku.priceVolumeMix.mixChange}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                            <Info className="h-4 w-4 text-primary" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-xs">
                          <p className="text-sm">{sku.insight}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {selectedSku && (
          <div className="p-5 border-t bg-gradient-to-r from-primary/5 to-transparent animate-fade-in">
            <div className="p-5 rounded-xl bg-card border border-border/50 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{selectedSku.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedSku.id} • {selectedSku.category} • {selectedSku.geography}</p>
                  </div>
                </div>
                <Badge 
                  className={`text-xs font-medium shadow-sm ${
                    selectedSku.priceVolumeMix.priceChange > selectedSku.priceVolumeMix.volumeChange
                      ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {selectedSku.priceVolumeMix.priceChange > selectedSku.priceVolumeMix.volumeChange ? 'Price-led' : 'Volume-led'}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-5 p-3 bg-muted/30 rounded-lg">{selectedSku.insight}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-muted-foreground text-xs mb-2 font-medium">Current Price</p>
                  <p className="font-bold text-lg">£{selectedSku.currentPrice.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    vs £{selectedSku.previousPrice.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-muted-foreground text-xs mb-2 font-medium">Current Volume</p>
                  <p className="font-bold text-lg">{selectedSku.currentVolume.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    vs {selectedSku.previousVolume.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                  <p className="text-muted-foreground text-xs mb-2 font-medium">Price Change</p>
                  <p className={`font-bold text-lg ${selectedSku.priceVolumeMix.priceChange >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {selectedSku.priceVolumeMix.priceChange > 0 ? '+' : ''}{selectedSku.priceVolumeMix.priceChange.toFixed(1)}%
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <p className="text-muted-foreground text-xs mb-2 font-medium">Volume Change</p>
                  <p className={`font-bold text-lg ${selectedSku.priceVolumeMix.volumeChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {selectedSku.priceVolumeMix.volumeChange > 0 ? '+' : ''}{selectedSku.priceVolumeMix.volumeChange.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
