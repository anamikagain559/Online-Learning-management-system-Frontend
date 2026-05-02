"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { BookOpen, X } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientSecret: string;
  courseId: string;
  courseName: string;
  price: number;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  clientSecret,
  courseId,
  courseName,
  price,
}: CheckoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-[2rem] shadow-2xl">
        <div className="bg-indigo-600 p-8 text-white relative">
          <DialogHeader>
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
                <BookOpen className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-black text-white">Enroll in Course</DialogTitle>
            <DialogDescription className="text-indigo-100 font-medium">
              You are enrolling in <span className="text-white font-bold">{courseName}</span>
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 bg-white">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              clientSecret={clientSecret}
              courseId={courseId}
              price={price}
              onSuccess={onClose}
            />
          </Elements>
        </div>
      </DialogContent>
    </Dialog>
  );
}
