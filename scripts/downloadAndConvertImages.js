import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import sharp from "sharp";

const IMAGE_DIR = "./public/images"; // ระบุที่เก็บไฟล์
const API_URL = "https://blog-post-project-api.vercel.app/posts"; // URL ของ API ที่ให้ข้อมูล
const AUTHOR_IMAGE_URL = "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"; // URL ของรูป author

// สร้างโฟลเดอร์ที่เก็บรูป (ถ้ายังไม่มี)
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

async function downloadAndSaveAuthorImage() {
  try {
    // ดาวน์โหลดรูปจาก URL ของ author
    const imageRes = await fetch(AUTHOR_IMAGE_URL);
    if (!imageRes.ok) {
      console.error(`Failed to fetch image from ${AUTHOR_IMAGE_URL}`);
      return;
    }

    // แปลงเป็น buffer แล้วใช้ sharp ในการแปลงรูปเป็น .webp
    const buffer = await imageRes.buffer();
    const fileName = "author-image.webp"; // ตั้งชื่อไฟล์
    const filePath = path.join(IMAGE_DIR, fileName);

    await sharp(buffer)
      .webp() // แปลงเป็น .webp
      .toFile(filePath); // บันทึกไฟล์ลงใน local

    console.log(`✅ Saved author image as .webp: ${fileName}`);
  } catch (err) {
    console.error("❌ Error during download and conversion:", err);
  }
}

async function downloadAndConvertImagesFromAPI() {
  try {
    const res = await fetch(API_URL);
    const { posts } = await res.json();

    // ตรวจสอบว่า posts เป็น array
    if (!Array.isArray(posts)) {
      console.error("Invalid response: posts is not an array");
      return;
    }

    // ลูปดาวน์โหลดแต่ละรูปจาก API
    for (const post of posts) {
      const imageUrl = post.image; // สมมติว่ารูปอยู่ใน field 'image'
      const fileName = `${post.id}.webp`; // ใช้ชื่อไฟล์ตาม ID ของโพสต์ และเปลี่ยนเป็น .webp
      const filePath = path.join(IMAGE_DIR, fileName);

      // ดาวน์โหลดรูปจาก API
      const imageRes = await fetch(imageUrl);
      if (!imageRes.ok) {
        console.error(`Failed to fetch image from ${imageUrl}`);
        continue;
      }

      // แปลงเป็น buffer แล้วใช้ sharp ในการแปลงรูปเป็น .webp
      const buffer = await imageRes.buffer();
      await sharp(buffer)
        .webp() // แปลงเป็น .webp
        .toFile(filePath); // บันทึกไฟล์ลงใน local

      console.log(`✅ Saved image as .webp: ${fileName}`);
    }
  } catch (err) {
    console.error("❌ Error during download and conversion:", err);
  }
}

// เรียกใช้ทั้งสองฟังก์ชั่น
downloadAndSaveAuthorImage(); // ดาวน์โหลดและบันทึกรูป author
downloadAndConvertImagesFromAPI(); // ดาวน์โหลดและบันทึกรูปจาก API
