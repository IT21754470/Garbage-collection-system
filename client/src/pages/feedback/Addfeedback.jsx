import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StarRating from "./StarRating";


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleStarRatingChange = (rating) => {
    setFormData({ ...formData, rate: rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rate || !formData.Description) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
      const Feedadd = {
        currentId: currentUser._id,
        ...formData,
      };

      setErrorMessage(null);

      const res = await fetch("/api/feed/Fcreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Feedadd),
      });

      if (res.ok) {
        navigate("/feed");
      } else {
        const data = await res.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Name</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Name"
                id="name"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <h3 className="font-semibold text-slate-400 ml-1">Rate</h3>
              <StarRating
                rating={formData.rate || 0}
                onRatingChange={handleStarRatingChange}
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Description</h3>
              <textarea
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-32 resize-none"
                placeholder="Description"
                id="Description"
                onChange={handleChange}
                maxLength={100}
              />
            </div>

            <button
              className="bg-blue-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
            >
              Submit
            </button>

            {errorMessage && (
              <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
