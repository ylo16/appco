# Reflection: Building FolioLens with GitHub Copilot

## 1. What did you ask Copilot to help you build? How did you break down the problem?

I built FolioLens, a React investment portfolio tracker with holdings, summary
totals, an allocation chart, and a growth projector. I broke the build into a
structured sequence: folder setup, then the calculation logic with unit
tests, then state and a form, then the table, summary cards, allocation
chart, projection panel, localStorage persistence, styling, and finally
validation and a diversification warning. Building the math and tests before
any UI existed meant I could check Copilot's formulas against numbers I
calculated by hand before anything depended on them being correct.

![Copilot setting up the project structure](images/step1.1-first-prompt.png)![Part two](images/step1.2-first-prompt.png)

## 2. How did your approach to asking questions change as you worked?

My early prompts described a feature in general terms. By the later steps,
prompts specified exact file names, exact function signatures, and explicit
boundaries like "do not change calculations.js" or "do not run git
commands." That structure came from working through the assignment
carefully rather than improvising each request, and it meant Copilot changed
only what I intended instead of touching unrelated files.

![Early prompt, less specific](images/step1.1-first-prompt.png)![Part two](images/step1.2-first-prompt.png)

![Later prompt, more specific](images/step-7-readme-prompt.png)

## 3. What parts of the development process with GitHub Copilot surprised you?

Copilot is fast at generating files and explaining what each function takes
in and returns, which made the calculation and table steps go quickly. The
biggest surprise was during the diversification-warning feature: Copilot's
chat summary said it had completed the task, added InsightsBanner.jsx, and
that all tests still passed, but the file had not actually been written to
disk. Vite's error overlay showed "Failed to resolve import
'./components/InsightsBanner.jsx' from 'src/App.jsx'. Does the file exist?"
I had to create the file myself to fix it. It showed me that Copilot's
summary of what it did isn't the same as confirming the file is actually
there.

![The error after Copilot said the file was created](images/copilot-error.png)

## 4. What did you learn about the technology you used that you didn't know before?

I have a better sense now of why the allocation chart and the rest of the
app update automatically the moment I add a new stock. Since all the
components read from the same holdings state, adding one holding through
the form causes every part of the app, the table, the summary cards, and
the chart, to re-render with the new numbers without me doing anything
extra. My bigger takeaway from this project wasn't a specific piece of
React syntax, though. It was learning how to direct Copilot: how specific a
prompt needs to be, which files to point it at, and how to verify its
output instead of assuming it did what it said.

![Copilot explaining the hook](images/step3-explain.png)![Part two](images/step3.1-explain.png)

## 5. What would you do differently if you had to build this again?

I'd structure my prompts more precisely from the start, naming exact files
and boundaries even in the early steps rather than only in the later ones.
I'd also check that a file Copilot claims to have created actually exists on
disk right after accepting the change, instead of finding out later from a
Vite error.

![Something that cost me time](images/copilot-error.png)

## Summary

FolioLens combines a CS and Finance background into a small but complete
portfolio tool. Working with Copilot is fastest when prompts are specific
about files and boundaries, and its own summaries still need to be checked
against the actual files on disk.