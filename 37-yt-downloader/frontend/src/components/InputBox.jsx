const InputBox = ({ url, setUrl, onSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Paste URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={onSearch}>Download</button>
    </div>
  );
};

export default InputBox;
