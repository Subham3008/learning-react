const QualityList = ({ qualities, url }) => {
  return (
    <div>
      {qualities.map((q, i) => (
        <a
          key={i}
          href={`http://localhost:5000/api/video/download?url=${url}&itag=${q.itag}`}
        >
          <button>{q.quality}</button>
        </a>
      ))}
    </div>
  );
};

export default QualityList;
