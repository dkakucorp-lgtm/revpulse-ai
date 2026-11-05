import { NextResponse } from 'next/server';

export async function POST(req) {
  const PHONE_NUMBER_ID = 'bcfd68be-6cde-470a-81b0-c064ffd46eec'; // Free native Vapi line
  const BUILD_MARKER = 'native-vapi-number-2026-11-05-a';

  console.log({
    build: BUILD_MARKER,
    vapiPhoneNumberId: PHONE_NUMBER_ID,
    route: 'make-call'
  });

  try {
    const response = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumberId: PHONE_NUMBER_ID,
        assistantId: 'fb665d9a-886c-48c6-a678-b118fb668de8',
        customer: {
          number: '+13212763473',
        },
      }),
    });

    const vapiData = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        build: BUILD_MARKER,
        error: vapiData.message || 'Failed to initiate call with Vapi'
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      build: BUILD_MARKER,
      phoneNumberIdUsed: PHONE_NUMBER_ID,
      vapiResponse: vapiData
    }, { status: 200 });

  } catch (err) {
    console.error('Server error dispatching call:', err);
    return NextResponse.json({
      success: false,
      build: BUILD_MARKER,
      error: err.message
    }, { status: 500 });
  }
}