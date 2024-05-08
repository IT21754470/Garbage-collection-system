import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function EditFeed() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [prviewImage, setPreviewImage] = useState(null);
  const [finalDate, setFinalDate] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const [postId, setPostId] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  console.log(currentUser);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("finalDate", finalDate);
    formData.append("location", location);
    formData.append("time", time);
    formData.append("image", image);

    try {
      const response = await fetch(`/api/post/update/${postId}`, {
        method: "PUT",
        body: formData,
      });
      await response.json();
      if (response.ok) {
        window.location.href = "/feeds";
      } else {
        alert("Error creating post");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating post");
    }
  };

  const fetchPost = async (postId) => {
    try {
      const fetchedData = await fetch(`/api/post/get/${postId}`);
      const p = await fetchedData.json();

      setTitle(p.title);
      setContent(p.content);
      setLocation(p.location);
      setTime(p.time);
      setFinalDate(p.finalDate.split("T")[0]);
      setPreviewImage(`http://localhost:3000/uploads/${p.image}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const postId = window.location.pathname.split("/")[3];
    setPostId(postId);
    fetchPost(postId);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="w-3/5 mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Feed</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
          <div className="mb-4 col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="finalDate"
            >
              Final Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="finalDate"
              type="date"
              name="finalDate"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="time"
            >
              Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              id="time"
              required
            />
          </div>

          <div className="mb-4 col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="Enter location"
            />
          </div>
          <div className="mb-4 col-span-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter description"
              name="description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image URL
            </label>
            <img
              src={prviewImage}
              alt="Event"
              className="w-64 h-44 object-cover rounded-md mb-2"
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              placeholder="Enter image URL"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-span-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
