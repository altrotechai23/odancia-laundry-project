"use server";

import { createClient } from "@supabase/supabase-js";

export async function testSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log("SUPABASE URL:", url);
  console.log(
    "SERVICE ROLE KEY EXISTS:",
    Boolean(key),
  );

  if (!url) {
    return {
      success: false,
      error: "NEXT_PUBLIC_SUPABASE_URL is missing",
    };
  }

  if (!key) {
    return {
      success: false,
      error: "SUPABASE_SERVICE_ROLE_KEY is missing",
    };
  }

  try {
    const supabase = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error } = await supabase
      .from("pickup_requests")
      .select("id")
      .limit(1);

    if (error) {
      console.error("SUPABASE TEST ERROR:", error);

      return {
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      };
    }

    return {
      success: true,
      message: "Supabase connection is working.",
      rows: data?.length ?? 0,
    };
  } catch (error) {
    console.error("SUPABASE CONNECTION FAILED:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : String(error),
    };
  }
}