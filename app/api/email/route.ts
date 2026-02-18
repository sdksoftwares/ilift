import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface User {
  name: string
  company?: string
  email: string
  phone: string
  message?: string
}

interface Item {
  imageUrl: string
  name: string
  category: string
  slug: string
}

export async function POST(req: Request) {
  try {
    const { user, items, type } = await req.json();

    // Determine Recipient based on 'type'
    let recipientEmail = 'info@ilift.co.in'; // Default/Fallback
    let subjectLine = `New Inquiry from ${user.name}`;

    if (type === 'quote') {
      recipientEmail = 'sales@ilift.co.in';
      subjectLine = `RFRO-${Math.floor(Math.random() * 1000)}: Quote Request from ${user.company || user.name}`;
    } else if (type === 'contact') {
      recipientEmail = 'info@ilift.co.in';
      subjectLine = `New Contact Message from ${user.name}`;
    } else if (type === 'support') {
      recipientEmail = 'support@ilift.co.in';
      subjectLine = `Support Request from ${user.name}`;
    }

    // 1. Generate HTML Content based on Type
    let htmlContent = '';

    if (type === 'quote' && items) {
      // Generate HTML Table Rows for Products
      const productRows = items.map((i: any) => `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
              <img src="${i.imageUrl}" alt="${i.name}" width="60" height="60" style="object-fit: cover; border-radius: 6px; border: 1px solid #e2e8f0;" />
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
              <div style="font-weight: bold; color: #0f172a;">${i.name}</div>
              <div style="font-size: 12px; color: #64748b;">${i.category}</div>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 12px; font-family: monospace;">
              ${i.slug}
            </td>
          </tr>
        `).join('');

      htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
            
            <div style="border-bottom: 2px solid #dc2626; padding-bottom: 20px; margin-bottom: 20px;">
              <h2 style="color: #0f172a; margin: 0;">New Quote Request</h2>
              <span style="font-size: 14px; color: #64748b;">Received via iLift Website</span>
            </div>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <h3 style="margin-top: 0; color: #0f172a; font-size: 16px;">Lead Details</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${user.name}</p>
              <p style="margin: 5px 0;"><strong>Company:</strong> ${user.company || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${user.email}" style="color: #dc2626;">${user.email}</a></p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${user.phone}" style="color: #dc2626;">${user.phone}</a></p>
              
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                <strong>Message / Requirements:</strong><br/>
                <p style="margin-top: 5px; font-style: italic;">"${user.message || "No specific notes provided."}"</p>
              </div>
            </div>

            <h3 style="color: #0f172a; font-size: 16px;">Requested Machinery (${items.length})</h3>
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
              <thead>
                <tr>
                  <th style="padding: 10px; border-bottom: 2px solid #e2e8f0; width: 80px;">Image</th>
                  <th style="padding: 10px; border-bottom: 2px solid #e2e8f0;">Product Details</th>
                  <th style="padding: 10px; border-bottom: 2px solid #e2e8f0;">ID</th>
                </tr>
              </thead>
              <tbody>
                ${productRows}
              </tbody>
            </table>
            
            <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #94a3b8;">
               <p>This email was sent automatically from your iLift website.</p>
            </div>
          </div>
        `;
    } else {
      // Generic Contact / Support Email Template
      htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
            <div style="border-bottom: 2px solid #dc2626; padding-bottom: 20px; margin-bottom: 20px;">
              <h2 style="color: #0f172a; margin: 0;">${subjectLine}</h2>
              <span style="font-size: 14px; color: #64748b;">Received via iLift Website</span>
            </div>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <h3 style="margin-top: 0; color: #0f172a; font-size: 16px;">Contact Details</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${user.name}</p>
              <p style="margin: 5px 0;"><strong>Company:</strong> ${user.company || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${user.email}" style="color: #dc2626;">${user.email}</a></p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${user.phone}" style="color: #dc2626;">${user.phone}</a></p>
              
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                <strong>Message:</strong><br/>
                <p style="margin-top: 5px; font-style: italic;">"${user.message || "No message provided."}"</p>
              </div>
            </div>
            
             <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #94a3b8;">
               <p>This email was sent automatically from your iLift website.</p>
             </div>
          </div>
        `;
    }

    // 3. Send via Resend
    const data = await resend.emails.send({
      from: 'website@ilift.co.in', // Verified domain
      to: recipientEmail,
      subject: subjectLine,
      replyTo: user.email, // Replies go directly to the customer
      html: htmlContent,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}