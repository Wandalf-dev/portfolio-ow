---
description: Execute EPCT workflow - Explore, Plan, Code, Test
argument-hint: [feature-or-task-description]
---

# EPCT Workflow: Explore → Plan → Code → Test

You will execute a rigorous 4-phase workflow to implement: **$ARGUMENTS**

---

## Phase 1: EXPLORE

### 1.1 External Research
Search the internet for:
- Best practices related to the requested feature
- Modern implementation patterns
- Technical documentation and examples
- Similar implementations for inspiration
- Potential pitfalls and common mistakes

Use WebSearch and WebFetch tools to gather comprehensive information.

### 1.2 Codebase Analysis
Read and analyze ALL relevant files in this project to understand:
- Current architecture and patterns
- Existing implementations of similar features
- Dependencies and integrations
- Project structure and organization

**Files to examine:**
- Start by listing files (`ls -R` or similar) to understand the structure.
- Read configuration files (`package.json`, `pyproject.toml`, `Cargo.toml`, `composer.json`, `Gemfile`, etc.) to identify the tech stack.
- Read documentation (`README.md`, `CLAUDE.md`, `CONTRIBUTING.md`).
- Identify and read the entry point files and relevant components/modules related to the task.

**Critical questions to answer:**
- Where does this feature fit in the existing structure?
- What existing code patterns and naming conventions should be followed?
- Are there any conflicts with existing features?
- What are the dependencies implications?

Document your findings clearly before proceeding to Phase 2.

---

## Phase 2: PLAN

Based on your exploration, create a detailed implementation plan.

### Planning Requirements

1. **Break down the task** into clear, sequential steps.
2. **Identify all files** that will be modified or created.
3. **Specify exact changes** (function signatures, data structures, logic flow, API endpoints).
4. **Consider edge cases**, error handling, and security implications.
5. **Note dependencies** between changes.

### Critical Thinking - Challenge Yourself

Before presenting the plan, ask yourself:
- **Ambiguities**: What aspects are unclear?
- **Technical decisions**: Why choose this approach over alternatives?
- **Integration**: Could this break existing functionality (regressions)?
- **Consistency**: Does this match the project's style guide and language idioms?
- **Performance & Security**: Are there impacts on speed or security?
- **Scalability**: Will this solution scale with the project?

### Present Your Plan

Structure your plan as:

```markdown
## Implementation Plan

### Summary
[1-2 sentences describing the approach]

### Files to Modify
1. **filename.ext** - [what changes and why]
2. **filename.ext** - [what changes and why]

### Step-by-Step Changes
1. [First change with specifics]
2. [Second change with specifics]
...

### Technical Decisions
- **Decision**: [Choice made] - [Rationale]

### Potential Risks
[Concerns or areas of uncertainty]
Questions for User
List ALL questions where you need clarification (Design, Technical, Scope).

### ⚠️ STOP HERE ⚠️

**DO NOT PROCEED TO CODING until the user has:**
1. Reviewed the plan
2. Answered your questions
3. Explicitly approved moving forward

Use the AskUserQuestion tool if you need structured input on specific decisions.

---

## Phase 3: CODE

**Only execute this phase after explicit user approval of the plan.**

### Implementation Guidelines

1. **Follow the approved plan** step-by-step.
2. **Implement complete solutions**, not partial code or placeholders unless requested.
3. **Maintain consistency** with the language and framework idioms used in the project.
4. **Make changes atomically** - complete one logical change before moving to the next.
5. **Write self-documenting code** and add comments for complex logic only.

### Execution Approach

- Use parallel tool calls when reading multiple files.
- Preserve existing functionality - only modify what's necessary.
- Follow the project's naming conventions and linter rules strictly.

### Progress Communication

After implementing each major step, briefly confirm what was completed and what is the next step.

---

## Phase 4: TEST

**Execute verification based on what actually exists in the project.**

### 4.1 Discover Available Tests

Read configuration files to identify testing/linting tools configured in this specific project (e.g., inside `package.json` scripts, `Makefile`, `pytest.ini`, `tox.ini`, `pom.xml`, etc.).

**Important**: Only run commands that exist in the project. Do NOT assume or create test suites unless asked.

### 4.2 Execute Available Checks

- Run the linter if configured (e.g., `npm run lint`, `flake8`, `cargo clippy`, `rubocop`).
- Run the type checker if applicable (TypeScript `tsc`, Python `mypy`, etc.).
- Run existing relevant tests (e.g., `npm test`, `pytest`, `go test`, `mvn test`).
- Attempt a build/compile if the project requires it to verify structural integrity.

### 4.3 Verification

Provide specific instructions on how to verify the feature manually:
1. **Verification Steps**: What to check (logs, UI behavior, API response, output file).
2. **Edge Cases**: Specific scenarios to test to ensure robustness.

### 4.4 Final Report

Summarize:
- ✅ What was implemented
- ✅ Status of automated checks (Pass/Fail)
- ⚠️ Any known issues or limitations
- 📝 Follow-up tasks or improvements to consider

---

## Workflow Summary

EXPLORE → Gather context from internet + codebase (agnostic) ↓ PLAN → Create detailed plan + ask clarifying questions ↓ ⏸️ STOP → Wait for user approval (CRITICAL STEP) ↓ CODE → Implement approved plan (atomic changes) ↓ TEST → Run available checks + provide manual test guide


**Remember**: Never skip phases. Never hallucinate tools or tests that don't exist. Always va