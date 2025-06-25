"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button"; // Sesuaikan dengan button kamu

const ReviewForm = ({ onSubmit }: { onSubmit: (rating: number, review: string) => void }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || review.trim() === "") return;
    onSubmit(rating, review);
    setRating(0);
    setReview("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Kirim Ulasan untuk Toko</h2>

      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button type="button" key={index} onClick={() => setRating(starValue)} onMouseEnter={() => setHover(starValue)} onMouseLeave={() => setHover(0)} className="focus:outline-none">
              <FaStar size={28} className={starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"} />
            </button>
          );
        })}
      </div>

      <textarea
        className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Tulis ulasanmu di sini..."
        rows={4}
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
        Kirim Ulasan
      </Button>
    </form>
  );
};

export default ReviewForm;
