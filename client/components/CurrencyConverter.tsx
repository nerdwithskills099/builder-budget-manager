import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCurrency, currencies, Currency } from "@/hooks/useCurrency";
import { ArrowRightLeft, Calculator } from "lucide-react";

export default function CurrencyConverter() {
  const { convertAmount } = useCurrency();
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<Currency>(currencies[3]); // INR
  const [toCurrency, setToCurrency] = useState<Currency>(currencies[0]); // USD
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      const convertedAmount = convertAmount(numAmount, fromCurrency, toCurrency);
      setResult(convertedAmount);
    }
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    if (result !== null && amount) {
      setResult(parseFloat(amount));
      setAmount(result.toFixed(2));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Currency Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>From Currency</Label>
            <Select value={fromCurrency.code} onValueChange={(code) => {
              const currency = currencies.find(c => c.code === code);
              if (currency) setFromCurrency(currency);
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.name} ({currency.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={swapCurrencies}
            className="h-10 w-10 p-0"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <Label>To Currency</Label>
          <Select value={toCurrency.code} onValueChange={(code) => {
            const currency = currencies.find(c => c.code === code);
            if (currency) setToCurrency(currency);
          }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.name} ({currency.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleConvert} className="w-full" disabled={!amount}>
          Convert
        </Button>

        {result !== null && (
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Converted Amount</p>
            <p className="text-2xl font-bold text-foreground">
              {toCurrency.symbol}{result.toLocaleString(undefined, { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {fromCurrency.symbol}{amount} {fromCurrency.code} = {toCurrency.symbol}{result.toFixed(2)} {toCurrency.code}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
