import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import StarDisplay from "./StarDisplay"; // Import the new component

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);

  const [feed, setfeed] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [FeedId, setFeedId] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/feed/allfeed`);
        const data = await res.json();

        if (res.ok) {
          setfeed(data.Feed);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/feed/deletee/${FeedId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setfeed((prev) => prev.filter((feedback) => feedback._id !== FeedId));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    doc.setFontSize(16);
    doc.text(20, yPos, "Feedback Details:");
    yPos += 10;

    feed.forEach((feedback) => {
      doc.setFontSize(12);
      doc.text(20, yPos, `Name: ${feedback.name}`);
      doc.text(20, yPos + 5, `Rate: ${feedback.rate}`);
      doc.text(20, yPos + 10, `comment: ${feedback.Description}`);
      yPos += 25;
    });

    doc.save("feedback_report.pdf");
  };

  return (
    <div>
      <div>
        <div className="flex justify-center items-center">
          {currentUser?.isAdmin && (
            <button
              className="hidden sm:inline hover:underline bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={() => generatePDF()}
            >
              Generate Report
            </button>
          )}
          {currentUser && (
            <div className="flex justify-center items-center gap-2">
              <Link to={"/Addfeed"}>
                <button
                  className="hidden sm:inline hover:underline bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Add Feedback
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            {feed.length > 0 ? (
              <>
                {feed.slice(0, showMore ? feed.length : 5).map((feedback) => (
                  <div
                    key={feedback._id}
                    className="w-[300px] h-[250px] mt-10 mb-40 rounded shadow-xl"
                  >
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{feedback.name}</div>
                      
                      <StarDisplay rate={feedback.rate} /> {/* Display stars */}
                      
                      <div className="text-gray-700 max-w-[200px] break-words">
                        {feedback.Description}
                      </div>

                      {currentUser?._id === feedback.currentId && (
                        <div className="flex justify-center gap-8 mt-8">
                          <Link to={`/update/${feedback._id}`}>
                            <button
                              className="hidden sm:inline bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            className="hidden sm:inline bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => {
                              setFeedId(feedback._id);
                              handleDeleteUser();
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {!showMore && feed.length > 5 && (
                  <div className="mt-4 md:hidden sm:hidden lg:block mb-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                      onClick={() => setShowMore(true)}
                    >
                      Show More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>You have no feedback yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
