import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      property,
      services_detail,
      total,
      adDestination,
      geos,
      audiences,
      websites,
      launchDateFormatted,
    } = body;

    const servicesList = services_detail
      .map((s: { name: string; price: number }) => `${s.name} — $${s.price}`)
      .join("\n");

    const targetingGeos = geos?.filter((v: string) => v.trim()).join(", ") || "Algorithm defaults";
    const targetingAudiences = audiences?.filter((v: string) => v.trim()).join(", ") || "Algorithm defaults";
    const targetingWebsites = websites?.filter((v: string) => v.trim()).join(", ") || "Algorithm defaults";

    const message = `
NEW ORDER — Parallel Base

Customer: ${name}
Phone: ${phone}
Email: ${email}

Property: ${property}

Services:
${servicesList}

Total: $${total}

${adDestination ? `Ad Destination: ${adDestination}\n` : ""}Launch Date: ${launchDateFormatted}

Targeting Preferences:
- Geographies: ${targetingGeos}
- Audiences: ${targetingAudiences}
- Websites: ${targetingWebsites}
    `.trim();

    const accessKey = process.env.WEB3FORMS_KEY;

    if (accessKey) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Order: ${name} — $${total}`,
          from_name: "Parallel Base Order Bot",
          to: "gian@parallelbase.io",
          message,
          name,
          email,
          phone,
        }),
      });
    } else {
      // Log to server console if no Web3Forms key configured
      console.log("=== NEW ORDER (no email key configured) ===");
      console.log(message);
      console.log("============================================");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
