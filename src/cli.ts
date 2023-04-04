import { readFileSync } from 'fs';
import { resolve } from 'path';
import { doCoverLetter } from './coverletters/index.js';


export const run = async (resumeInputPath: string, jobInputPath: string): Promise<void> => {
  const resumeText = readFileSync(resolve(resumeInputPath), 'utf8');
  const jobText  = readFileSync(resolve(jobInputPath), 'utf8');

  const cover = await doCoverLetter(resumeText, jobText);
  console.log(cover);
}

(async () => {
  if (process.argv.length < 3) {
    console.log('Usage: node cli.js <resume_file.txt> <job_description.txt>');
    process.exit(1);
  }

  const resumeFile = process.argv[2];
  const jobFile = process.argv[3];

  console.log(`making a cover letter from ${resumeFile} and ${jobFile}`);

  await run(resumeFile, jobFile);
})();


