const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const NOTIFY_EMAIL = process.env.ORDER_NOTIFICATION_EMAIL ?? "";
const FROM_EMAIL =
  process.env.ORDER_FROM_EMAIL ?? "Softglow Orders <onboarding@resend.dev>";

const MAX_ITEMS = 10;
const MAX_QTY_PER_LINE = 20;

interface OrderItem {
  name: string;
  detail: string;
  qty: number;
  price: number;
  lineTotal: number;
}

interface OrderLineInput {
  name?: unknown;
  detail?: unknown;
  qty?: unknown;
  price?: unknown;
}

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function fmtINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
    return Response.json(
      { ok: false, error: "Email notifications are not configured." },
      { status: 500 }
    );
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return Response.json(
          { ok: false, error: "Invalid origin." },
          { status: 403 }
        );
      }
    } catch {
      return Response.json(
        { ok: false, error: "Invalid origin." },
        { status: 403 }
      );
    }
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const body = payload as {
    items?: unknown;
    customer?: unknown;
    payment?: unknown;
  };

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return Response.json(
      { ok: false, error: "Cart is empty." },
      { status: 400 }
    );
  }
  if (body.items.length > MAX_ITEMS) {
    return Response.json(
      { ok: false, error: "Too many items." },
      { status: 400 }
    );
  }

  const customer = (body.customer ?? {}) as Record<string, unknown>;
  const name = clean(customer.name, 120);
  const phone = clean(customer.phone, 20);
  const address = clean(customer.address, 500);
  const pincode = clean(customer.pincode, 10);

  if (!name || !phone || !address || !pincode) {
    return Response.json(
      { ok: false, error: "Missing delivery details." },
      { status: 400 }
    );
  }

  const payment = body.payment === "cod" ? "cod" : "upi";

  const items: OrderItem[] = [];
  for (const entry of body.items) {
    if (!entry || typeof entry !== "object") continue;
    const line = entry as OrderLineInput;
    const itemName = clean(line.name, 200);
    const detail = clean(line.detail, 200);
    const qty = Math.round(Number(line.qty));
    const price = Number(line.price);
    if (!itemName || !Number.isFinite(qty) || qty < 1) continue;
    if (!Number.isFinite(price) || price <= 0) continue;
    const quantity = Math.min(MAX_QTY_PER_LINE, qty);
    items.push({
      name: itemName,
      detail,
      qty: quantity,
      price,
      lineTotal: price * quantity,
    });
  }

  if (items.length === 0) {
    return Response.json(
      { ok: false, error: "No valid items in cart." },
      { status: 400 }
    );
  }

  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const paymentLabel =
    payment === "cod" ? "Cash on Delivery (COD)" : "UPI QR code (Paytm)";

  const itemRows = items
    .map(
      (item) =>
        `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee">${escapeHtml(
          item.name
        )}${item.detail ? ` — ${escapeHtml(item.detail)}` : ""}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:center">${
          item.qty
        }</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right">${fmtINR(
          item.lineTotal
        )}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#23271C;line-height:1.6">
      <h2 style="margin:0 0 4px">New website order</h2>
      <p style="margin:0 0 16px;color:#666">Payment: <strong>${paymentLabel}</strong></p>
      <table style="border-collapse:collapse;width:100%;max-width:520px">
        <thead>
          <tr style="background:#f5f2e8">
            <th style="padding:8px 10px;text-align:left">Item</th>
            <th style="padding:8px 10px;text-align:center">Qty</th>
            <th style="padding:8px 10px;text-align:right">Total</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
        <tfoot>
          <tr>
            <td style="padding:10px"></td>
            <td style="padding:10px;text-align:center"><strong>Total</strong></td>
            <td style="padding:10px;text-align:right"><strong>${fmtINR(total)}</strong></td>
          </tr>
        </tfoot>
      </table>
      <h3 style="margin:20px 0 6px">Delivery details</h3>
      <p style="margin:0">
        Name: <strong>${escapeHtml(name)}</strong><br />
        Phone: <strong>${escapeHtml(phone)}</strong><br />
        Address: ${escapeHtml(address)}<br />
        Pincode: ${escapeHtml(pincode)}
      </p>
      <p style="margin-top:18px;color:#666;font-size:13px">
        This order was also sent to WhatsApp for confirmation and payment.
      </p>
    </div>
  `;

  const text = [
    "New website order",
    `Payment: ${paymentLabel}`,
    "",
    ...items.map(
      (item) =>
        `- ${item.name}${item.detail ? ` (${item.detail})` : ""} x${item.qty} — ${fmtINR(item.lineTotal)}`
    ),
    "",
    `Total: ${fmtINR(total)}`,
    "",
    "Delivery details",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address}`,
    `Pincode: ${pincode}`,
    "",
    "This order was also sent to WhatsApp for confirmation and payment.",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [NOTIFY_EMAIL],
        subject: `New order — ${name} — ${fmtINR(total)} (${paymentLabel})`,
        html,
        text,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      return Response.json(
        { ok: false, error: "Email could not be sent." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json(
      { ok: false, error: "Email could not be sent." },
      { status: 502 }
    );
  }
}
