import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        About This Homepage
      </h1>
      <p className="text-lg mb-6">
        Welcome to our dynamic homepage, designed to provide you with a variety
        of helpful tools and features. Our goal is to enhance your experience
        with intuitive and accessible solutions. Here’s a brief overview of what
        you can find:
      </p>

      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Chatbot</h2>
          <p className="text-base mb-4">
            Engage with our intelligent chatbot for instant assistance. Whether
            you have questions or need guidance, the chatbot is here to help.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
          <p className="text-base mb-4">
            Explore our Frequently Asked Questions section to find quick answers
            to common queries. It's a great resource for getting up to speed.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Translate</h2>
          <p className="text-base mb-4">
            Use our translation tool to overcome language barriers and
            communicate effectively in different languages.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Demo</h2>
          <p className="text-base mb-4">
            Check out our demo section to get a feel for what we offer. It's a
            hands-on way to experience our services before diving in.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-base mb-4">
            Learn more about the purpose and mission of our homepage. We're
            committed to providing valuable tools and information to enhance
            your experience.
          </p>
        </div>
      </div>

      <div className="text-center mt-10">
        <p className="text-lg">
          Thank you for visiting! We hope you find our homepage useful and
          engaging. If you have any questions or feedback, please feel free to
          reach out.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
