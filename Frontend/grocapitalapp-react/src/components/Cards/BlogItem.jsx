const BlogItem = (props) => {
  return (
    <div className="blog-item-wrapper" onClick={() => props.onclick(props.id)}>
      <article className="text" style={{ paddingTop: 0 }}>
        <h2>{props.heading}</h2>
      </article>
      <div className="blog-item">
        <img className="blog-img" src={props.image} alt={props.heading} />
        <div className="blog-desc">{props.description}</div>
      </div>
    </div>
  );
};

export default BlogItem;
