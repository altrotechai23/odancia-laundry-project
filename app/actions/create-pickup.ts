"use server"

import { supabase } from "@/lib/supabase/client"

interface CreatePickupInput {
  customer_name: string
  phone: string
  services: string[]
  area: string
  address: string
  pickup_date: string
  pickup_time: string
  delivery_fee: number
  notes: string
}

export async function createPickup(
  data: CreatePickupInput
) {
  const { error } = await supabase.from("pickup_requests").insert({
        customer_name: data.customer_name,
        phone: data.phone,
        services: data.services,
        area: data.area,
        address: data.address,
        pickup_date: data.pickup_date,
        pickup_time: data.pickup_time,
        delivery_fee: data.delivery_fee,
        notes: data.notes,
        status: "pending",
      }
  )

  if (error) {
    throw new Error(error.message)
  }

  return {
    success: true,
  }
}