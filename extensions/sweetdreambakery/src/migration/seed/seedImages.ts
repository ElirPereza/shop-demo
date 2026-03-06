import { insert, select } from "@evershop/postgres-query-builder";
import { info, success, warning } from "@evershop/evershop/lib/log";
import { pool } from "@evershop/evershop/lib/postgres";

/**
 * Seed product images using external URLs directly (Cloudinary)
 * No download needed - images are served directly from Cloudinary CDN
 */
export async function seedProductImages(
  productId: number,
  images: any[]
): Promise<void> {
  if (!images || images.length === 0) return;

  for (let i = 0; i < images.length; i++) {
    const imageData = images[i];
    try {
      const imageUrl = imageData.url;
      
      if (!imageUrl) {
        warning(`  ⚠️  No URL provided for image ${i + 1}`);
        continue;
      }

      // Check if image record already exists
      const existingImage = await select()
        .from("product_image")
        .where("product_image_product_id", "=", productId)
        .and("origin_image", "=", imageUrl)
        .load(pool);

      if (!existingImage) {
        // Save external URL directly to database
        await insert("product_image")
          .given({
            product_image_product_id: productId,
            origin_image: imageUrl,
            is_main: imageData.isMain ? 1 : 0,
          })
          .execute(pool);
        success(`  ✓ Added image: ${imageUrl.substring(0, 60)}...`);
      } else {
        info(`  → Image already exists in database`);
      }
    } catch (e: any) {
      warning(`  ⚠️  Failed to process image ${i + 1}: ${e.message}`);
    }
  }
}
