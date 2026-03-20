import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: "Contact form is not configured" },
        { status: 503 }
      );
    }

    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Format message for Telegram
    const telegramMessage = formatTelegramMessage(body);

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "HTML",
        }),
      }
    );

    if (!telegramResponse.ok) {
      const error = await telegramResponse.json();
      console.error("Telegram API error:", error);
      return NextResponse.json(
        { error: "Failed to send message to Telegram" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function formatTelegramMessage(data: ContactFormData): string {
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  });

  return `
🔔 <b>New Contact Form Submission</b>

👤 <b>Name:</b> ${escapeHtml(data.name)}
📧 <b>Email:</b> ${escapeHtml(data.email)}

💬 <b>Message:</b>
${escapeHtml(data.message)}

⏰ <b>Received:</b> ${timestamp}
  `.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m] || m);
}
