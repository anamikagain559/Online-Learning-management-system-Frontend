"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, ShieldCheck, AlertCircle } from "lucide-react";
import { confirmEnrollment } from "@/services/payment/payment.services";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface CheckoutFormProps {
  clientSecret: string;
  courseId: string;
  price: number;
  onSuccess: () => void;
}

export default function CheckoutForm({ clientSecret, courseId, price, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
        setProcessing(false);
        return;
    }

    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (paymentError) {
      setError(paymentError.message || "Payment failed");
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      // Confirm enrollment in backend
      try {
        const res = await confirmEnrollment(paymentIntent.id, courseId);
        if (res.success) {
          Swal.fire({
            title: "Enrollment Successful!",
            text: "You have been enrolled in the course.",
            icon: "success",
            confirmButtonColor: "#4f46e5",
          });
          onSuccess();
          router.push("/dashboard/courses"); 
        } else {
          setError(res.message || "Failed to confirm enrollment. Please contact support.");
        }
      } catch (err) {
        setError("Something went wrong during enrollment confirmation.");
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-500 font-medium">Total Amount</span>
          <span className="text-2xl font-black text-slate-900">${price}</span>
        </div>
        <div className="h-px bg-slate-200 mb-6" />
        
        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-indigo-500" />
          Card Details
        </label>
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-inner">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1e293b",
                  "::placeholder": {
                    color: "#94a3b8",
                  },
                },
                invalid: {
                  color: "#ef4444",
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm animate-shake">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          disabled={!stripe || processing}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-7 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50"
        >
          {processing ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing Payment...
            </span>
          ) : (
            `Pay $${price} & Enroll`
          )}
        </Button>
        
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          Secure SSL Encrypted Payment
        </div>
      </div>
    </form>
  );
}
