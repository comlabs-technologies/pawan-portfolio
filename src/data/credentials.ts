export type CredentialGroup = {
  label: string;
  entries: {
    title: string;
    detail: string;
  }[];
};

export const credentials: CredentialGroup[] = [
  {
    label: "Education",
    entries: [
      {
        title: "B.E. Electrical and Electronics Engineering",
        detail:
          "Birla Institute of Technology and Science, Pilani, Goa Campus. 2020 to 2025.",
      },
      {
        title: "M.Sc. Chemistry",
        detail:
          "Birla Institute of Technology and Science, Pilani, Goa Campus. 2020 to 2025, taken alongside the engineering degree.",
      },
    ],
  },
  {
    label: "Leadership and service",
    entries: [
      {
        title: "Associate Placement Coordinator, Placement Unit",
        detail: "BITS Pilani, Goa Campus.",
      },
      {
        title: "Elected Student Representative, Council for Student Affairs",
        detail: "BITS Pilani, Goa Campus.",
      },
      {
        title: "Student Mentor, Peer Mentorship Program",
        detail: "BITS Pilani, Goa Campus.",
      },
      {
        title: "Teacher, Nirmaan Organization",
        detail: "Volunteer teaching with the student-run social initiative.",
      },
    ],
  },
];
