export interface IPaymentIntentPayload {
  price: number;
  plan?: "MONTHLY" | "YEARLY";
}

export interface IPayment {
  _id: string;
  user: string;
  amount: number;
  plan: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: string;
}
