-- Schema for Dja Hostel (Level 2)
-- To be executed in Supabase SQL Editor

-- 1. Rooms Catalog
CREATE TABLE rooms (
  id TEXT PRIMARY KEY, -- female-4a, male-8, etc.
  name TEXT NOT NULL,
  description TEXT,
  capacity INTEGER NOT NULL,
  price_per_night NUMERIC NOT NULL DEFAULT 600,
  currency TEXT NOT NULL DEFAULT 'UAH',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Beds (Individual beds for fine-grained availability)
CREATE TABLE beds (
  id TEXT PRIMARY KEY, -- P-1, P-2, Z-1, etc.
  room_id TEXT REFERENCES rooms(id),
  bed_name TEXT NOT NULL, -- "П-1", "З-4"
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT REFERENCES rooms(id),
  bed_id TEXT REFERENCES beds(id), -- Optional if we auto-assign or manually assign later
  guest_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled', 'checked_in', 'checked_out'
  total_price NUMERIC,
  note TEXT,
  source TEXT DEFAULT 'direct', -- 'direct', 'booking.com', 'telegram'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Initial Seed Data
INSERT INTO rooms (id, name, capacity, price_per_night, image_url) VALUES
('female-4a', 'Персик (Peach)', 4, 600, '/media/rooms/women1-1.jpg'),
('female-4b', 'Зелена (Green)', 4, 600, '/media/rooms/women2-1.jpg'),
('male-8', 'Бордо (Bordeaux)', 8, 550, '/media/rooms/men4-1.jpg'),
('mixed-8', 'Синя (Blue)', 8, 500, '/media/rooms/men3-1.jpg')
ON CONFLICT (id) DO NOTHING;

-- Seed beds
INSERT INTO beds (id, room_id, bed_name) VALUES
('P-1', 'female-4a', 'П-1'), ('P-2', 'female-4a', 'П-2'), ('P-3', 'female-4a', 'П-3'), ('P-4', 'female-4a', 'П-4'),
('Z-1', 'female-4b', 'З-1'), ('Z-2', 'female-4b', 'З-2'), ('Z-3', 'female-4b', 'З-3'), ('Z-4', 'female-4b', 'З-4'),
('B-1', 'male-8', 'Б-1'), ('B-2', 'male-8', 'Б-2'), ('B-3', 'male-8', 'Б-3'), ('B-4', 'male-8', 'Б-4'),
('B-5', 'male-8', 'Б-5'), ('B-6', 'male-8', 'Б-6'), ('B-7', 'male-8', 'Б-7'), ('B-8', 'male-8', 'Б-8'),
('S-1', 'mixed-8', 'С-1'), ('S-2', 'mixed-8', 'С-2'), ('S-3', 'mixed-8', 'С-3'), ('S-4', 'mixed-8', 'С-4'),
('S-5', 'mixed-8', 'С-5'), ('S-6', 'mixed-8', 'С-6'), ('S-7', 'mixed-8', 'С-7'), ('S-8', 'mixed-8', 'С-8')
ON CONFLICT (id) DO NOTHING;
