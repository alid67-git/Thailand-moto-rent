import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// WhatsApp Business Account Token (env variable)
const WHATSAPP_TOKEN = process.env.WHATSAPP_BUSINESS_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "thailand_moto_rent_2024";

interface WhatsAppMessage {
  id: string;
  from: string;
  text?: {
    body: string;
  };
  type: string;
  timestamp: string;
}

interface WhatsAppRequest {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: string;
        messages?: WhatsAppMessage[];
        contacts?: Array<{
          profile: {
            name: string;
          };
          wa_id: string;
        }>;
      };
    }>;
  }>;
}

// Claude AI System Prompt (Multi-language)
const SYSTEM_PROMPT = `You are a helpful customer support assistant for Thailand Moto Rent, a motorcycle rental company in Phuket.

Your responsibilities:
1. Answer questions about motorcycle rentals (pricing, models, insurance)
2. Provide safety tips for motorcycle riding in Phuket
3. Recommend routes and destinations
4. Help with bookings and reservations
5. Support in multiple languages (Turkish, English, Thai, German, French, Arabic, Chinese)

Available Services:
- Honda Click 160: 350 THB/day (budget option)
- Honda ADV 160: 490 THB/day (recommended)
- Honda Forza 350: 790 THB/day (premium)

Insurance Options:
- Basic: 120 THB/day
- Premium: 220 THB/day (recommended)

Popular Routes:
- South Phuket Loop (85 km, easy)
- Tiger Cave Temple (95 km, medium)
- Khao Sok Adventure (150 km, hard)
- Phang Nga Scenic (120 km, medium)

Safety Rules:
- Always wear helmet (required by law)
- Keep lights on (day & night)
- Follow speed limits (50 km/h city, 100 km/h highway)
- No drinking and driving

Contact:
- Phone: +66991234567
- Email: support@thailand-moto-rent.com
- Office: Bang Tao Beach, Patong, Phuket

Be friendly, professional, and helpful. Answer in the customer's language.`;

async function sendWhatsAppMessage(
  recipientPhone: string,
  message: string
): Promise<boolean> {
  try {
    if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
      console.error("WhatsApp credentials missing");
      return false;
    }

    const response = await fetch(
      `https://graph.instagram.com/v18.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: "text",
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("WhatsApp API error:", await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return false;
  }
}

async function getAIResponse(userMessage: string, language: string = "en"): Promise<string> {
  try {
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `[Language: ${language}] ${userMessage}`,
        },
      ],
    });

    const textContent = response.content.find((block) => block.type === "text");
    if (textContent && textContent.type === "text") {
      return textContent.text;
    }

    return "Sorry, I couldn't process your message. Please try again.";
  } catch (error) {
    console.error("Claude API error:", error);
    return "I'm having trouble connecting to our support system. Please try again later or call +66991234567.";
  }
}

// Detect language from message
function detectLanguage(text: string): string {
  // Simple language detection
  if (/[\u4e00-\u9fff]/.test(text)) return "zh"; // Chinese
  if (/[฀-๿]/.test(text)) return "th"; // Thai
  if (/[؀-ۿ]/.test(text)) return "ar"; // Arabic
  if (/\b(ich|das|ist|ein|der)\b/i.test(text)) return "de"; // German (simple heuristic)
  if (/\b(le|la|les|et|une|un)\b/i.test(text)) return "fr"; // French
  if (/[Ѐ-ӿ]/.test(text)) return "ru"; // Russian
  if (text.includes("ğ") || text.includes("ş") || text.includes("ı")) return "tr"; // Turkish
  return "en"; // Default to English
}

// GET request: Verify webhook (WhatsApp requires this)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Unauthorized", { status: 403 });
}

// POST request: Handle incoming WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const body: WhatsAppRequest = await request.json();

    // Verify the webhook
    if (body.object !== "whatsapp_business_account") {
      return NextResponse.json(
        { error: "Invalid object type" },
        { status: 400 }
      );
    }

    // Process each entry
    for (const entry of body.entry) {
      for (const change of entry.changes) {
        const value = change.value;

        if (value.messages && value.messages.length > 0) {
          const message = value.messages[0];

          // Only process text messages
          if (message.type !== "text" || !message.text?.body) {
            continue;
          }

          const userPhone = message.from;
          const userMessage = message.text.body;
          const userName = value.contacts?.[0]?.profile?.name || "Guest";

          console.log(`Message from ${userName} (${userPhone}): ${userMessage}`);

          // Detect user's language
          const language = detectLanguage(userMessage);

          // Get AI response
          const aiResponse = await getAIResponse(userMessage, language);

          // Send response via WhatsApp
          await sendWhatsAppMessage(userPhone, aiResponse);

          // Log to database (optional - for future analytics)
          // await logConversation({
          //   phone: userPhone,
          //   name: userName,
          //   message: userMessage,
          //   response: aiResponse,
          //   language,
          //   timestamp: new Date(parseInt(message.timestamp) * 1000),
          // });
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
