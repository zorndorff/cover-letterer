

import { ConversationChain, LLMChain } from "langchain/chains";
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models";


export async function doCoverLetter(resume: string, jobDescription: string) {
  const chat = new ChatOpenAI();

  const jobDescriptionPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `You are a helpful bot that can generate succint, informative summaries of job descriptions.`
    ),
    HumanMessagePromptTemplate.fromTemplate("Summarize {input}"),
  ]);


  const jobSummaryChain = new LLMChain({
    prompt: jobDescriptionPrompt,
    llm: chat,
  });

  const {text: jobSummary } = await jobSummaryChain.call({
    input: jobDescription,
  });

  //console.log('job summary', JSON.stringify(jobSummary));

  const resumeSummaryPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `You are a helpful bot that can generate succint, informative resume summaries.`
    ),
    HumanMessagePromptTemplate.fromTemplate("Summarize {input}"),
  ]);

  const resumeSummaryChain = new LLMChain({
    prompt: resumeSummaryPrompt,
    llm: chat,
  });
  
  const { text: resumeSummary } = await resumeSummaryChain.call({
    input: resume,
  });
  //console.log('resume summary', resumeSummary);

  const coverLetterPromt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `You are a helpful bot that can generate cover letters based on provided job and resume summaries.`
    ),
    HumanMessagePromptTemplate.fromTemplate(`
    You are a job seeker who's experience, resume can be summarized as follows:
    {resume_summary}
    You are attempting to apply to a position with the following description:
    {job_summary}
    Write an attractive and engaging cover letter describing why your experience makes you an ideal candidate for the position. Do not repeat any part of your resume or the job description verbatim. Focus on connecting specific experience with requirements of the position. If there are no connections to be made, focus on how your soft skills may apply.`),
  ]);

  const coverLetterChain = new LLMChain({
    prompt: coverLetterPromt,
    llm: chat,
  });

  const { text: coverLetter } = await coverLetterChain.call({
    resume_summary: resumeSummary,
    job_summary: jobSummary,
  });
  
  return `COVER LETTER:
${coverLetter}
  `;
}