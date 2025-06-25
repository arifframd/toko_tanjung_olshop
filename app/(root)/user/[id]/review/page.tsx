"use client";
import ReviewForm from "@/components/reviewUsers";
import { createReviewUser } from "@/lib/actions";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const handleReviewSubmit = async (rating: number, review: string) => {
    console.log("Rating:", rating, "Review:", review);
    // TODO: Panggil API POST ke backend
    try {
      const res = await createReviewUser(id, rating, review);
      if (res.message) {
        toast.success(res.message || "Ulasan berhasil dikirim");
      } else {
        toast.success("nggk ada pesan");
      }
    } catch (err) {
      toast.error("Gagal mengirim ulasan");
      console.log("Gagal mengirim review ", err);
    }
  };
  return (
    <>
      <ReviewForm onSubmit={handleReviewSubmit} />
    </>
  );
};

export default Page;
