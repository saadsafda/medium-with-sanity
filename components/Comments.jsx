const Comments = ({ array }) => {
  return (
    <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2 rounded">
      {array.map((comment, i) => {
        return (
          <div key={i}>
            <p>
              <span className="text-yellow-500">{comment.name}:</span>
              {comment.comment}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
