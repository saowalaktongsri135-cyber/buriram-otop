document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------
  // 1. ดึงข้อมูล API สภาพอากาศ (Open-Meteo)
  // ----------------------------------------------------
  async function fetchBuriramWeather() {
    const weatherContainer = document.getElementById("weather-container");
    if (!weatherContainer) return;

    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=14.993&longitude=103.102&current_weather=true";

    try {
      weatherContainer.innerHTML = `
        <div class="flex items-center justify-center gap-2 text-stone-500 py-2">
          <i class="fas fa-spinner fa-spin"></i> กำลังโหลดข้อมูลสภาพอากาศ...
        </div>
      `;

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Weather API Error");

      const data = await response.json();
      const weather = data.current_weather;

      weatherContainer.innerHTML = `
        <div class="flex items-center justify-between bg-amber-100/80 dark:bg-stone-800 p-4 rounded-xl border border-amber-200/60 dark:border-stone-700 shadow-sm">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-cloud-sun text-3xl text-amber-600 dark:text-amber-400"></i>
            <div>
              <p class="font-bold text-stone-800 dark:text-stone-100">สภาพอากาศ อ.เมืองบุรีรัมย์ วันนี้</p>
              <p class="text-xs text-stone-500 dark:text-stone-400">อัปเดตเรียลไทม์จาก Open-Meteo API</p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-2xl font-extrabold text-amber-700 dark:text-amber-400">${weather.temperature} °C</span>
            <p class="text-xs text-stone-600 dark:text-stone-400"><i class="fa-solid fa-wind mr-1"></i>ความเร็วลม ${weather.windspeed} km/h</p>
          </div>
        </div>
      `;
    } catch (error) {
      console.error(error);
      weatherContainer.innerHTML = `
        <div class="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
          <i class="fas fa-exclamation-triangle mr-1"></i> ไม่สามารถดึงข้อมูลสภาพอากาศได้ในขณะนี้
        </div>
      `;
    }
  }

  fetchBuriramWeather();

  // ----------------------------------------------------
  // 2. ข้อมูลสินค้า OTOP จริงของบุรีรัมย์
  // ----------------------------------------------------
  const productList = document.getElementById("product-list");
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");

  const allProducts = [
    {
      id: 1,
      name: "ผ้าซิ่นตีนแดงบุรีรัมย์",
      categoryName: "ผ้าทอและเครื่องแต่งกาย",
      category: "woven",
      district: "อำเภอพุทไธสง",
      star: 5,
      price: 2500,
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
      description: "ผ้าทอเอกลักษณ์อันโดดเด่นของบุรีรัมย์ มีลักษณะเฉพาะคือหัวซิ่นและตีนแดง ทอมือด้วยไหมแท้เส้นลวดลายโบราณ นุ่มนวล ทนทาน และมีคุณค่าทางวัฒนธรรมสูง",
      group: "กลุ่มสตรีทอผ้าไหมบ้านนายาว",
      phone: "081-234-5678"
    },
    {
      id: 2,
      name: "เสื่อกกสานมือลายโบราณ",
      categoryName: "งานสานและของตกแต่ง",
      category: "crafts",
      district: "อำเภอนางรอง",
      star: 4,
      price: 550,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
      description: "เสื่อกกทอมือจากต้นกกธรรมชาติ คัดสรรเส้นกกคุณภาพดี ย้อมสีธรรมชาติ ยืดหยุ่น ทนทาน ไม่เป็นเชื้อราง่าย เหมาะสำหรับใช้นั่งพักผ่อนหรือตกแต่งบ้านสไตล์มินิมอล",
      group: "วิสาหกิจชุมชนหัตถกรรมเสื่อกกนางรอง",
      phone: "089-876-5432"
    },
    {
      id: 3,
      name: "เครื่องปั้นดินเผาประยุกต์",
      categoryName: "งานสานและของตกแต่ง",
      category: "crafts",
      district: "อำเภอเมืองบุรีรัมย์",
      star: 4,
      price: 450,
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
      description: "เครื่องปั้นดินเผาดินศิลาแหล่งบุรีรัมย์ ปั้นขึ้นรูปด้วยมือ ผสมผสานลวดลายปราสาทหินพนมรุ้ง ปล่อยเนื้อสัมผัสธรรมชาติน่าสะสม และใช้งานได้จริง",
      group: "กลุ่มหัตถกรรมดินเผาบ้านหนองโสน",
      phone: "086-112-2334"
    },
    {
      id: 4,
      name: "สมุนไพรประคบกายชุมชน",
      categoryName: "สมุนไพรและของใช้",
      category: "herbs",
      district: "อำเภอสตึก",
      star: 5,
      price: 180,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      description: "ลูกประคบสมุนไพรสดสูตรโบราณ รวบรวมไพล ขมิ้น ตะไคร้หอม และผิวมะกรูดจากสวนเกษตรอินทรีย์ ช่วยคลายเส้น ลดปวดเมื่อย และบรรเทาความเหนื่อยล้า",
      group: "กลุ่มแปรรูปสมุนไพรพื้นบ้านสตึก",
      phone: "084-556-7788"
    }
  ];

  // ----------------------------------------------------
  // 3. แสดงผลการ์ดสินค้า
  // ----------------------------------------------------
  function renderProducts(products) {
    if (!productList) return;

    if (products.length === 0) {
      productList.innerHTML = `<p class="text-center col-span-full py-12 text-stone-500">ไม่พบสินค้าที่ตรงกับการค้นหา</p>`;
      return;
    }

    productList.innerHTML = products.map(item => `
      <article class="bg-white dark:bg-stone-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200 dark:border-stone-700 flex flex-col group">
        <div class="h-48 overflow-hidden relative bg-stone-100 dark:bg-stone-900">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
          <span class="absolute top-2 right-2 bg-stone-900/70 text-amber-400 text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
            ${"★".repeat(item.star)}
          </span>
        </div>
        <div class="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-lg mb-1 text-stone-800 dark:text-amber-400 line-clamp-1">${item.name}</h3>
            <p class="text-sm text-stone-500 dark:text-stone-400 mb-2">
              <i class="fa-solid fa-location-dot text-amber-600 mr-1"></i>${item.district}
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-stone-100 dark:border-stone-700 flex justify-between items-center">
            <span class="font-bold text-lg text-stone-900 dark:text-stone-100">${item.price.toLocaleString()} บาท</span>
            <button onclick="openProductModal(${item.id})" class="bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition shadow-sm">
              รายละเอียด
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  renderProducts(allProducts);

  // ----------------------------------------------------
  // 4. ระบบเปิด-ปิด Modal แสดงรายละเอียด
  // ----------------------------------------------------
  const modal = document.getElementById("product-modal");
  const modalContent = document.getElementById("modal-content");
  const closeModalBtn = document.getElementById("close-modal");

  window.openProductModal = function(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product || !modal) return;

    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-image").alt = product.name;
    document.getElementById("modal-title").innerText = product.name;
    document.getElementById("modal-category").innerText = product.categoryName;
    document.getElementById("modal-district-text").innerText = product.district;
    document.getElementById("modal-star").innerText = `${"★".repeat(product.star)} (${product.star} ดาว)`;
    document.getElementById("modal-description").innerText = product.description;
    document.getElementById("modal-group").innerText = product.group;
    document.getElementById("modal-phone").innerText = product.phone;
    document.getElementById("modal-price").innerText = `${product.price.toLocaleString()} บาท`;

    // แสดง Modal พร้อม Animation
    modal.classList.remove("hidden");
    setTimeout(() => {
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }, 10);
  };

  function closeModal() {
    if (!modal) return;
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 200);
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // ----------------------------------------------------
  // 5. ระบบค้นหา คัดกรอง และรับ Parameter จากหน้าแรก
  // ----------------------------------------------------
  function filterProducts() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";

    const filtered = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.district.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
  }

  if (searchInput) searchInput.addEventListener("input", filterProducts);
  if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);

  // เช็ก URL Parameter เมื่อกดมาจากหน้าแรก
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam && categoryFilter) {
    categoryFilter.value = categoryParam;
    filterProducts();
  }
});