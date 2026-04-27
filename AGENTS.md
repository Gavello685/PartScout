# AGENTS.md

## Project overview
PartScout is an electronics BOM price comparison tool.

### Product goals
- Let users search for small electronic components by manufacturer part number.
- Let users upload a CSV BOM.
- Match BOM items to normalized parts.
- Compare supplier offers by price, stock, MOQ, and availability.
- Generate purchase plans such as cheapest total and fewest suppliers.

## Engineering rules
- Make small, focused changes.
- Do not introduce authentication until explicitly requested.
- Prefer simple, readable TypeScript.
- Do not use real supplier APIs yet; use mock adapters first.
- Keep supplier integrations behind interfaces.
- Add or update tests for business logic.
- Run lint, typecheck, and tests when available.
- Document any commands that fail and why.

## Implementation guidance
- Keep business logic separate from transport/UI concerns.
- Normalize part and offer data early and keep the normalized shape consistent.
- Model supplier adapters behind explicit interfaces so adapters can be swapped later.
- Favor deterministic, unit-testable planning logic for purchase-plan generation.

## Working in this repository
- This repository may start minimal; check available tooling before running commands.
- Prefer existing scripts when present (`lint`, `typecheck`, `test`) and report outcomes clearly.
- If no runnable checks exist yet, state that explicitly in task summaries.
