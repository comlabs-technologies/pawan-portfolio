export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type EnquiryInput = {
  name?: string;
  email: string;
  message?: string;
};

export type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function validateEnquiry(input: EnquiryInput, requireDetails: boolean): FieldErrors {
  const errors: FieldErrors = {};
  const email = input.email?.trim() ?? "";

  if (!email) errors.email = "Enter an email address so I can reply.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "That does not look like a valid email address.";

  if (requireDetails) {
    const name = input.name?.trim() ?? "";
    const message = input.message?.trim() ?? "";
    if (!name) errors.name = "Enter your name.";
    else if (name.length < 2) errors.name = "That name looks a little short.";

    if (!message) errors.message = "Add a short message so I know what this is about.";
    else if (message.length < 20)
      errors.message = "A little more detail helps. At least 20 characters.";
  }

  return errors;
}
