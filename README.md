# Git Workflow Assistant

Generate better **commit messages**, **branch names**, and **pull request titles** from a simple task list and technical context.

Built by [PaniKaz](https://github.com/Pani-Kaz).

## About the project

Git Workflow Assistant was created from a real internal pain point:

our team needed to keep a consistent standard for commit messages across the company.

Inside our workflow, tasks are usually organized as a simple list. Because of that, the process became very straightforward:

- copy the task list
- add technical notes or implementation details
- generate polished suggestions for:
  - commit messages
  - branch names
  - pull request titles

That is the core idea behind this project.

Instead of wasting time rewriting the same context over and over, the app transforms raw development notes into clean Git artifacts that are easier to read, review, and maintain.

## Why this exists

Good commit history is one of those things every team wants, but very few teams manage to keep consistent over time.

Common problems:

- vague commit messages
- inconsistent branch naming
- pull requests with weak titles
- too much manual rewriting
- no shared writing standard across the team

This app solves that by giving developers a faster and more consistent workflow.

## How it works

The user describes what changed.

Usually that means:

- pasting a task list
- adding technical comments
- optionally choosing the output language

Then the app generates multiple suggestions for:

- commit messages
- branch names
- pull request titles

## Core flow

1. Open the generator
2. Paste your task list or change summary
3. Add technical context if needed
4. Choose what you want to generate
5. Pick the output language
6. Generate suggestions
7. Copy the result you want

## Example input

```text
- created generator result cards
- added copy command action
- implemented API key dialog
- adjusted navbar to manage API key
- improved multi-language support

Technical notes:
- using next-intl for translations
- API key is encrypted on the backend and stored in a secure cookie
- generation endpoint now uses the user's own OpenAI key