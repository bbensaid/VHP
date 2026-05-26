#!/usr/bin/env python3
"""Merge expansion lesson files into source course JSON files, then rebuild courses_tier1.json."""

import json
import os
import sys

CONTENT_DIR = os.path.join(os.path.dirname(__file__), "../content")

COURSES = [
    ("course_medicaid_101.json",    "expand_medicaid.json"),
    ("course_value_based_care.json","expand_vbc.json"),
    ("course_health_equity.json",   "expand_equity.json"),
    ("course_ai_healthcare.json",   "expand_ai.json"),
]

def merge_course(course_file, expand_file):
    course_path = os.path.join(CONTENT_DIR, course_file)
    expand_path = os.path.join(CONTENT_DIR, expand_file)

    with open(course_path, "r") as f:
        course = json.load(f)
    with open(expand_path, "r") as f:
        expand = json.load(f)

    expansions = expand.get("expansions", {})
    added_total = 0

    # Build a set of existing lesson IDs to avoid duplicates
    existing_ids = set()
    for track in course.get("tracks", []):
        for lesson in track.get("lessons", []):
            existing_ids.add(lesson["id"])

    for track in course.get("tracks", []):
        track_slug = track["slug"]
        new_lessons = expansions.get(track_slug, [])
        if not new_lessons:
            continue

        existing_lessons = track.get("lessons", [])
        next_order = max((l.get("order", 0) for l in existing_lessons), default=0) + 1

        added = 0
        for lesson in new_lessons:
            if lesson["id"] in existing_ids:
                print(f"  SKIP (duplicate id): {lesson['id']}")
                continue
            lesson["order"] = next_order
            next_order += 1
            existing_lessons.append(lesson)
            existing_ids.add(lesson["id"])
            added += 1

        track["lessons"] = existing_lessons
        if added:
            print(f"  {track_slug}: +{added} lessons")
        added_total += added

    with open(course_path, "w") as f:
        json.dump(course, f, indent=2)

    print(f"  => {course_file}: {added_total} lessons added, file updated.")
    return course

def main():
    tier1_courses = []

    for course_file, expand_file in COURSES:
        print(f"\nMerging {expand_file} -> {course_file}")
        course = merge_course(course_file, expand_file)
        tier1_courses.append(course)

    tier1_path = os.path.join(CONTENT_DIR, "courses_tier1.json")
    with open(tier1_path, "w") as f:
        json.dump(tier1_courses, f, indent=2)
    print(f"\ncourses_tier1.json rebuilt with {len(tier1_courses)} courses.")

if __name__ == "__main__":
    main()
