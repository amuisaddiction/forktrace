import os
from pathlib import Path
from dotenv import load_dotenv, find_dotenv

# Search for .env file in current dir, backend dir, or parent dirs
dotenv_path = find_dotenv(usecwd=True)
if not dotenv_path:
    for candidate in [
        Path(__file__).resolve().parent.parent / ".env",
        Path(__file__).resolve().parent.parent.parent / ".env",
    ]:
        if candidate.exists():
            dotenv_path = str(candidate)
            break

if dotenv_path:
    load_dotenv(dotenv_path)

class Settings:
    def __init__(self):
        self.falkordb_host: str = os.getenv("FALKORDB_HOST", "localhost")
        self.falkordb_port: int = int(os.getenv("FALKORDB_PORT", "6379"))
        self.falkordb_username: str = os.getenv("FALKORDB_USERNAME", "")
        self.falkordb_password: str = os.getenv("FALKORDB_PASSWORD", "")
        self.falkordb_graph: str = os.getenv("FALKORDB_GRAPH", "forktrace")

        ssl_val = os.getenv("FALKORDB_SSL", "false").strip().lower()
        self.falkordb_ssl: bool = ssl_val in ("true", "1", "yes", "t")

        self.scenario_path: Path = (
            Path(__file__).resolve().parent.parent / "data" / "scenario.json"
        )

        # Scoring thresholds (synthetic data outbreak investigation)
        self.inferred_weight: float = float(os.getenv("INFERRED_WEIGHT", "0.5"))
        self.high_lead_ratio: float = float(os.getenv("HIGH_LEAD_RATIO", "2.0"))
        self.high_attack: float = float(os.getenv("HIGH_ATTACK", "0.7"))
        self.low_lead_ratio: float = float(os.getenv("LOW_LEAD_RATIO", "1.2"))
        self.min_cases: int = int(os.getenv("MIN_CASES", "5"))

settings = Settings()
