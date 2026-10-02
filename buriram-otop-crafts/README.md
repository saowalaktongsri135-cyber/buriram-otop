# ศูนย์รวมข้อมูล OTOP และหัตถกรรมพื้นบ้านจังหวัดบุรีรัมย์

## เหตุผลการเลือกใช้ Framework และ Library

โปรเจกต์นี้เลือกใช้ **Tailwind CSS** เป็น CSS Framework หลักเนื่องจากมี Utility Classes ที่ช่วยให้การจัดวาง Layout แบบ Flexbox/Grid รองรับ Responsive บนมือถือ และทำระบบสลับธีมมืด/สว่าง (Dark Mode) ได้อย่างรวดเร็วโดยไม่ต้องเขียน CSS แยกต่างหาก รวมทั้งเลือกใช้ **Font Awesome** สำหรับไอคอนประกอบอินเทอร์เฟซเพื่อเพิ่มความสวยงาม สื่อความหมายชัดเจน และช่วยปรับปรุงประสบการณ์การใช้งาน (UX) ของผู้ใช้ให้ดียิ่งขึ้น

---

## 🧪 ผลการทดสอบและแก้ไขข้อผิดพลาด (Testing & Bug Fixes)

ทดสอบผ่าน Chrome DevTools, Google Lighthouse และ W3C HTML Validator:

| ลำดับ | รายการทดสอบ / เครื่องมือ | ปัญหาที่พบ (Bug / Warning) | วิธีการแก้ไข (Solution) |
| :---: | :--- | :--- | :--- |
| **1** | **CORS Error**<br>*(Chrome Console)* | เกิดข้อผิดพลาด `Fetch API cannot load file://` เมื่อดับเบิลคลิกเปิดหน้า `listing.html` โดยไม่ใช้ Web Server | ปรับจากการดึงไฟล์ JSON มาใช้การดึง **Open-Meteo API** จริงผ่านโปรโตคอล `https://` และฝังข้อมูลสินค้าลงใน JavaScript เพื่อรองรับการเปิดอ่านไฟล์ท้องถิ่น |
| **2** | **Lighthouse (SEO & Accessibility)** | Lighthouse แจ้งเตือนว่าปุ่มสลับธีมไม่มีแท็กกำกับ (`Button lacks an accessible name`) และขาด `<meta name="description">` | เพิ่ม attribute `aria-label="สลับโหมดสว่าง/มืด"` ที่ปุ่ม และเพิ่ม `<meta name="description">` ที่มีเนื้อหาเฉพาะในแต่ละหน้า |
| **3** | **W3C HTML Validator** | พบบั๊ก Warning เกี่ยวกับการใช้งานแท็ก Heading ข้ามระดับ (เช่น จาก `<h1>` ข้ามไป `<h3>`) ในหน้า `index.html` | ปรับโครงสร้างลำดับ Heading ใหม่ให้เรียงถูกต้องตามลำดับชั้น HTML5 (`<h1>` -> `<h2>` -> `<h3>`) อย่างเคร่งครัด |

---

## 🎯 สรุปการปฏิบัติตามมาตรฐาน SEO
* **Title & Meta Description:** กำหนดข้อความเฉพาะตัวไม่ซ้ำกันในทุกหน้า
* **Heading Structure:** แต่ละหน้ามี `<h1>` เพียงหนึ่งเดียว และเรียงลำดับ Heading ถูกต้อง
* **Image Alt Attributes:** รูปภาพทุกรูปมีการใส่ข้อความ `alt` บรรยายความหมายชัดเจน
* **Open Graph Tags:** มีการระบุ `og:title`, `og:description`, `og:image`, `og:type` ครบถ้วน