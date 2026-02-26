import { useRef, useState } from "react";

import "./App.css";
import AuditDashboard from "./pages/AuditDashboard";
import apiServices from "./api/api";
import { endPoints } from "./api/endpoint";

function App() {
  const [pdf, setPdf] = useState(null);
  const [openAiApiKey, setOpenAiApiKey] = useState("");
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleInputOpen = () => {
    inputRef.current.click();
  };
  const handleOnChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    if (!pdf) return alert("Please select a PDF first");
    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("apiKey", openAiApiKey);

    try {
      const res = await apiServices.uploadFile(endPoints.uploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Success:", res);
      setPdfData(res.data.data);
      setLoading(false);
      alert("Upload Successful!");
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(error.response.data.message || "Upload failed. Check console.");
    }
  };
  console.log(pdf);

  return (
    <div className="w-full h-screen">
      {pdfData ? (
        <AuditDashboard data={pdfData} />
      ) : (
        <div className="w-full h-[50%] bg-blue-100 p-8 flex flex-col gap-4  items-start ">
          <h1 className="text-2xl font-semibold ">
            Enter your OpenAI API's Key
          </h1>
          <textarea
            value={openAiApiKey}
            onChange={(e) => {
              setOpenAiApiKey(e.target.value);
            }}
            type="text"
            className="w-[70%] h-16  p-4 border rounded-2xl border-gray-600 "
          />
          <h1 className="text-2xl font-semibold ">Upload your PDF.</h1>
          <button
            onClick={handleInputOpen}
            className="py-2 px-4 rounded-lg bg-blue-500 text-white  font-semibold cursor-pointer"
          >
            Upload
          </button>
          <input
            onChange={handleOnChange}
            ref={inputRef}
            type="file"
            className=" hidden "
          />

          {pdf && (
            <button
              onClick={handleSubmit}
              className="py-2 px-4 rounded-lg bg-blue-500 text-white  font-semibold cursor-pointer"
            >
              {loading ? "Loading..." : "Submit pdf"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
