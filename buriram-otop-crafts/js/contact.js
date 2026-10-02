document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // 1. ตรวจสอบชื่อ
    const fullname = document.getElementById("fullname");
    const nameError = document.getElementById("name-error");
    if (fullname.value.trim() === "") {
      nameError.classList.remove("hidden");
      isValid = false;
    } else {
      nameError.classList.add("hidden");
    }

    // 2. ตรวจสอบอีเมล
    const email = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const emailPattern = /^[^s@]+@[^s@]+.[^s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      emailError.classList.remove("hidden");
      isValid = false;
    } else {
      emailError.classList.add("hidden");
    }

    // 3. ตรวจสอบเบอร์โทรศัพท์
    const phone = document.getElementById("phone");
    const phoneError = document.getElementById("phone-error");
    const phonePattern = /^[0-9]{9,10}$/;
    if (!phonePattern.test(phone.value.trim())) {
      phoneError.classList.remove("hidden");
      isValid = false;
    } else {
      phoneError.classList.add("hidden");
    }

    // 4. ตรวจสอบข้อความ
    const message = document.getElementById("message");
    const messageError = document.getElementById("message-error");
    if (message.value.trim().length < 10) {
      messageError.classList.remove("hidden");
      isValid = false;
    } else {
      messageError.classList.add("hidden");
    }

    if (isValid) {
      alert("ขอบคุณสำหรับการติดต่อ! ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว");
      form.reset();
    }
  });
});