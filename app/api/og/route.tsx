import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050508',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 100,
              fontFamily: 'sans-serif',
              fontWeight: 800,
              color: '#F0F0FF',
              margin: 0,
              letterSpacing: '-0.05em',
            }}
          >
            Garv Anand
          </h1>
          <p
            style={{
              fontSize: 32,
              fontFamily: 'monospace',
              color: '#8B8BA7',
              marginTop: 24,
              letterSpacing: '0.05em',
            }}
          >
            AI/ML Engineer · VIT · GenAI @ ROVA
          </p>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            backgroundColor: '#00D4FF',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
