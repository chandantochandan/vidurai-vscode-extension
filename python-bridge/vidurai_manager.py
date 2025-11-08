"""
Vidurai Manager
Manages VismritiMemory instance with session persistence
"""
import os
import pickle
import logging
from pathlib import Path
from typing import List, Dict, Any

from vidurai import VismritiMemory
from vidurai.core.data_structures_v3 import SalienceLevel, Memory

logger = logging.getLogger('vidurai-bridge')


class ViduraiManager:
    """Manage Vidurai memory with local persistence"""

    def __init__(self, session_id: str = None):
        # Use global storage (not workspace directory)
        # Why? Don't pollute user's project directory
        self.session_dir = Path.home() / ".vidurai" / "sessions"
        self.session_dir.mkdir(parents=True, exist_ok=True)

        # Session ID (default: "default")
        self.session_id = session_id or "default"
        self.session_file = self.session_dir / f"{self.session_id}.pkl"

        # Initialize Vidurai memory
        self.memory = VismritiMemory(
            enable_gist_extraction=False  # Using rule-based gist
        )

        # Load existing session if available
        self._load_session()

        logger.info(f"Vidurai manager initialized (session: {self.session_id})")

    def _load_session(self):
        """Load session from disk if exists"""
        if self.session_file.exists():
            try:
                with open(self.session_file, 'rb') as f:
                    data = pickle.load(f)

                # Restore memory state
                if 'memory_data' in data:
                    # TODO: Load memory state into self.memory
                    # For now, we'll rely on Vidurai's internal persistence
                    pass

                logger.info(f"Loaded session from {self.session_file}")
            except Exception as e:
                logger.error(f"Error loading session: {e}")

    def save_session(self):
        """Save session to disk"""
        try:
            data = {
                'session_id': self.session_id,
                'memory_data': {}  # TODO: Extract memory state from self.memory
            }

            with open(self.session_file, 'wb') as f:
                pickle.dump(data, f)

            logger.info(f"Saved session to {self.session_file}")
        except Exception as e:
            logger.error(f"Error saving session: {e}")

    def remember(self, content: str, metadata: Dict[str, Any],
                 salience: SalienceLevel) -> str:
        """Store content in Vidurai memory"""
        try:
            memory = self.memory.remember(
                content=content,
                metadata=metadata,
                salience=salience
            )

            # Return memory ID (engram_id)
            return memory.engram_id
        except Exception as e:
            logger.error(f"Error storing memory: {e}")
            return None

    def recall(self, query: str, top_k: int = 10) -> List[Memory]:
        """Recall relevant memories"""
        try:
            # Use empty query to get all recent memories
            # (semantic search not critical for v1.0)
            memories = self.memory.recall(
                query=query or "",  # Empty query gets recent memories
                min_salience=SalienceLevel.NOISE,  # Get all
                top_k=top_k
            )

            return memories
        except Exception as e:
            logger.error(f"Error recalling memories: {e}")
            return []

    def get_stats(self) -> Dict[str, Any]:
        """Get current session statistics"""
        try:
            # Get memory ledger
            ledger = self.memory.get_ledger()

            return {
                'session_id': self.session_id,
                'total_memories': len(ledger),
                'session_file': str(self.session_file)
            }
        except Exception as e:
            logger.error(f"Error getting stats: {e}")
            return {
                'session_id': self.session_id,
                'total_memories': 0
            }
