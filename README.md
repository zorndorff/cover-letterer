# Generate cover letters for all the jobs

## Install dependencies
Node 18+ is required.
`npm i`

## Setup environment variables
`echo 'OPENAI_API_KEY={your open ai key here}' > .env`

## Run the script
Place your resume in `resume.txt` and the job description in `job.txt` and run the following command:

```bash
npx tsx -r dotenv/config src/cli.ts resume.txt job.txt
```

