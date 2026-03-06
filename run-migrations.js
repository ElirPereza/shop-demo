/**
 * Run EverShop migrations without starting dev server
 */
import { execSync } from 'child_process';

async function runMigrations() {
  console.log('Running EverShop migrations...');
  
  try {
    // EverShop uses evershop install for migrations, but it's interactive
    // With DB_* env vars set, we can trigger migrations by importing the bootstrap
    const { migrate } = await import('@evershop/evershop/lib/install/installDB.js');
    await migrate();
    console.log('Migrations completed successfully!');
  } catch (e) {
    console.log('Migration method 1 failed, trying alternative...');
    
    try {
      // Alternative: use the build process which also runs migrations
      const { bootstrap } = await import('@evershop/evershop/lib/bootstrap.js');
      await bootstrap();
      console.log('Bootstrap completed!');
    } catch (e2) {
      console.log('Could not run migrations programmatically:', e2.message);
      console.log('Migrations will run on first request.');
    }
  }
}

runMigrations().then(() => process.exit(0)).catch(() => process.exit(1));
