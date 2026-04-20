from fastapi import FastAPI


def test_app_exists():
    from main import app
    assert isinstance(app, FastAPI)
