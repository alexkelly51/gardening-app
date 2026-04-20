# Python Style Guide

## Type Hints

All function signatures must have full type annotations — parameters and return types.

```python
def get_plants(position: str | None = None) -> list[Plant]:
    ...
```

## Docstrings

Every `.py` file, class, and function must have a docstring.

### File-level
```python
"""FastAPI application entry point for the Gardening Tracker backend."""
```

### One-liner — use when the purpose is obvious
```python
class HealthResponse(BaseModel):
    """Response model for the health check endpoint."""
    status: str
```

### Multi-liner — use when args or return value need explanation
```python
def get_plants(position: str | None = None) -> list[Plant]:
    """Fetch all plants from the sheet, optionally filtered by position.

    Args:
        position: If provided, only return plants matching this position value.

    Returns:
        A list of Plant objects.
    """
    ...  # code starts immediately — no blank line after the docstring
```

**Rules:**
- No blank line between a docstring and the first line of code
- One-liners: closing `"""` on the same line as the text
- Multi-liners: summary on line 1, blank line, then Args/Returns, closing `"""` on its own line

## Comments

Add inline comments only where logic is non-obvious. Skip them where the code speaks for itself.

```python
# Allow comma-separated origins via env var for flexibility across environments
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
```
