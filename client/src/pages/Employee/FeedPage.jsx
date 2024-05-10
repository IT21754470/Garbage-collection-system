import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TimerView from "../../Components/Timer";

export default function FeedPage() {
  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchPosts("inactive");
    } else {
      fetchPosts("active");
    }
  }, []);
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (tag) => {
    try {
      const fetchedData = await axios.get(`/api/post/gets/${tag}`);
      const p = fetchedData.data;

      p.map((post) => {
        const responds = post.responds;
        post.isResponded = responds.find((r) => r.user === currentUser._id);
        post.yesValue = responds.filter((r) => r.value === true).length;
        post.noValue = responds.filter((r) => r.value === false).length;
        post.finalValue = post.yesValue > post.noValue;
      });

      setPosts(p);
      console.log(posts);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePendingPosts = () => {
    fetchPosts("inactive");
  };

  const handleOK = (id) => {
    fetch(`/api/respond/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: id, value: true, user: currentUser }),
    });
    fetchPosts("active");
  };

  const handleNO = (id) => {
    fetch(`/api/respond/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: id, value: false, user: currentUser }),
    });
    fetchPosts("active");
  };

  const handleAccept = (id) => {
    fetch(`/api/post/updateState/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: id, status: "active" }),
    });
    fetchPosts("active");
  };

  const handleReject = (id) => {
    fetch(`/api/post/delete/${id}`, {
      method: "DELETE",
    });
    fetchPosts("active");
  };

  const getTheDate = (fd, ft) => {
    let finalDate = new Date(new Date(fd).getTime() - 24 * 60 * 60 * 1000);
    let finalTime = ft.split(":");

    finalDate.setHours(finalTime[0]);
    finalDate.setMinutes(finalTime[1]);
    console.log(finalDate);
    console.log(new Date());
    return finalDate;
  };

  return (
    <div className="bg-gradient-to-r from-[#bfefae] via-[#d8e4d3] to-[#dbecd7] menu-background">
      <div className="section-container p-4">
        <div className="flex justify-between items-center w-full mx-auto bg-white p-4 shadow-md rounded-lg mb-4">
          <div className="section-title">Community Feed</div>
          <div className="flex">
            {currentUser.isAdmin == true ? (
              <>
                <button
                  onClick={handlePendingPosts}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Pending Posts
                </button>
              </>
            ) : (
              <a
                href="/feedmanage"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded block mr-4"
              >
                My Posts
              </a>
            )}
            <a
              href="/addfeed"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded block"
            >
              Add New Post
            </a>
          </div>
        </div>
        <div
          className="m-h-[500px] overflow-scroll grid grid-cols-1 lg:grid-cols-2 gap-4"
          style={{ height: "calc(100vh - 220px)" }}
        >
          {posts.map((post) => (
            <>
              {post.status === "active" &&
                currentUser.isAdmin == false &&
                new Date(getTheDate(post.finalDate, post.time)) >
                  new Date() && (
                  <div className="w-full mx-auto h-full" key={post._id}>
                    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
                      <div className="">
                        <div>
                          <h2 className="font-semibold text-lg">
                            {post.title}
                          </h2>
                          <p className="text-gray-600">{post.content}</p>
                        </div>
                      </div>
                      <p className="mb-5">
                        {new Date(post.finalDate).toISOString().slice(0, 10)}
                      </p>
                      <img
                        src={`http://localhost:3000/uploads/${post.image}`}
                        alt="Feed Image"
                        className="w-full object-cover h-80"
                      />
                      <div className="flex justify-between mt-4">
                        <button
                          disabled={post.isResponded}
                          style={{
                            cursor: post.isResponded
                              ? "not-allowed"
                              : "pointer",
                            backgroundColor: post.isResponded ? "gray" : "blue",
                          }}
                          className=" text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleOK(post._id)}
                        >
                          Attending [{post.yesValue}]
                        </button>
                        <TimerView
                          fd={post.finalDate}
                          ft={post.time}
                          id={post._id}
                        />
                        <button
                          disabled={post.isResponded}
                          style={{
                            cursor: post.isResponded
                              ? "not-allowed"
                              : "pointer",
                            backgroundColor: post.isResponded ? "gray" : "red",
                          }}
                          className=" text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleNO(post._id)}
                        >
                          Not Attending [{post.noValue}]
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              {currentUser.isAdmin == true && post.status !== "active" && (
                <div className="w-2/5 mx-auto h-full" key={post._id}>
                  <div className="bg-white p-4 shadow-md rounded-lg mb-4">
                    <div className="">
                      <div>
                        <h2 className="font-semibold text-lg">{post.title}</h2>
                        <p className="text-gray-600">{post.content}</p>
                      </div>
                    </div>
                    <p className="mb-5">
                      {new Date(post.finalDate).toISOString().slice(0, 10)}
                    </p>
                    <img
                      src={`http://localhost:3000/uploads/${post.image}`}
                      alt="Feed Image"
                      className="w-full object-cover"
                    />
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleAccept(post._id)}
                      >
                        Accepet
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleReject(post._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
