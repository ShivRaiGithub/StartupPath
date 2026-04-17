# StartPath

StartPath is a curated directory of startup opportunities worldwide, including fellowships, accelerators, incubators, and grants.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Project Structure

- `app/`: Routes and pages
- `components/`: Reusable UI components
- `lib/programs.ts`: Startup program source data

## How To Contribute

To add a startup program, you only need to update `lib/programs.ts` and open a pull request.

1. Fork this repository.
2. Create a new branch.
3. Add or update program entries in `lib/programs.ts`.
4. Ensure the app runs locally:

```bash
npm run dev
```

5. Commit your changes.
6. Open a PR against this repository:

https://github.com/ShivRaiGithub/StartupPath

## Program Entry Notes

When adding a program in `lib/programs.ts`, keep data consistent with the existing schema:

- Use a unique `id`.
- Keep `type` and `status` within the allowed union values.
- Fill required fields (`name`, `org`, `region`, `focus`, `deadline`, etc.).
- Keep descriptions and perks concise and useful.

## Pull Request Checklist

- The new or updated program appears correctly on the site.
- No TypeScript or lint errors were introduced.
- The PR clearly describes what was added or changed.
