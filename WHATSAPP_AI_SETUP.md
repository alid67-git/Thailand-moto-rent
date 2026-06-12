# WhatsApp AI Bot Setup Guide

## Overview

Thailand Moto Rent now has a WhatsApp AI Assistant powered by Claude. Customers can:
- Chat with AI support 24/7
- Get instant answers about rentals, routes, and safety
- Receive multi-language support (6 languages)
- Fallback to direct WhatsApp messaging

---

## Setup Instructions

### 1. Get WhatsApp Business Account Credentials

1. **Register for WhatsApp Business API**
   - Visit: https://www.whatsapp.com/business/
   - Create a Business Account
   - Request API access

2. **Get Required Credentials**
   - `WHATSAPP_BUSINESS_TOKEN`: Your WhatsApp API token
   - `WHATSAPP_PHONE_ID`: Your WhatsApp Phone Number ID
   - `WHATSAPP_VERIFY_TOKEN`: Custom verification token (for webhook)

3. **Setup Webhook**
   - Webhook URL: `https://yourdomain.com/api/whatsapp`
   - Verify Token: `thailand_moto_rent_2024` (or custom)
   - Subscribe to `messages` webhook

### 2. Configure Environment Variables

Create `.env.local` with:

```env
# WhatsApp Business API
WHATSAPP_BUSINESS_TOKEN=your_business_token_here
WHATSAPP_PHONE_ID=your_phone_id_here
WHATSAPP_VERIFY_TOKEN=thailand_moto_rent_2024

# Claude API (Anthropic)
ANTHROPIC_API_KEY=sk-ant-v4-your-key-here

# Application
NEXT_PUBLIC_APP_URL=https://thailand-moto-rent.com
```

### 3. Deploy to Production

```bash
# Build locally
npm run build

# Deploy (e.g., Vercel)
vercel deploy

# Test webhook
curl -X GET "https://yourdomain.com/api/whatsapp?hub.mode=subscribe&hub.verify_token=thailand_moto_rent_2024&hub.challenge=test_challenge"
```

Expected response: `test_challenge`

---

## Features

### AI Capabilities

✅ **Motorcycle Rentals**
- Model information (Click 160, ADV 160, Forza 350)
- Pricing and daily rates
- Insurance options
- Booking assistance

✅ **Routes & Destinations**
- 12 recommended routes
- 54 destinations info
- Difficulty levels
- Safety tips

✅ **Safety Guidance**
- Traffic laws in Thailand
- License requirements
- Safety protocols
- Emergency procedures

✅ **Multi-Language Support**
- 🇹🇷 Turkish (TR)
- 🇬🇧 English (EN)
- 🇹🇭 Thai (TH)
- 🇩🇪 German (DE)
- 🇫🇷 French (FR)
- 🇸🇦 Arabic (AR)

### Auto Language Detection

The system automatically detects the customer's language:
- Thai script → Thai
- Arabic script → Arabic
- German keywords → German
- French keywords → French
- Turkish characters → Turkish
- Default → English

---

## API Endpoints

### POST `/api/whatsapp`

Handles incoming WhatsApp messages and sends AI responses.

**Request:**
```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "changes": [
        {
          "value": {
            "messages": [
              {
                "from": "66991234567",
                "type": "text",
                "text": {
                  "body": "Hello, I want to rent a motorcycle"
                }
              }
            ]
          }
        }
      ]
    }
  ]
}
```

**Response:**
```json
{ "status": "ok" }
```

### GET `/api/whatsapp`

Webhook verification endpoint.

**Parameters:**
- `hub.mode`: subscribe
- `hub.verify_token`: Your verify token
- `hub.challenge`: Challenge string

**Response:**
The challenge string if verified successfully.

---

## Frontend Component

### WhatsAppButton Component

Located at: `src/components/WhatsAppButton.tsx`

Features:
- Floating chat widget (bottom-right)
- Instant AI responses
- Message history
- Multi-language UI
- Fallback to direct WhatsApp link

### Usage

Already integrated in `Providers.tsx`:

```tsx
import { WhatsAppButton } from "@/components/WhatsAppButton";

<WhatsAppButton />
```

---

## Testing

### Test with WhatsApp Web

1. Open WhatsApp Web on your phone
2. Go to Chats → New Chat
3. Search for: Thailand Moto Rent
4. Send a test message:
   - English: "What models do you have?"
   - Thai: "เช่ารถจักรยานยนต์อันไหนดี"
   - German: "Wie viel kostet die Vermietung?"
   - Arabic: "هل لديكم تأمين؟"

### Expected Response

The AI will respond in the same language:
- Answer your question
- Provide relevant information
- Offer additional help

---

## Troubleshooting

### Issue: Webhook not receiving messages

**Solution:**
1. Verify webhook URL is publicly accessible
2. Check WHATSAPP_VERIFY_TOKEN matches
3. Ensure webhook is subscribed to `messages`
4. Check server logs for errors

### Issue: AI not responding in correct language

**Solution:**
1. Verify ANTHROPIC_API_KEY is correct
2. Check language detection in route.ts
3. Ensure language code matches Claude's supported languages
4. Check system prompt for language instructions

### Issue: WhatsApp widget not showing

**Solution:**
1. Verify WhatsAppButton is in Providers.tsx
2. Check z-index (should be z-40 or z-50)
3. Ensure component is imported correctly
4. Check browser console for errors

---

## Admin Features (Future)

Planned enhancements:
- [ ] Message history dashboard
- [ ] Customer conversation logs
- [ ] AI response analytics
- [ ] Manual override for complex queries
- [ ] CRM integration
- [ ] Automated booking confirmations

---

## Costs

### Per-Message Pricing (Approximate)

- **WhatsApp API**: $0.0015 - $0.005 per message (depends on region)
- **Claude API**: $0.003 per 1K input tokens, $0.015 per 1K output tokens
- **Estimated Monthly**: ~$50-200 depending on message volume

### Cost Optimization

- Cache common questions
- Batch process messages during off-hours
- Use shorter prompts
- Monitor token usage

---

## Security

✅ **API Token Security**
- Never commit `.env.local`
- Use environment variables
- Rotate tokens regularly
- Restrict webhook to POST/GET only

✅ **Data Privacy**
- Messages are processed in real-time
- Optional: Implement message logging to database
- Comply with GDPR/privacy regulations
- Add customer consent message

✅ **Rate Limiting**
- Implement rate limits on /api/whatsapp
- Prevent spam/abuse
- Monitor for unusual patterns

---

## Support

For issues or questions:
- Email: support@thailand-moto-rent.com
- WhatsApp: +66991234567
- Documentation: See this file

---

## Changelog

### v1.0 (2026-06-07)
- Initial WhatsApp AI Bot setup
- Claude integration
- 6-language support
- Chat widget UI
- Auto language detection

### Planned (v1.1)
- Message history
- Admin dashboard
- Analytics
- CRM integration
