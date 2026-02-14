import { NextRequest, NextResponse } from 'next/server';
import { wholesaleFormSchema } from '@/lib/utils/validators';
import { createLead } from '@/lib/services/bitrix24';
import { sendTelegramMessage } from '@/lib/services/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validationResult = wholesaleFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Create lead in Bitrix24 — Lead web B2B, phone + name in title, form type in comments
    const attachmentLine = data.attachmentUrl ? `\nAttachment: ${data.attachmentUrl}` : '';
    const leadData = {
      TITLE: `Lead web B2B — ${data.contactName} — ${data.phone}`,
      NAME: data.contactName,
      COMPANY_TITLE: data.company,
      EMAIL: [{ VALUE: data.email, VALUE_TYPE: 'WORK' }],
      PHONE: [{ VALUE: data.phone, VALUE_TYPE: 'WORK' }],
      COMMENTS: `Form type: Wholesale order - get a quote\n\nCompany: ${data.company}\nContact: ${data.contactName}\nPhone: ${data.phone}\nAnnual Volume: ${data.annualVolume || 'Not specified'}\nProduct Interests: ${data.productInterests?.join(', ') || 'Not specified'}\n\nMessage:\n${data.message || 'No message provided'}${attachmentLine}`,
      SOURCE_ID: 'WEB',
      SOURCE_DESCRIPTION: 'Lead web B2B',
    };

    try {
      const result = await createLead(leadData);
      
      if (result.error) {
        return NextResponse.json(
          { error: result.error_description || result.error || 'Failed to submit inquiry' },
          { status: 500 }
        );
      }

      const lines = [
        '<b>🏢 Wholesale inquiry</b>',
        `Company: ${data.company}`,
        `Contact: ${data.contactName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        data.annualVolume ? `Annual volume: ${data.annualVolume}` : '',
        data.productInterests?.length ? `Products: ${data.productInterests.join(', ')}` : '',
        data.message ? `Message: ${data.message}` : '',
        data.attachmentUrl ? `Attachment: ${data.attachmentUrl}` : '',
      ].filter(Boolean);
      sendTelegramMessage(lines.join('\n')).catch(() => {});

      return NextResponse.json(
        { 
          success: true, 
          leadId: result.result?.toString(),
          message: 'Wholesale inquiry submitted successfully. Our team will contact you soon.' 
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Bitrix24 error:', error);
      const lines = [
        '<b>🏢 Wholesale inquiry</b>',
        `Company: ${data.company}`,
        `Contact: ${data.contactName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        data.annualVolume ? `Annual volume: ${data.annualVolume}` : '',
        data.productInterests?.length ? `Products: ${data.productInterests.join(', ')}` : '',
        data.message ? `Message: ${data.message}` : '',
        data.attachmentUrl ? `Attachment: ${data.attachmentUrl}` : '',
      ].filter(Boolean);
      sendTelegramMessage(lines.join('\n')).catch(() => {});
      return NextResponse.json(
        { 
          success: true, 
          message: 'Inquiry received. Our team will contact you soon.' 
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error processing wholesale inquiry:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
