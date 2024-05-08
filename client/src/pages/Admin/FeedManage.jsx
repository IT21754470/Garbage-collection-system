import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function FeedManage() {
  const [filteredData, setFilteredData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchDataAdmin();
    } else {
      fetchData();
    }
  }, []);

  const fetchDataAdmin = async () => {
    try {
      const fetchedData = await axios.get(`/api/post/gets/all`);
      const p = fetchedData.data;

      p.map((post) => {
        const responds = post.responds;
        post.yesValue = responds.filter((r) => r.value === true).length;
        post.noValue = responds.filter((r) => r.value === false).length;
        post.finalValue = post.yesValue > post.noValue;
      });

      setFilteredData(p);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchData = async () => {
    try {
      const fetchedData = await axios.get(
        `/api/post/getbyuser/${currentUser._id}`
      );
      const p = fetchedData.data;

      p.map((post) => {
        const responds = post.responds;
        post.yesValue = responds.filter((r) => r.value === true).length;
        post.noValue = responds.filter((r) => r.value === false).length;
        post.finalValue = post.yesValue > post.noValue;
      });

      setFilteredData(p);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    fetch(`/api/post/delete/${id}`, {
      method: "DELETE",
    });
    if (currentUser.isAdmin) {
      fetchDataAdmin();
    } else {
      fetchData();
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/feed/edit/${id}`;
  };

  return (
    <div className="w-full md:w-[1300px] px-4 mx-auto">
      <div className="bg-white-950 rounded-2xl mt-4 px-6 py-6">
        <h1 className="text-4xl font-bold text-center">Feeds</h1>
        <h5 className="text-2xl font-bold mb-4">
          Total Feeds: {filteredData.length}
        </h5>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 w-full rounded-md">
            <thead className="bg-yellow-300 text-slate-700">
              <tr>
                <th className="border px-4 py-1 ">Post Title</th>
                <th className="border px-4 py-1 ">Post Content</th>
                <th className="border px-4 py-1 ">Event Date</th>
                {currentUser.isAdmin && (
                  <>
                    <th className="border px-4 py-1 ">User Name</th>

                    <th className="border px-4 py-1 ">Yes Votes</th>
                    <th className="border px-4 py-1 ">No Votes</th>
                  </>
                )}
                <th className="border px-4 py-1 ">State</th>
                <th className="border px-4 py-1 ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((post) => (
                <tr key={post._id} className="bg-white">
                  <td className="border px-4 py-1">{post.title}</td>
                  <td className="border px-4 py-1">
                    {post.content.slice(0, 150)}...
                  </td>
                  <td className="border px-4 py-1">
                    {new Date(post.finalDate).toISOString().slice(0, 10)}
                  </td>
                  {currentUser.isAdmin && (
                    <>
                      <td className="border px-4 py-1">{post.user.username}</td>

                      <td className="border px-4 py-1">{post.yesValue}</td>
                      <td className="border px-4 py-1">{post.noValue}</td>
                    </>
                  )}
                  <td className="border px-4 py-1">{post.status}</td>
                  <td className="border px-4 py-1">
                    <button
                      className="bg-red-400 px-2 py-1 rounded-md text-white mr-2"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                    {currentUser.isAdmin === false && (
                      <button
                        className="bg-blue-400 px-2 py-1 rounded-md text-white"
                        onClick={() => handleEdit(post._id)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
