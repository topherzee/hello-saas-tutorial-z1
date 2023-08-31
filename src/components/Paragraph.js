const Paragraph = ({ richText }) => (
  <p className="Paragraph" dangerouslySetInnerHTML={{ __html: richText }} />
);

export default Paragraph;
