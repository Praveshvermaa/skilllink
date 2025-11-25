"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { createBooking } from "@/app/bookings/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function BookingForm({
  skillId,
  providerId,
  price,
}: {
  skillId: string;
  providerId: string;
  price: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (formData: FormData) => {
    setError(null);

    startTransition(async () => {
      try {
        await createBooking(formData);
        toast.success("Booking created successfully!");
      } catch (e: any) {
        if (e?.message === "NEXT_REDIRECT") return;

        setError(e.message || "Something went wrong");
        toast.error("Booking failed!");
      }
    });
  };

  return (
    <motion.form
      action={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Hidden Fields */}
      <input type="hidden" name="skillId" value={skillId} />
      <input type="hidden" name="providerId" value={providerId} />

      {/* Date & Time */}
      <div className="space-y-2">
        <Label htmlFor="date" className="font-medium">
          Date & Time <span className="text-destructive">*</span>
        </Label>
        <Input
          id="date"
          name="date"
          type="datetime-local"
          required
          className="rounded-xl"
        />
      </div>

      <Separator className="my-4" />

      {/* Price Section */}
      <div className="space-y-4">
        <div className="flex justify-between font-semibold text-base">
          <span>Total Price</span>
          <span className="text-primary font-bold">₹{price}</span>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl"
        >
          {isPending ? "Booking..." : "Book Now"}
        </Button>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="text-center text-sm text-red-500 font-medium"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
