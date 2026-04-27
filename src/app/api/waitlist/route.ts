import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, product } = body as { email?: string; product?: string };

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const message = `
NEW WAITLIST SIGNUP — ${product || "Parallel Studio"}

Email: ${email}
Product: ${product || "studio"}
Time: ${new Date().toISOString()}
    `.trim();

    const accessKey = process.env.WEB3FORMS_KEY;

    if (accessKey) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Waitlist: ${email}`,
          from_name: "Parallel Studio Waitlist",
          to: "gian@parallelbase.io",
          message,
          email,
        }),
      });
    } else {
      console.log("=== WAITLIST (no email key configured) ===");
      console.log(message);
      console.log("==========================================");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
