import { useState } from "react";
import { getVideoInfo } from "../api/videoApi";
import InputBox from "../components/InputBox";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getVideoInfo(url);
      setVideo(res.data);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <InputBox url={url} setUrl={setUrl} onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {video && <VideoCard video={video} url={url} />}
    </div>
  );
};

export default Home;
