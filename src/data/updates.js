// updates.js - Build log data collection for Thiran
// Format: { id, date, title, body, tags }

export const buildLogs = [
  {
    id: "update-2026-09-08",
    date: "Week of 8 Sep 2026",
    title: "NextStep quiz engine v1 live internally",
    body: "We hooked up the first version of our regional psychometric testing flow and ran 15 team members through it. Found a nasty scoring edge case when students skipped optional interest prompts, but the core recommendation pipeline held up. On track for private beta next month.",
    tags: ["NextStep", "Engineering", "Testing"]
  },
  {
    id: "update-2026-09-01",
    date: "Week of 1 Sep 2026",
    title: "LaunchLab delivery pipeline optimized & multi-tenant auth",
    body: "Shipped three custom client web applications ahead of schedule this week. Reusable layout components and automated Lighthouse audits helped us hit 98+ performance scores out of the box. Began groundwork on unified client portal authentication.",
    tags: ["LaunchLab", "Performance", "Team"]
  }
];
