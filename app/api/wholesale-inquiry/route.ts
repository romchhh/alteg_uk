import { NextRequest, NextResponse } from 'next/server';
import { wholesaleFormSchema } from '@/lib/utils/validators';
import { createLead } from '@/lib/services/bitrix24';

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

    // Create lead in Bitrix24
    const leadData = {
      TITLE: `ALTEG UK Wholesale Inquiry - ${data.company}`,
      NAME: data.contactName,
      COMPANY_TITLE: data.company,
      EMAIL: [{ VALUE: data.email, VALUE_TYPE: 'WORK' }],
      PHONE: [{ VALUE: data.phone, VALUE_TYPE: 'WORK' }],
      COMMENTS: `Wholesale Inquiry\n\nCompany: ${data.company}\nContact: ${data.contactName}\nAnnual Volume: ${data.annualVolume || 'Not specified'}\nProduct Interests: ${data.productInterests?.join(', ') || 'Not specified'}\n\nMessage:\n${data.message || 'No message provided'}`,
      SOURCE_ID: 'WEB',
      SOURCE_DESCRIPTION: 'Website Wholesale Inquiry',
    };

    try {
      const result = await createLead(leadData);
      
      if (result.error) {
        return NextResponse.json(
          { error: result.error_description || result.error || 'Failed to submit inquiry' },
          { status: 500 }
        );
      }

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
      // Still return success if Bitrix24 fails - log for admin review
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
