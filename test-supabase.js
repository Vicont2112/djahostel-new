require('dotenv').config({ path: '.env.local' });
const { getSupabaseAvailability } = require('./lib/supabase');

async function test() {
  console.log('--- Testing Supabase Availability ---');
  try {
    const availability = await getSupabaseAvailability('2026-04-18', '2026-04-21');
    console.log(JSON.stringify(availability, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
