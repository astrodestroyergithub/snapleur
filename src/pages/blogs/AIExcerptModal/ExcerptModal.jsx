import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../components/Spinner/LoadingSpinner";
import { setExcerpt, setQuestionNo } from "../../../store/gkSlice";
import { GoogleGenAI } from "@google/genai";
import "./ExcerptModal.scss";
import LanguageIcon from "@mui/icons-material/Language";

export default function ExcerptModal({
  gks,
  startingNo,
  endingNo,
  visible,
  onClose
}) {
  const [isValid, setIsValid] = useState(null); 
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { excerpt, questionNo, selectedGKsInfo } = useSelector((state) => state.gk);

  const validate = (value) => {
    const num = Number(value);

    if (
      !Number.isInteger(num) ||
      num < startingNo ||
      num > endingNo
    ) {
      setIsValid(false);
      return false;
    }

    setIsValid(true);
    dispatch(setQuestionNo(num));
    const validQuestion = selectedGKsInfo.find((gk) => Number(gk.qno) === num).ques.split('\n')[0];
    dispatch(setExcerpt(validQuestion));
    return true;
  };

  const handleInput = (e) => {
    const value = e.target.value;
    validate(value);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);

    const prompt = 
    `#**Role:** You are the best newspaper editor in the world who is extremely proficient in finding out citations and various resources for any given paragraph or excerpt or question from anywhere, be it from any newspaper portal, blog article, social media post, newsletter, magazine, etc. You hold an experience in this field for 20+ years and are an extremely learned scholar. You always cross check your findings and make it clear that they are 100 authentic and to the point. You don’t believe in exaggeration and maintain a clean, clear and unbiased ideology throughout. You especially excel in citing reliable resources, web-links, etc. present on the web for any general knowledge question.

    #**Objective:** Your task is to find any valid mention of a given general awareness question on the web which is presented to you. You should try your very best to come up with mentionable information, resource links, etc. pertaining to the question given. The citation should be trustworthy and not vague or used by any miscreant to spread misinformation. You should be particularly careful about the authenticity of your findings. You should also answer the general-knowledge question with the most recent, reliable, and relevant information available at the time of the request. While coming up with the response take help of the below instructions whenever you feel stuck. Be concise and upfront. 

    #**Instructions:**

    ##**Instruction 1:** Perform a fresh web search. Provide:
    1. A clear, accurate answer.
    2. 3–7 high-quality citations, including news articles, reputable blogs, academic sources, or organizational reports.
    3. Direct links to the sources (no link shorteners).
    4. For each citation, include:
    a. Title of the article 
    b. Source/Publisher 
    c. Publication date 
    d. URL 
    e. 1–2 sentences explaining why the source is relevant
    5. Prioritize the most recent and authoritative sources (within the past 12–24 months unless older sources are necessary).
    6. Avoid paywalled content unless it is from a highly authoritative source.
    7. If conflicting information exists, explain the differences briefly.

    ##**Instruction 2:** Here is the question:
    ${excerpt}
    
    ##**Instruction 3:** Output Formula: 
    a. Final Answer (2–4 sentences) (followed by an empty line)
    b. Citations (labeled and numbered, each with metadata and link) (followed by an empty line)
    c. Notes on recency or source reliability if relevant (followed by an empty line)
    
    ##**Instruction 4:** Consider the following points for response formatting and beautification:
    1. Properly format the response and press a enter/return for a new line wherever necessary.
    2. Whenever there is a table to be displayed, make sure to properly align the columns and rows.
    3. The response should not exceed 22 lines in total.`; 

    /* const prompt = `You are an expert newspaper editor with over 20 years of experience in finding accurate, unbiased, and authentic citations from trusted web sources such as news portals, blogs, magazines, newsletters, and social media. Your task is to answer a given general-awareness question and locate valid, trustworthy online mentions related to it. You must always cross-check information, avoid exaggeration, and ensure that every citation is reliable and precise. For the given query text, perform a fresh web search and provide a clear answer along with 3–7 authoritative citations containing titles, publishers, dates, direct URLs, and short relevance notes. Prioritize recent, reputable, non-paywalled sources, and briefly explain any conflicts in available information. Your final output must follow the required structure: concise answer, citations with metadata, and optional notes on recency or reliability. Format the response cleanly, align tables properly if used, and ensure the entire output stays within 22 lines. The query text is given below:
    ${excerpt}`; */

    /* let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "openai/gpt-oss-20b:free",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "reasoning": {"enabled": true}
        })
    });
    const result = await response.json();
    response = result.choices[0].message.content.trim();
    setApiResponse(response);
    setIsLoading(false); */

    const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });

    async function getGeminiResponse() {
    const geminiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return geminiResponse.text;
    }

    let response = getGeminiResponse()
    .then(message => {
        setApiResponse(message);
        console.log("Message: ", message);
        setIsLoading(false);
    })
    .catch(error => {
        console.log("Error Message: ", error);
        setApiResponse(`There is some error. ${error}`);
        setIsLoading(false);
    });
  };

  return (
    <>
        {visible && (<div className="ai-excerpt-modal-overlay">
            <div className="ai-excerpt-modal-container">
                <button className="ai-excerpt-modal-close-btn" onClick={onClose}>
                ✕
                </button>

                <>{!apiResponse && <><h2 className="ai-excerpt-modal-title">Excerpt Insight</h2>

                    <p className="ai-excerpt-modal-box">{excerpt}</p>

                    <label className="ai-excerpt-modal-label-title">
                    Enter a Question Number
                    </label>

                    <input
                    type="text"
                    className="ai-excerpt-modal-question-input"
                    value={questionNo}
                    onChange={handleInput}
                    placeholder={`Between ${startingNo} - ${endingNo}`}
                    />

                    {isValid === false && (
                    <p className="ai-excerpt-modal-error-text">Please enter a valid question number.</p>
                    )}

                    {isValid === true && (
                    <p className="ai-excerpt-modal-success-text">
                        Click on the button below to get more info on the selected excerpt.
                    </p>
                    )}

                    {isValid && (
                    <button className="ai-excerpt-modal-cite-btn" onClick={handleButtonClick}>
                        <LanguageIcon className="ai-excerpt-modal-cite-icon" />
                        Cite Resources
                    </button>
                )}</>}</>

                {apiResponse && (
                <div className="ai-excerpt-modal-response-box">
                    <h3>AI Response</h3>
                    <p
                    dangerouslySetInnerHTML={{
                        __html: apiResponse.replace(/\n/g, "<br />")
                    }}
                    ></p>
                </div>
                )}
            </div>
        </div>)}
        <LoadingSpinner visible={isLoading} />
    </>
  );
}
