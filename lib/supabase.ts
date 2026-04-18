import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Room = {
  id: string
  name: string
  capacity: number
  price_per_night: number
  currency: string
  image_url: string
}

export type Bed = {
  id: string
  room_id: string
  bed_name: string
  is_active: boolean
}

export type Booking = {
  id: string
  room_id: string
  bed_id: string
  guest_name: string
  email?: string
  phone?: string
  check_in: string
  check_out: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'checked_in' | 'checked_out'
  total_price: number
  note?: string
  source: string
}

export interface BedAvailability {
  bedId: string;
  bedName: string;
  isAvailable: boolean;
  booking?: Partial<Booking>;
}

export interface RoomAvailability {
  roomId: string;
  roomName: string;
  beds: BedAvailability[];
}

/**
 * Fetches availability for a specific date range.
 * Logic: A bed is unavailable if it has a non-cancelled booking overlap.
 */
export async function getSupabaseAvailability(checkIn: string, checkOut: string): Promise<RoomAvailability[]> {
  // 1. Fetch Rooms and Beds in parallel
  const [roomsRes, bedsRes, bookingsRes] = await Promise.all([
    supabase.from('rooms').select('*').order('name'),
    supabase.from('beds').select('*').order('bed_name'),
    supabase.from('bookings')
      .select('*')
      .neq('status', 'cancelled')
      // Overlap condition: booking.check_in < checkOut AND booking.check_out > checkIn
      .lt('check_in', checkOut)
      .gt('check_out', checkIn)
  ]);

  if (roomsRes.error) throw new Error(`Rooms fetch error: ${roomsRes.error.message}`);
  if (bedsRes.error) throw new Error(`Beds fetch error: ${bedsRes.error.message}`);
  if (bookingsRes.error) throw new Error(`Bookings fetch error: ${bookingsRes.error.message}`);

  const rooms = roomsRes.data as Room[];
  const beds = bedsRes.data as Bed[];
  const bookings = bookingsRes.data as Booking[];

  // 2. Map availability
  const availability: RoomAvailability[] = rooms.map(room => {
    const roomBeds = beds.filter(b => b.room_id === room.id);
    
    return {
      roomId: room.id,
      roomName: room.name,
      beds: roomBeds.map(bed => {
        const activeBooking = bookings.find(b => b.bed_id === bed.id);
        return {
          bedId: bed.id,
          bedName: bed.bed_name,
          isAvailable: !activeBooking,
          booking: activeBooking ? { 
            guest_name: activeBooking.guest_name,
            status: activeBooking.status 
          } : undefined
        };
      })
    };
  });

  return availability;
}
