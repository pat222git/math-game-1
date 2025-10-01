from __future__ import annotations

import csv
import itertools
from pathlib import Path
from typing import Iterable, Tuple


def generate_combinations(*, start: int = 1, end_inclusive: int = 16, k: int = 6) -> Iterable[Tuple[int, ...]]:

    if k <= 0:
        return ()
    if end_inclusive < start:
        raise ValueError("end_inclusive must be >= start")
    numbers = range(start, end_inclusive + 1)
    if k > len(numbers):
        raise ValueError("k cannot be greater than the count of available numbers")
    return itertools.combinations(numbers, k)


def write_combinations_csv(*, output_path: Path) -> None:

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open(mode="w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["id", "a1", "a2", "a3", "a4", "a5", "a6"])
        for row_id, combo in enumerate(generate_combinations(), start=1):
            writer.writerow([row_id, *combo])


def main() -> None:

    output_file = Path("combinations_16_6.csv")
    write_combinations_csv(output_path=output_file)
    print("Wrote:", output_file)


if __name__ == "__main__":
    main()


