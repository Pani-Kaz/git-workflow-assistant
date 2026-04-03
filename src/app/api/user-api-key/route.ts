import { NextResponse } from "next/server";
import { z } from "zod";
import {
  clearEncryptedUserApiKeyCookie,
  hasUserApiKeyCookie,
  setEncryptedUserApiKeyCookie,
} from "@/lib/security/user-api-key-cookie";

export const runtime = "nodejs";

const saveApiKeySchema = z.object({
  apiKey: z.string().min(20).max(300),
});

function looksLikeOpenAiKey(value: string) {
  return value.startsWith("sk-");
}

export async function GET() {
  const configured = await hasUserApiKeyCookie();

  return NextResponse.json({
    configured,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { apiKey } = saveApiKeySchema.parse(body);

    if (!looksLikeOpenAiKey(apiKey.trim())) {
      return NextResponse.json(
        {
          error: "Invalid API key format",
        },
        { status: 400 },
      );
    }

    await setEncryptedUserApiKeyCookie(apiKey.trim());

    return NextResponse.json({
      success: true,
      configured: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Invalid payload",
      },
      { status: 400 },
    );
  }
}

export async function DELETE() {
  await clearEncryptedUserApiKeyCookie();

  return NextResponse.json({
    success: true,
    configured: false,
  });
}