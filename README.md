# forktrace
Graph-powered AI agent that traces foodborne outbreak reports through supply chains, explains the evidence, and proposes targeted recalls. 
# ForkTrace

**Follow the fork back to the farm.**

Imagine ten people get food poisoning. They ate at different restaurants, on different days. Is it a coincidence, or did their food come from the same place?

ForkTrace answers that. It looks at the sick people, checks what they ate, and follows the ingredients back to where they came from. Then it tells you which batch is the most likely cause and why, and suggests what should be pulled from sale.

I made this for Graph Hacks 2026.

- **Track:** Agents That Act on Connected Data
- **Started:** October 15, 2026, after the hackathon began
- **Data:** All fake (synthetic). No real or private information.

## How it works

1. You load an outbreak: who got sick, what they ate, and where the food came from.
2. ForkTrace follows each case back: person → meal → ingredient → batch → supplier.
3. It counts which batch connects the most sick people.
4. It shows why other batches were ruled out.
5. It shows the exact path behind every answer, so you can check it yourself.
6. If some information is missing, it says it isn't sure instead of guessing.
7. It suggests a recall, and a person has to approve it. The recall is only a simulation.

## Why I used a graph

The answer isn't sitting in one place. One person's record doesn't tell you anything. You only find the cause when you connect many people, meals, ingredients and batches together and see where they meet. A graph database is built for exactly that, so FalkorDB is the core of this project. Without it, ForkTrace wouldn't work.

## What the AI does

The graph does the investigating. The AI only explains the results in simple words. It can't invent batches or make up facts, because it only talks about what the database actually found.

## Built with

- FalkorDB
- Python (FastAPI)
- React
- Gemini

## Graph data model

_Coming soon: a picture of the nodes and how they connect._

## Cypher queries

_Coming soon: the queries that find the shared batch and the affected products._

## How to run it

_Coming soon: step-by-step setup._

## Demo

- Video: coming soon
- Live app: coming soon

## Limitations

- It only works with fake data.
- The recall is a simulation, not a real one.
- It's a prototype. It can't prove that a batch caused an outbreak, and it isn't a real food-safety tool.

## AI use

I used Gemini Pro to help write code, and ChatGPT and Claude to plan the idea. I went through the code myself and I can explain how it works.
