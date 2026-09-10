export type Principle = {
  title: string;
  detail: string;
};

export const principles: Principle[] = [
  {
    title: "Understand the business process before choosing the technology",
    detail:
      "The stack is the last decision, not the first. Most of the useful work happens while mapping how a team actually operates today.",
  },
  {
    title: "Work directly with decision-makers and communicate trade-offs clearly",
    detail:
      "Founders and managers can make good calls when the options are stated plainly. That conversation is part of the engineering, not a step around it.",
  },
  {
    title: "Own delivery from interface design through deployment",
    detail:
      "Design, implementation, responsive behaviour, infrastructure and release belong to the same person often enough that handovers stop losing detail.",
  },
  {
    title: "Build practical systems that teams can maintain after launch",
    detail:
      "A system nobody on the team can change is a system that quietly stops being used. What ships has to survive without me.",
  },
];
