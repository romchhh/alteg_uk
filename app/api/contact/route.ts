import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/utils/validators';
import { createLead, Bitrix24Lead } from '@/lib/services/bitrix24';
import { sendTelegramMessage } from '@/lib/services/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validationResult = contactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const formType = (body as { formType?: string }).formType === 'request_individual_quote' ? 'Request individual quote' : 'Contact Form';
    const isB2B = formType === 'Request individual quote';
    const leadTitle = isB2B ? `Lead web B2B — ${data.name} — ${data.phone}` : `Lead web B2C — ${data.name} — ${data.phone}`;

    // Create lead in Bitrix24
    const leadData: Bitrix24Lead = {
      TITLE: leadTitle,
      NAME: data.name,
      EMAIL: [],
      PHONE: [{ VALUE: data.phone, VALUE_TYPE: 'WORK' }],
      COMMENTS: `Form type: ${formType}\n\nName: ${data.name}\nPhone: ${data.phone}\n\nWhat interests them:\n${data.interest}`,
      SOURCE_ID: 'WEB',
      SOURCE_DESCRIPTION: isB2B ? 'Lead web B2B' : 'Lead web B2C',
    };

    try {
      const result = await createLead(leadData);
      
      if (result.error) {
        return NextResponse.json(
          { error: result.error_description || result.error || 'Failed to submit contact form' },
          { status: 500 }
        );
      }

      const lines = [
        '<b>📩 Contact form submission</b>',
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Interest: ${data.interest}`,
      ];
      sendTelegramMessage(lines.join('\n')).catch(() => {});

      return NextResponse.json(
        { 
          success: true, 
          leadId: result.result?.toString(),
          message: 'Contact form submitted successfully. Our team will contact you soon.' 
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Bitrix24 error:', error);
      const lines = [
        '<b>📩 Contact form submission</b>',
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Interest: ${data.interest}`,
      ];
      sendTelegramMessage(lines.join('\n')).catch(() => {});
      return NextResponse.json(
        { 
          success: true, 
          message: 'Contact form received. Our team will contact you soon.' 
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
