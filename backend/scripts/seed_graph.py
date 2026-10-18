import sys
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

from app.config import settings
from app.db import get_graph, is_falkordb_available
from app.loader import load_from_file

def main():
    if not is_falkordb_available(settings.falkordb_host, settings.falkordb_port):
        print(f"Error: FalkorDB is not reachable on {settings.falkordb_host}:{settings.falkordb_port}")
        print("Please start it with: docker compose up -d (or docker run -p 6379:6379 -p 3000:3000 --rm falkordb/falkordb:latest)")
        sys.exit(1)

    scenario_file = settings.scenario_path
    if not scenario_file.exists():
        print(f"Error: Scenario file not found at {scenario_file}")
        print("Please run scripts/generate_scenario.py first.")
        sys.exit(1)

    print(f"Connecting to FalkorDB on {settings.falkordb_host}:{settings.falkordb_port}, graph='{settings.falkordb_graph}'...")
    graph = get_graph()
    
    print(f"Wiping and seeding graph from {scenario_file}...")
    stats = load_from_file(graph, scenario_file)
    print("Graph seeded successfully!")
    for k, v in stats.items():
        print(f"  - {k}: {v}")

if __name__ == "__main__":
    main()

