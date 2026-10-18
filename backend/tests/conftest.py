import os
import sys
import json
import pytest
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.config import settings

# Enforce strict test isolation: tests MUST NEVER touch the production graph.
PROD_GRAPH_NAME = os.getenv("FALKORDB_GRAPH", "forktrace")
TEST_GRAPH_NAME = os.getenv(
    "FALKORDB_TEST_GRAPH",
    os.getenv("TEST_GRAPH_NAME", settings.test_graph_name or "forktrace_test"),
)

# Safety check: if TEST_GRAPH_NAME resolves to PROD_GRAPH_NAME, append '_test'
if TEST_GRAPH_NAME == PROD_GRAPH_NAME:
    TEST_GRAPH_NAME = f"{PROD_GRAPH_NAME}_test"

# Override global settings to point to the isolated test graph
settings.falkordb_graph = TEST_GRAPH_NAME

from app.db import get_graph, check_connection
from app.loader import load_scenario
from tests.oracle import Oracle


@pytest.fixture(scope="session", autouse=True)
def verify_test_isolation():
    """Safety guard verifying that the test suite runs exclusively on the test graph."""
    assert settings.falkordb_graph == TEST_GRAPH_NAME, (
        f"Settings graph '{settings.falkordb_graph}' does not match expected test graph '{TEST_GRAPH_NAME}'."
    )
    assert settings.falkordb_graph != PROD_GRAPH_NAME, (
        f"CRITICAL SAFETY VIOLATION: Test suite attempted to run against production graph '{PROD_GRAPH_NAME}'!"
    )
    yield


@pytest.fixture(scope="session")
def scenario_path() -> Path:
    return settings.scenario_path


@pytest.fixture(scope="session")
def scenario_data(scenario_path: Path) -> dict:
    with open(scenario_path, "r", encoding="utf-8") as f:
        return json.load(f)


@pytest.fixture(scope="session")
def oracle(scenario_data: dict) -> Oracle:
    return Oracle(data=scenario_data)


@pytest.fixture(scope="session")
def graph(scenario_data: dict):
    """Provides an active FalkorDB graph connection seeded with scenario.json
    strictly against the isolated test graph.
    Gives a clear error if FalkorDB is not reachable.
    """
    is_ok, err_msg = check_connection(
        host=settings.falkordb_host,
        port=settings.falkordb_port,
        password=settings.falkordb_password,
        ssl=settings.falkordb_ssl,
    )
    if not is_ok:
        pytest.fail(
            f"FalkorDB connection failed at {settings.falkordb_host}:{settings.falkordb_port} "
            f"(ssl={settings.falkordb_ssl}).\n"
            f"Exact error: {err_msg}\n\n"
            f"Setup options:\n"
            f"  - FalkorDB Cloud: Set FALKORDB_HOST, FALKORDB_PORT, FALKORDB_PASSWORD, and FALKORDB_SSL=true in .env\n"
            f"  - Local Docker: docker compose up -d (or docker run -p 6379:6379 -p 3000:3000 --rm falkordb/falkordb:latest)"
        )

    g = get_graph(TEST_GRAPH_NAME)
    try:
        load_scenario(g, scenario_data)
    except Exception as e:
        pytest.fail(f"Failed to load scenario into isolated test graph '{TEST_GRAPH_NAME}': {e}")

    yield g
