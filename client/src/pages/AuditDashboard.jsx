import { useState } from "react";

export default function AuditDashboard({ data }) {
  
  const [activeSection, setActiveSection] = useState(data[0]?.heading);
  const [answers, setAnswers] = useState({});

  console.log(answers);

  const handleAnswer = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const currentSection = data.find(
    (section) => section.heading === activeSection,
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r">
        <div className="p-4 font-bold text-lg border-b">
          Assessment Sections
        </div>

        {data.map((section) => (
          <div
            key={section.heading}
            onClick={() => setActiveSection(section.heading)}
            className={`px-4 py-3 cursor-pointer hover:bg-gray-100 transition 
              ${
                activeSection === section.heading
                  ? "bg-blue-50 border-l-4 border-blue-500 font-semibold"
                  : ""
              }`}
          >
            {section.heading}
          </div>
        ))}
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {currentSection && (
          <>
            <h1 className="text-2xl font-bold mb-6">
              {currentSection.heading}
            </h1>

            {currentSection.subheadings.map((sub) => (
              <div key={sub.title} className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">
                  {sub.title}
                </h2>

                <div className="space-y-4">
                  {sub.questions.map((question) => (
                    <div
                      key={question}
                      className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center"
                    >
                      <span className="max-w-xl text-sm text-gray-800">
                        {question}
                      </span>

                      <div className="flex gap-4">
                        <button
                          onClick={() => handleAnswer(question, "Yes")}
                          className={`px-4 py-1 rounded-full text-sm border 
                            ${
                              answers[question] === "Yes"
                                ? "bg-green-500 text-white border-green-500"
                                : "border-gray-300 hover:bg-green-50"
                            }`}
                        >
                          Yes
                        </button>

                        <button
                          onClick={() => handleAnswer(question, "No")}
                          className={`px-4 py-1 rounded-full text-sm border 
                            ${
                              answers[question] === "No"
                                ? "bg-red-500 text-white border-red-500"
                                : "border-gray-300 hover:bg-red-50"
                            }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
