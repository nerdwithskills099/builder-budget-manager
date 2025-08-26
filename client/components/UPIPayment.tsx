import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  QrCode,
  Smartphone,
  CheckCircle,
  Copy,
  ExternalLink,
  CreditCard,
  Wallet,
} from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";

const upiApps = [
  { name: "Google Pay", id: "gpay", color: "bg-blue-500" },
  { name: "PhonePe", id: "phonepe", color: "bg-purple-600" },
  { name: "Paytm", id: "paytm", color: "bg-blue-600" },
  { name: "BHIM", id: "bhim", color: "bg-orange-500" },
  { name: "Amazon Pay", id: "amazonpay", color: "bg-orange-600" },
];

export default function UPIPayment() {
  const { formatAmount, selectedCurrency } = useCurrency();
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [upiId, setUpiId] = useState<string>("student@okaxis");
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [qrGenerated, setQrGenerated] = useState<boolean>(false);

  const generateUPILink = () => {
    const amount = parseFloat(paymentAmount);
    if (!amount || !upiId) return "";

    return `upi://pay?pa=${upiId}&pn=BudgetBuddy&am=${amount}&cu=INR&tn=Budget Payment`;
  };

  const generateQRCode = () => {
    if (paymentAmount && upiId) {
      setQrGenerated(true);
    }
  };

  const copyUPIId = () => {
    navigator.clipboard.writeText(upiId);
  };

  const openInApp = (appId: string) => {
    const upiLink = generateUPILink();
    if (upiLink) {
      window.open(upiLink, "_blank");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          UPI Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="payment-amount">Payment Amount (₹)</Label>
            <Input
              id="payment-amount"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upi-id">UPI ID</Label>
            <div className="flex gap-2">
              <Input
                id="upi-id"
                placeholder="yourname@bank"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
              <Button variant="outline" size="sm" onClick={copyUPIId}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Button
          onClick={generateQRCode}
          className="w-full"
          disabled={!paymentAmount || !upiId}
        >
          <QrCode className="mr-2 h-4 w-4" />
          Generate QR Code
        </Button>

        {qrGenerated && paymentAmount && (
          <div className="space-y-4">
            {/* QR Code Placeholder */}
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="w-32 h-32 bg-gray-200 mx-auto rounded-lg flex items-center justify-center mb-4">
                <QrCode className="h-16 w-16 text-gray-500" />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                QR Code for ₹{paymentAmount}
              </p>
              <p className="text-xs text-gray-500">
                Scan with any UPI app to pay
              </p>
            </div>

            {/* UPI Apps */}
            <div className="space-y-3">
              <Label>Or pay with your favorite UPI app:</Label>
              <div className="grid grid-cols-2 gap-2">
                {upiApps.map((app) => (
                  <Button
                    key={app.id}
                    variant="outline"
                    className="h-12 justify-start"
                    onClick={() => openInApp(app.id)}
                  >
                    <div className={`w-6 h-6 rounded ${app.color} mr-3`}></div>
                    <span>{app.name}</span>
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">₹{paymentAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">UPI ID:</span>
                <span className="font-medium">{upiId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Purpose:</span>
                <span className="font-medium">Budget Payment</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="h-4 w-4" />
              <span>Secure UPI payment - No card details required</span>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-gray-500">
          <p>
            UPI payments are instant and secure. Supported by all major Indian
            banks.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
