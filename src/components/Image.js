const Image = ({ image }) => {
  const link = image && image["@link"];
  return link && <img className="Image" src={link} alt="Etiam Purus" />;
};

export default Image;
