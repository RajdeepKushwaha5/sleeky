# Contact Section

A contact form component that sends messages directly to your Telegram bot.

## Features

- ✅ Modern, responsive contact form
- ✅ Real-time validation
- ✅ Success/error status messages
- ✅ Formatted messages sent to Telegram
- ✅ Email validation
- ✅ Loading states
- ✅ Clean UI with icons

## Message Format

When someone submits the contact form, you'll receive a Telegram message with:

```
🔔 New Contact Form Submission

👤 Name: [Sender Name]
📧 Email: [Sender Email]

💬 Message:
[Their message content]

⏰ Received: [Timestamp]
```

## Setup

### 1. Telegram Bot Configuration

Add the following environment variables to your `.env.local` file:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_chat_id_here
```

### 2. Navigation

The "Contact" link has been added to the navigation menu after "Projects":

- Blogs
- Projects
- **Contact** ← New!
- Resume

### 3. Page Location

The contact form appears after the Projects section on the homepage:

- Scroll down or click "Contact" in the nav
- Direct link: `/#contact`

## Files Created/Modified

### New Files:

- `src/features/profile/components/contact/index.tsx` - Contact form component
- `src/app/api/contact/route.ts` - API route for Telegram integration
- `.env.local` - Environment variables (gitignored)

### Modified Files:

- `src/config/site.ts` - Added Contact to MAIN_NAV
- `src/app/(app)/(root)/page.tsx` - Added Contact component to page
- `.env.example` - Added Telegram config documentation

## API Endpoint

**POST** `/api/contact`

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to work with you!"
}
```

Response (success):

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

Response (error):

```json
{
  "error": "Error message here"
}
```

## Testing

1. Visit `http://localhost:1408/#contact`
2. Fill out the form with:
   - Your name
   - Your email
   - A test message
3. Click "Send Message"
4. Check your Telegram for the formatted message!

## Security Notes

- Email validation is performed on both client and server
- All user input is sanitized before sending to Telegram
- HTML special characters are escaped to prevent injection
- Environment variables are gitignored
- Rate limiting can be added in the future if needed

## Customization

### Change Message Format

Edit the `formatTelegramMessage` function in `src/app/api/contact/route.ts`:

```typescript
function formatTelegramMessage(data: ContactFormData): string {
  // Customize your message format here
  return `Your custom format`;
}
```

### Add More Fields

1. Add fields to the form in `src/features/profile/components/contact/index.tsx`
2. Update the `ContactFormData` interface in `src/app/api/contact/route.ts`
3. Update the `formatTelegramMessage` function to include new fields

### Styling

The contact form uses your existing design system:

- Border colors: `border-edge`
- Background: `bg-card/50`
- Accent colors: `bg-accent`
- Text colors: `text-foreground`, `text-muted-foreground`

All classes are Tailwind-based and will match your theme automatically.
