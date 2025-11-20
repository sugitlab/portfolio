import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { getIconSVG } from '../../lib/iconTypes';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get the title and icon from query parameters
    const title = searchParams.get('title') || 'Blog Post';
    const iconType = searchParams.get('icon') || 'info';
    const iconSVG = getIconSVG(iconType);

    // Fetch the avatar image and convert to base64
    const avatarResponse = await fetch(new URL('/avatar.svg', req.url));
    const avatarArrayBuffer = await avatarResponse.arrayBuffer();
    const avatarBase64 = Buffer.from(avatarArrayBuffer).toString('base64');
    const avatarDataUrl = `data:image/svg+xml;base64,${avatarBase64}`;

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
            backgroundImage: 'linear-gradient(135deg, #E0F7FA 0%, #E8F5E9 100%)', // Light Cyan to Light Green gradient
            position: 'relative',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Decorative Circles for Pop/Cute effect */}
          <div
            style={{
              position: 'absolute',
              top: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -20,
              right: -20,
              width: 150,
              height: 150,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 50,
              right: 100,
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(180, 240, 180, 0.4)', // Light Greenish
            }}
          />
          {/* Icon and Title in the center */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 100px',
              maxWidth: '90%',
            }}
          >
            {/* Icon */}
            <div
              style={{
                marginRight: 30,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {iconSVG}
            </div>
            {/* Title */}
            <div
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                color: '#1a1a1a',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              {title}
            </div>
          </div>

          {/* Avatar and Author at the bottom left */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              left: 40,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 5,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={avatarDataUrl}
                alt="Avatar"
                width="50"
                height="50"
                style={{
                  borderRadius: '50%',
                }}
              />
            </div>
            <div
              style={{
                marginLeft: 15,
                fontSize: 24,
                fontWeight: 'bold',
                color: '#4B5563', // Gray-600
                fontFamily: 'sans-serif',
              }}
            >
              by sugitlab.
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
