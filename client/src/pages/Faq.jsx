import { useEffect, useState } from "react";

function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    fruitType: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editFaqId, setEditFaqId] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(
          "https://fruits-ai-t66l.onrender.com/faqs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }
        const data = await response.json();
        setFaqs(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedFaqData = {
        question: formData.question,
        answer: formData.answer,
        fruit_type: formData.fruitType,
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch(
          `https://fruits-ai-t66l.onrender.com/update_faq/${editFaqId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFaqData),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        const data = await response.json();
        if (response.ok) {
          console.log("FAQ updated successfully:", data);
          alert("FAQ updated successfully!");
          setIsModalOpen(false);
          setIsEditing(false);
          setFaqs(faqs.map((faq) => (faq._id === editFaqId ? data : faq)));
        } else {
          console.error("Error updating FAQ:", data);
          alert("Error: " + data.error);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          alert("Request timed out. Please try again.");
        } else {
          console.error("Error:", error);
          alert("Failed to update FAQ. Please try again.");
        }
      }
    } else {
      const faqData = {
        question: formData.question,
        answer: formData.answer,
        fruit_type: formData.fruitType,
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch("https://fruits-ai-t66l.onrender.com/add_faq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(faqData),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();
        if (response.ok) {
          console.log("FAQ added successfully:", data);
          alert("FAQ added successfully!");
          setIsModalOpen(false);
        } else {
          console.error("Error adding FAQ:", data);
          alert("Error: " + data.error);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          alert("Request timed out. Please try again.");
        } else {
          console.error("Error:", error);
          alert("Failed to add FAQ. Please try again.");
        }
      }
    }
  };

  const handleEditClick = (faq) => {
    setIsEditing(true);
    setEditFaqId(faq._id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      fruitType: faq.fruit_type,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`https://fruits-ai-t66l.onrender.com/delete_faq/${id}`, {
        method: "DELETE",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        console.log("FAQ deleted successfully");
        alert("FAQ deleted successfully!");
        setFaqs(faqs.filter((faq) => faq._id !== id));
      } else {
        const data = await response.json();
        console.error("Error deleting FAQ:", data);
        alert("Error: " + data.error);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        alert("Request timed out. Please try again.");
      } else {
        console.error("Error:", error);
        alert("Failed to delete FAQ. Please try again.");
      }
    }
  };

  return (
    <main className="h-screen bg-gradient-to-r from-pink-400 to-blue-300 overflow-y-auto px-auto  py-10 flex">
      <h1 className="absolute top-0 mb-4 text-5xl text-center text-white bg-black p-4 w-screen">FAQ Section</h1>
      <div className="flex-1 flex justify-center items-center ">
        <div className="h-full w-full mx-auto md:mx-12 lg:mx-24 xl:mx-44 2xl:mx-60 flex flex-col p-4 ">
          
          <button
            className="h-8 text-black mx-10 my-10 py-1 mb-6 bg-orange-300 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-blue-300 hover:text-white "
            onClick={() => setIsModalOpen(true)}
          >
            Add a FAQ
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
                <h2 className="text-2xl mb-4 font-semibold">Add FAQ</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      name="question"
                      value={formData.question}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Answer
                    </label>
                    <input
                      type="text"
                      name="answer"
                      value={formData.answer}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Fruit Type
                    </label>
                    <select
                      name="fruitType"
                      value={formData.fruitType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a fruit</option>
                      <option value="apple">Apple</option>
                      <option value="banana">Banana</option>
                      <option value="orange">Orange</option>
                      <option value="grape">Grape</option>
                    </select>
                  </div>

                  <div className="flex">
                    <button
                      type="button"
                      className="mr-4 flex-1 px-4 py-1 bg-red-400 rounded-md text-black hover:text-white hover:bg-red-300"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 flex-1 py-1 bg-green-500 text-black hover:text-white rounded-md hover:bg-green-400"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isLoading ? (
            <p>Loading FAQs...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className=" w-full">
              {faqs.length > 0 ? (
                faqs.map((faq) => (
                  <li
                    key={faq._id}
                    className="bg-white p-2 mb-4 flex flex-col gap-4 rounded-lg"
                  >
                    <div className="flex gap-4">
                      <img
                        src={
                          faq.fruit_type == "apple"
                            ? "/apple.jpg"
                            : faq.fruit_type == "banana"
                            ? "/banana.jpeg"
                            : faq.fruit_type == "orange"
                            ? "/orange.jpg"
                            : "/grape.jpg"
                        }
                        className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover rounded-full self-center"
                      />
                      <div>
                        <p className="font-bold text-red-500">{faq.question}</p>
                        <p className="text-blue-500">{faq.answer}</p>
                      </div>
                    </div>

                    <div className="flex">
                      <button
                        type="button"
                        className="mr-4 flex-1 px-4 py-1 bg-blue-400 rounded-md text-black hover:text-white hover:bg-blue-300"
                        onClick={() => handleEditClick(faq)}
                      >
                        Update
                      </button>
                      <button
                        type="submit"
                        className="px-4 flex-1 py-1 bg-red-500 text-black hover:text-white rounded-md hover:bg-red-400"
                        onClick={() => handleDelete(faq._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p>No FAQs available.</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}

export default Faq;
