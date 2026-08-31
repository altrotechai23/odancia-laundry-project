"use server";

import { createClient } from "@supabase/supabase-js";

interface CreatePickupInput {
  customer_name: string;
  phone: string;
  email: string;
  services: string[];
  area: string;
  address: string;
  pickup_date: string;
  pickup_time: string;
  delivery_fee: number;
  notes: string;
}

function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing from the server environment.",
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing from the server environment.",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function createPickup(
  data: CreatePickupInput,
) {
  const {
    customer_name,
    phone,
    email,
    services,
    area,
    address,
    pickup_date,
    pickup_time,
    delivery_fee,
    notes,
  } = data;

  if (!customer_name?.trim()) {
    throw new Error("Please enter your name.");
  }

  if (!phone?.trim()) {
    throw new Error("Please enter your mobile number.");
  }

  if (!services?.length) {
    throw new Error("Please select at least one service.");
  }

  if (!area?.trim()) {
    throw new Error("Please select your area.");
  }

  if (!address?.trim()) {
    throw new Error(
      "Please enter your collection address.",
    );
  }

  if (!pickup_date) {
    throw new Error(
      "Please select a pickup date.",
    );
  }

  if (!pickup_time) {
    throw new Error(
      "Please select a pickup time.",
    );
  }

  const supabase = getSupabaseServer();

  try {
    const { data: pickup, error } = await supabase
      .from("pickup_requests")
      .insert({
        customer_name: customer_name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        services,
        area: area.trim(),
        address: address.trim(),
        pickup_date,
        pickup_time,
        delivery_fee: Number(delivery_fee) || 0,
        notes: notes?.trim() || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("SUPABASE ERROR:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      throw new Error(
        `Supabase error: ${error.message}`,
      );
    }

    if (!pickup?.id) {
      throw new Error(
        "Pickup was created but no booking ID was returned.",
      );
    }

    return {
      success: true,
      bookingId: String(pickup.id),
    };
  } catch (error) {
    console.error("CREATE PICKUP FAILED:", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(
      "Unable to connect to Supabase.",
    );
  }
}