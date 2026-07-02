import { auth } from "@/lib/auth/server";
import type { NextRequest } from "next/server";

export const GET = (request: NextRequest, context: { params: Promise<{ path: string[] }> }) =>
  auth.handler().GET(request, context);

export const POST = (request: NextRequest, context: { params: Promise<{ path: string[] }> }) =>
  auth.handler().POST(request, context);
