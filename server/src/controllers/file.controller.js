// import { dummyData } from "../constant/constant.js";
import { generateDocJsonWithOpenAI } from "../services/openai.service.js";
import { readPdf } from "../services/pdf.service.js";
import { chunkText } from "../utils/utils.js";

const pdfUpload = async (req, res) => {
  const openAIApiKey = req.body.apiKey;

  if (!openAIApiKey) {
    return res.status(400).json({
      success: false,
      message: "Api key is required !",
    });
  }

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    console.log("file uploaded ( pdf )");
    console.log({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });

    const pdfText = await readPdf(req.file.path);
    const pdfTextChunks = chunkText(pdfText, 9000);

    const finalOutline = [];
    for (const chunk of pdfTextChunks) {
      const result = await generateDocJsonWithOpenAI(chunk, openAIApiKey);
      const parsed = JSON.parse(result);
      finalOutline.push(...parsed);
    }

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: finalOutline,
      // data:dummyData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  pdfUpload,
};
