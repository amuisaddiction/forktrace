from typing import Optional, Tuple
from falkordb import FalkorDB
from app.config import settings

def get_client(
    host: Optional[str] = None,
    port: Optional[int] = None,
    password: Optional[str] = None,
    ssl: Optional[bool] = None,
    username: Optional[str] = None,
) -> FalkorDB:
    """Instantiate FalkorDB client using only documented arguments."""
    h = host if host is not None else settings.falkordb_host
    p = port if port is not None else settings.falkordb_port
    pwd = password if password is not None else settings.falkordb_password
    pwd = pwd if pwd else None  # Allow empty password as None
    user = username if username is not None else settings.falkordb_username
    user = user.strip() if user else None
    s = ssl if ssl is not None else settings.falkordb_ssl

    kwargs = dict(host=h, port=p, password=pwd, ssl=s)
    if user:
        kwargs["username"] = user
    return FalkorDB(**kwargs)

def get_graph(
    graph_name: Optional[str] = None,
    host: Optional[str] = None,
    port: Optional[int] = None,
    password: Optional[str] = None,
    ssl: Optional[bool] = None,
    username: Optional[str] = None,
):
    """Select graph from FalkorDB client."""
    client = get_client(host=host, port=port, password=password, ssl=ssl, username=username)
    g_name = graph_name or settings.falkordb_graph
    return client.select_graph(g_name)

def check_connection(
    host: Optional[str] = None,
    port: Optional[int] = None,
    password: Optional[str] = None,
    ssl: Optional[bool] = None,
    username: Optional[str] = None,
) -> Tuple[bool, Optional[str]]:
    """Test connection to FalkorDB. Returns (is_available, error_message)."""
    try:
        client = get_client(host=host, port=port, password=password, ssl=ssl, username=username)
        # Attempt connection check by testing connection
        if hasattr(client, "connection") and client.connection:
            client.connection.ping()
        return True, None
    except Exception as e:
        return False, str(e)

def is_falkordb_available(
    host: Optional[str] = None,
    port: Optional[int] = None,
    password: Optional[str] = None,
    ssl: Optional[bool] = None,
    username: Optional[str] = None,
) -> bool:
    """Convenience boolean check for FalkorDB availability."""
    ok, _ = check_connection(host=host, port=port, password=password, ssl=ssl, username=username)
    return ok
