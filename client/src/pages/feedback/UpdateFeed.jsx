import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "./StarRating";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const { feedbackId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rate: rating,
    }));
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`/api/feed/allfeed?FeedbackId=${feedbackId}`);
        if (res.ok) {
          const data = await res.json();
          const feedback = data.Feed.find((f) => f._id === feedbackId);
          if (feedback) {
            setFormData(feedback);
          }
        } else {
          throw new Error("Failed to fetch feedback");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchFeedback();
  }, [feedbackId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/feed/updatee/${feedbackId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate("/feed");
      } else {
        const data = await res.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the feedback.");
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="max-w-3xl mx-auto flex-col gap-5 p-3">
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <h3 className="font-semibold text-slate-400">Name</h3>
            <input
              className="bg-slate-100 p-3 rounded-lg"
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-slate-400">Rate</h3>
            <StarRating
              rating={formData.rate || 0}
              onRatingChange={handleRatingChange}
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-slate-400">Description</h3>
            <textarea
              className="bg-slate-100 p-3 rounded-lg w-full"
              id="Description"
              placeholder="Description"
              maxLength={100}
              value={formData.Description || ""}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-700 text-white p-3 rounded-lg hover:opacity-90"
          >
            Update
          </button>

          {/* Error Message */}
          {errorMessage && (
            <p className="mt-5 text-red-600 bg-red-300 p-2 rounded-lg text-center">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
