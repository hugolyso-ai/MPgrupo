import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  attachment?: {
    filename: string;
    content: string;
    contentType: string;
  };
  simulationData?: {
    operadora_atual: string;
    operadora_interesse?: string;
    potencia: number;
    poupanca_estimada?: number;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const data: ContactEmailRequest = await req.json();

    let emailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #2c1810; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #d4af37; margin: 0;">Novo Pedido de Contacto</h1>
            </div>

            <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #2c1810; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
                ${data.subject}
              </h2>

              <div style="margin: 20px 0;">
                <h3 style="color: #2c1810; font-size: 16px;">Dados do Cliente:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 120px;">Nome:</td>
                    <td style="padding: 8px 0;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0;">${data.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Telefone:</td>
                    <td style="padding: 8px 0;">${data.phone}</td>
                  </tr>
                </table>
              </div>
    `;

    if (data.simulationData) {
      emailHtml += `
              <div style="margin: 20px 0; padding: 15px; background-color: #f0f0f0; border-radius: 5px;">
                <h3 style="color: #2c1810; font-size: 16px; margin-top: 0;">Dados da Simulação:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 180px;">Operadora Atual:</td>
                    <td style="padding: 8px 0;">${data.simulationData.operadora_atual}</td>
                  </tr>
                  ${data.simulationData.operadora_interesse ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Operadora de Interesse:</td>
                    <td style="padding: 8px 0;">${data.simulationData.operadora_interesse}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Potência:</td>
                    <td style="padding: 8px 0;">${data.simulationData.potencia} kVA</td>
                  </tr>
                  ${data.simulationData.poupanca_estimada ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Poupança Estimada:</td>
                    <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">
                      ${data.simulationData.poupanca_estimada.toFixed(2)}€/ano
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>
      `;
    }

    if (data.message) {
      emailHtml += `
              <div style="margin: 20px 0;">
                <h3 style="color: #2c1810; font-size: 16px;">Mensagem:</h3>
                <p style="padding: 15px; background-color: #f9f9f9; border-left: 3px solid #d4af37; margin: 10px 0;">
                  ${data.message.replace(/\n/g, '<br>')}
                </p>
              </div>
      `;
    }

    if (data.attachment) {
      emailHtml += `
              <div style="margin: 20px 0; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
                <p style="margin: 0; color: #2c1810;">
                  <strong>📎 Anexo:</strong> ${data.attachment.filename}
                </p>
              </div>
      `;
    }

    emailHtml += `
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
                <p>Este email foi enviado através do formulário de contacto de mpgrupo.pt</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailPayload: {
      from: string;
      to: string[];
      cc?: string[];
      subject: string;
      html: string;
      attachments?: Array<{
        filename: string;
        content: string;
      }>;
    } = {
      from: "MPgrupo <info@mpgrupo.pt>",
      to: ["hugo.martins@mpgrupo.pt"],
      cc: ["marcio.pinto@mpgrupo.pt"],
      subject: `[Contacto Website] ${data.subject} - ${data.name}`,
      html: emailHtml,
    };

    if (data.attachment) {
      emailPayload.attachments = [
        {
          filename: data.attachment.filename,
          content: data.attachment.content,
        },
      ];
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const result = await resendResponse.json();

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
