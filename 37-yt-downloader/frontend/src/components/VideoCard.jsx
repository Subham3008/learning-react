import QualityList from "./QualityList";

const VideoCard = ({ video, url }) => {
  return (
    <div>
      <img src={video.thumbnail} width="200" />
      <h3>{video.title}</h3>
      <QualityList qualities={video.qualities} url={url} />
    </div>
  );
};

export default VideoCard;
