import { useSelector } from "react-redux";

const About = () => {
  const aboutContent = useSelector((state) => state.about?.content || "Default about content");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">About Us</h1>
      <p className="text-lg mb-4">{aboutContent}</p>
      {/* Add more content and features as needed */}
    </div>
  );
};

export default About;
