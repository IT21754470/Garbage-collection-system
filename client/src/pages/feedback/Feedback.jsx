import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import StarDisplay from "./StarDisplay";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);

  const [feed, setFeed] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [feedId, setFeedId] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/feed/allfeed`);
        const data = await res.json();

        if (res.ok) {
          setFeed(data.Feed);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/feed/deletee/${feedId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setFeed((prev) => prev.filter((feedback) => feedback._id !== feedId));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
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
      doc.text(20, yPos + 10, `Comment: ${feedback.Description}`);
      yPos += 25;
    });

    doc.save("feedback_report.pdf");
  };

  return (
    <div className="w-full md:w-[900px] px-4 mx-auto flex flex gap-3 bg-green-100">
      <div className="bg-white rounded-2xl mt-4 px-3 py-4 ">
        <div className="flex justify-between items-center mb-4 ">
          {currentUser?.isAdmin && (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={generatePDF}
            >
              Generate Report
            </button>
          )}
        </div>

     
        {currentUser && (
          <div className="flex justify-center mb-4"> {/* Flex with justify-center to center the button */}
            <Link to={"/Addfeedback"}>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Add Feedback
              </button>
            </Link>
          </div>
        )}

        {/* Feedback List */}
        <div className="flex flex-wrap justify-center gap-8  ">
          {feed.length > 0 ? (
            <>
              {feed.slice(0, showMore ? feed.length : 5).map((feedback) => (
                <div
                  key={feedback._id}
                  className="w-[300px] h-[250px] mt-10 rounded shadow-xl bg-green-100"
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{feedback.name}</div>
                    
                    <StarDisplay rate={feedback.rate} />
                    
                    <div className="text-gray-700 max-w-[200px] break-words">
                      {feedback.Description}
                    </div>

                    {currentUser?._id === feedback.currentId && (
                      <div className="flex justify-start gap-4 mt-8">
                        <Link to={`/update/${feedback._id}`}>
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                          >
                            Edit
                          </button>
                        </Link>
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
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

              {/* Show More Button */}
              {!showMore && feed.length > 5 && (
                <div className="w-full flex justify-center mt-8">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => setShowMore(true)}
                  >
                    Show More
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>No feedback found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
