"use client";

import { useEffect, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { createPaymentIntent } from "@/services/payment/payment.services";

interface CheckoutFormProps {
  plan?: "MONTHLY" | "YEARLY";
  user: {
    email: string;
    name?: string;
  };
}

export default function CheckoutForm({
  plan = "MONTHLY",
  user,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");

  /**
   * STEP 1: Create PaymentIntent (SERVER decides price)
   */
 useEffect(() => {
  const initPayment = async () => {
    try {
      const price = plan === "MONTHLY" ? 10 : 100; // define price
      const res = await createPaymentIntent({ plan, price });

      if (res?.success && res?.data?.clientSecret) {
        setClientSecret(res.data.clientSecret);
      } else {
        setError(res?.message || "Failed to initialize payment");
      }
    } catch {
      setError("Payment initialization failed");
    }
  };

  initPayment();
}, [plan]);


  /**
   * STEP 2: Confirm card payment
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    try {
      const { paymentIntent, error } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              email: user.email,
              name: user.name ?? "Anonymous",
            },
          },
        });

      if (error) throw new Error(error.message);

      if (paymentIntent?.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        Swal.fire({
          icon: "success",
          title: "Payment Successful 🎉",
          text: `Transaction ID: ${paymentIntent.id}`,
        });

        // OPTIONAL: notify backend about success
        // await confirmPayment(paymentIntent.id);
      }
    } catch (err: any) {
      setError(err.message || "Payment failed");
      Swal.fire("Payment Failed", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-md mx-auto"
    >
      <CardElement className="p-3 border rounded mb-4" />

      <button
        type="submit"
        disabled={!stripe || !clientSecret || loading}
        className={`w-full py-2 text-white rounded ${
          loading
            ? "bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}
      {transactionId && (
        <p className="text-green-600 mt-3">
          Transaction ID: {transactionId}
        </p>
      )}
    </form>
  );
}
