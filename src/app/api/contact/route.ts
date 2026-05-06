import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. SEND HIGH-FIDELITY BRIEFING TO GARV
    const garvEmail = await resend.emails.send({
      from: 'Nexus Dispatch <onboarding@resend.dev>',
      to: 'garvanand03@gmail.com',
      subject: `[SIGNAL DETECTED] Priority Transmission from ${name || 'External Node'}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>
            body { background-color: #050508; color: #ffffff; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
            .wrapper { width: 100%; table-layout: fixed; background-color: #050508; padding-bottom: 60px; }
            .main { max-width: 600px; margin: 0 auto; background-color: #0a0a0f; border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; overflow: hidden; margin-top: 40px; box-shadow: 0 40px 100px rgba(0,0,0,0.8); }
            .header { background: linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%); padding: 60px 40px; text-align: left; position: relative; }
            .header-label { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 6px; color: rgba(0,0,0,0.6); margin-bottom: 8px; }
            .header-title { font-size: 44px; font-weight: 900; color: #000000; line-height: 0.9; text-transform: uppercase; font-style: italic; letter-spacing: -2px; }
            
            .content { padding: 40px; }
            .section-tag { display: inline-block; padding: 4px 12px; background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2); border-radius: 4px; color: #00D4FF; font-family: monospace; font-size: 9px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; }
            
            .data-grid { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            .data-row td { padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .data-key { font-family: monospace; font-size: 10px; color: #55556A; text-transform: uppercase; width: 140px; letter-spacing: 1px; }
            .data-val { font-size: 15px; color: #ffffff; font-weight: 600; }
            
            .payload-box { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; position: relative; }
            .payload-text { font-size: 18px; line-height: 1.6; color: #A0A0B8; font-style: italic; }
            
            .quote-section { padding: 40px; background: #000000; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; }
            .quote-text { font-size: 14px; color: #00D4FF; font-family: Georgia, serif; font-style: italic; line-height: 1.6; margin-bottom: 10px; }
            .quote-author { font-size: 10px; font-family: monospace; color: #55556A; text-transform: uppercase; letter-spacing: 2px; }
            
            .footer { padding: 40px; text-align: center; font-family: monospace; font-size: 10px; color: #33334d; letter-spacing: 2px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="main">
              <div class="header">
                <div class="header-label">Neural Alert // Type_01</div>
                <div class="header-title">Signal<br/>Intercepted</div>
              </div>
              
              <div class="content">
                <div class="section-tag">Source Authentication</div>
                <table class="data-grid">
                  <tr class="data-row">
                    <td class="data-key">Origin Node</td>
                    <td class="data-val">${name || 'Anonymous External'}</td>
                  </tr>
                  <tr class="data-row">
                    <td class="data-key">Return Route</td>
                    <td class="data-val">${email}</td>
                  </tr>
                  <tr class="data-row">
                    <td class="data-key">Encryption</td>
                    <td class="data-val">AES-256-GCM / Verified</td>
                  </tr>
                </table>
                
                <div class="section-tag">Core Payload</div>
                <div class="payload-box">
                  <div class="payload-text">"${message}"</div>
                </div>
              </div>
              
              <div class="quote-section">
                <div class="quote-text">"Intelligence is the ability to adapt to change."</div>
                <div class="quote-author">— Stephen Hawking</div>
              </div>
              
              <div class="footer">
                GA-CORTEX SYSTEM // LOG_ID: ${Math.random().toString(36).substring(7).toUpperCase()} // ${new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // 2. SEND IMMERSIVE ACKNOWLEDGMENT TO SENDER
    const userEmail = await resend.emails.send({
      from: 'Garv Anand <onboarding@resend.dev>',
      to: email,
      subject: `[HANDSHAKE COMPLETE] Your Signal is Integrated`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { background-color: #050508; color: #ffffff; font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
            .wrapper { width: 100%; background-color: #050508; padding-top: 60px; padding-bottom: 60px; }
            .card { max-width: 600px; margin: 0 auto; background: #08080c; border: 1px solid rgba(0,212,255,0.1); border-radius: 32px; overflow: hidden; }
            
            .hero { padding: 80px 40px; text-align: center; background: radial-gradient(circle at center, rgba(0,212,255,0.1) 0%, transparent 70%); border-bottom: 1px solid rgba(255,255,255,0.05); }
            .orb { width: 80px; height: 80px; background: #00FF87; border-radius: 50%; margin: 0 auto 30px; box-shadow: 0 0 50px rgba(0,255,135,0.6); }
            .hero-title { font-size: 48px; font-weight: 900; font-style: italic; text-transform: uppercase; letter-spacing: -2px; margin-bottom: 12px; }
            .hero-title span { color: #00FF87; }
            .hero-sub { font-family: monospace; font-size: 10px; color: #55556A; text-transform: uppercase; letter-spacing: 4px; }
            
            .body { padding: 60px 50px; text-align: center; }
            .message { font-size: 18px; line-height: 1.8; color: #8B8BA7; margin-bottom: 48px; }
            
            .node-grid { margin-bottom: 60px; }
            .node-link { display: block; background: #ffffff; color: #000000; padding: 20px; border-radius: 16px; font-weight: 900; text-transform: uppercase; text-decoration: none; font-size: 14px; letter-spacing: 1px; margin-bottom: 12px; text-align: center; }
            .node-link.secondary { background: rgba(255,255,255,0.05); color: #ffffff; border: 1px solid rgba(255,255,255,0.1); }
            
            .quote-block { padding: 40px; background: rgba(255,255,255,0.02); border-radius: 20px; margin-bottom: 40px; }
            .quote { font-family: Georgia, serif; italic; font-size: 16px; color: #ffffff; line-height: 1.6; margin-bottom: 10px; }
            .author { font-family: monospace; font-size: 9px; color: #55556A; text-transform: uppercase; letter-spacing: 2px; }
            
            .footer { padding-bottom: 40px; text-align: center; }
            .footer-text { font-family: monospace; font-size: 9px; color: #33334d; text-transform: uppercase; letter-spacing: 2px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="hero">
                <div class="orb"></div>
                <div class="hero-title">Sync <span>Locked.</span></div>
                <div class="hero-sub">Transmission Successful</div>
              </div>
              
              <div class="body">
                <div class="message">
                  Your packet has traversed the latent space and successfully integrated into my primary cognition. I will analyze the contents and provide a response within 24 hours.
                </div>
                
                <div class="quote-block">
                  <div class="quote">"Technology is best when it brings people together."</div>
                  <div class="author">— Matt Mullenweg</div>
                </div>
                
                <div class="node-grid">
                  <div style="font-family: monospace; font-size: 9px; color: #55556A; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Establish Parallel Link</div>
                  <a href="https://linkedin.com/in/garv-anand-1bb36b270" class="node-link">Connect on LinkedIn</a>
                  <a href="https://github.com/Garvanand" class="node-link secondary">View Source Code</a>
                  <a href="https://wa.me/918054182892" class="node-link secondary">Instant WhatsApp</a>
                </div>
              </div>
              
              <div class="footer">
                <div class="footer-text">© 2027 GARV ANAND // NEURAL NEXUS // APAC-01</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    return NextResponse.json({ success: true, garvEmail, userEmail });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Transmission Interrupted' }, { status: 500 });
  }
}
