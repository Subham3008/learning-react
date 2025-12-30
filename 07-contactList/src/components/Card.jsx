const Card = (props) => {
  return (
    <div className="h-fit bg-white w-62.5 rounded-2xl p-1.5 relative flex flex-col gap-4 items-center">
      <div className="w-full">
        <img
          className="rounded-2xl h-[15vh] w-full"
          src="https://i.pinimg.com/736x/0b/81/7b/0b817b06ab120a4b6a768b39a479ab31.jpg"
          alt="img"
        />
      </div>
      <div className="bg-white h-25 w-25 rounded-full p-1.5 absolute top-15 left-18  shadow-xl/40">
        <img
          className="w-full h-full object-cover rounded-full"
          src={props.elem.imageUrl}
          alt="Image"
        />
      </div>
      <div className="text-black text-center flex flex-col gap-1 mt-13">
        <h2 className="text-xl font-bold">{props.elem.name}</h2>
        <p className="text-sm">{props.elem.role}</p>
        <p className="text-sm">{props.elem.description}</p>
      </div>
      <button
        onClick={() => {
          props.deleteHandler(props.idx);
        }}
        className="px-5 py-2 text-xl text-white active:scale-95 cursor-pointer bg-red-600 rounded-3xl w-fit font-semibold"
      >
        Remove
      </button>
    </div>
  );
};

export default Card;
