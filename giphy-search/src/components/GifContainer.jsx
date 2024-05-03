function GifContainer({ gifs }) {
  // console.log(gifs[0].data[0].images.original.url)
  if (!gifs || !Array.isArray(gifs)) {
    return <div>No GIFs found.</div>;
  }

  /* FEEDBACK: Nice job with this, however it is a best practice
    to use the gif's id property as the key instead of an index. the
    index is fine but it can lead to some issues if the array size
    ever changes. 
    
    Also, for the alt, use the `gif.title`
    */

  console.log(gifs);

  return (
    <ul>
      {gifs[0]?.data.map((gif, index) => (
        <li key={gif.id}>
          <img src={gif.images.original.url} alt={`${gif.title}`} />
        </li>
      ))}
    </ul>
  );
}

export default GifContainer;
