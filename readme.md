## Getting Started

### Prerequisites

- **Node.js** (v22 or higher)
- **OpenAI** API KEY

### 1. Install Dependencies

#### Frontend

```bash
cd client && npm install
```

#### Backend

```bash
cd server && npm install
```

# 2. Run the Application

You need start both the frontend and backend in different terminals from the root directory:

## Frontend

```Bash
npm run dev
```

## Backend

```Bash
npm run dev
```

# Objective

The goal of this system is to process uploaded documents and automatically structure their content in a way that supports ISO/IEC 27001 compliance analysis and control mapping.

# System Work Flow

Upload the PDF
The user uploads a PDF file through the application interface.

Parse the PDF
The uploaded file is parsed using the pdf-parse library to extract raw textual content.

Chunk the Extracted Data
The extracted text is divided into smaller chunks to ensure efficient processing and to stay within the LLM token limits.

Send Chunks to the LLM
Each chunk is sent to the LLM (OpenAI) along with a predefined master prompt.

Convert to Structured JSON
The LLM processes the content and converts it into the required JSON structure, which is then rendered on the UI.
