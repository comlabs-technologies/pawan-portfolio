import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/validation";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  mode?: "enquiry" | "full";
};

/**
 * Local submission handler. Swap the `deliver` call for a mail provider or
 * a database write; the client contract stays the same.
 */
export async function POST(request: Request) {
  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request body." }, { status: 400 });
  }

  const requireDetails = payload.mode === "full";
  const errors = validateEnquiry(
    { name: payload.name, email: payload.email ?? "", message: payload.message },
    requireDetails,
  );

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  await deliver({
    name: payload.name?.trim(),
    email: (payload.email ?? "").trim(),
    message: payload.message?.trim(),
  });

  return NextResponse.json({
    ok: true,
    message: requireDetails
      ? "Thanks, your message has been received. I will come back to you."
      : "Thanks, I have your address and will be in touch.",
  });
}

async function deliver(enquiry: { name?: string; email: string; message?: string }) {
  // Placeholder for the real delivery integration.
  console.info("[contact] enquiry received", {
    email: enquiry.email,
    hasMessage: Boolean(enquiry.message),
  });
}
