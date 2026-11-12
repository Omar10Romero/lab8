const defaultMotorcycles = [
  {
    id: 1,
    name: "Yamaha MT-07",
    brand: "Yamaha",
    category: "Naked",
    cc: 689,
    power: "73.4 HP",
    transmission: "6 Velocidades",
    weight: "184 kg",
    price: 8450,
    stockCount: 5,
    sucursal: "Sede Central",
    warranty: "24 Meses",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Honda CBR650R",
    brand: "Honda",
    category: "Deportiva",
    cc: 649,
    power: "94 HP",
    transmission: "6 Vel. + Quickshifter",
    weight: "208 kg",
    price: 10200,
    stockCount: 3,
    sucursal: "Sede Norte",
    warranty: "24 Meses",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Kawasaki Ninja 400 SE",
    brand: "Kawasaki",
    category: "Deportiva",
    cc: 399,
    power: "45 HP",
    transmission: "6 Vel. Embrague Antirrebote",
    weight: "168 kg",
    price: 5900,
    stockCount: 8,
    sucursal: "Sede Sur",
    warranty: "24 Meses",
    image: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "BMW F 850 GS Triple Black",
    brand: "BMW",
    category: "Adventure",
    cc: 853,
    power: "95 HP",
    transmission: "6 Vel. + Modos Pro",
    weight: "233 kg",
    price: 15400,
    stockCount: 2,
    sucursal: "Sede Central",
    warranty: "36 Meses",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "KTM 390 Duke",
    brand: "KTM",
    category: "Naked",
    cc: 373,
    power: "44 HP",
    transmission: "6 Velocidades",
    weight: "172 kg",
    price: 6150,
    stockCount: 6,
    sucursal: "Sede Este",
    warranty: "24 Meses",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Ducati Monster 937",
    brand: "Ducati",
    category: "Naked",
    cc: 937,
    power: "111 HP",
    transmission: "6 Vel. Ducati Quick Shift",
    weight: "188 kg",
    price: 13800,
    stockCount: 2,
    sucursal: "Sede Norte",
    warranty: "24 Meses",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Suzuki V-Strom 650 XT",
    brand: "Suzuki",
    category: "Adventure",
    cc: 645,
    power: "70 HP",
    transmission: "6 Velocidades",
    weight: "216 kg",
    price: 9650,
    stockCount: 4,
    sucursal: "Sede Oeste",
    warranty: "24 Meses",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Royal Enfield Continental GT 650",
    brand: "Royal Enfield",
    category: "Clásica",
    cc: 648,
    power: "47 HP",
    transmission: "6 Velocidades",
    weight: "198 kg",
    price: 6890,
    stockCount: 7,
    sucursal: "Sede Central",
    warranty: "36 Meses",
    image: "https://images.unsplash.com/photo-1558980664-2506fca6bfc2?auto=format&fit=crop&w=800&q=80"
  }
];

const purchaseSteps = [
  { step: "01", title: "Consulta y 3D/AR", desc: "El usuario filtra motocicletas homologadas e inspecciona modelos en 360° y Realidad Aumentada." },
  { step: "02", title: "Comparación Técnica", desc: "Selección de hasta 3 modelos para contrastar potencia, peso, garantía y cuota mensual lado a lado." },
  { step: "03", title: "Carrito & Checkout", desc: "Configuración transparente añadiendo accesorios OEM y gestión digital de placas y SOAT." },
  { step: "04", title: "Pago QR / Tarjeta", desc: "Pasarela multifunción con generación de QR dinámico y conciliación instantánea." },
  { step: "05", title: "Contrato PDF & Chasis", desc: "Descarga automática del Contrato de Compra-Venta en PDF y bloqueo de chasis en sucursal." },
  { step: "06", title: "Despacho Live", desc: "Notificaciones push en tiempo real hasta la entrega certificada en sucursal o domicilio." }
];

// Estado persistente
let motorcycles = JSON.parse(localStorage.getItem("mc_inventory")) || defaultMotorcycles;
let currentUser = JSON.parse(localStorage.getItem("mc_user")) || null;
let ordersHistory = JSON.parse(localStorage.getItem("mc_orders")) || [];
let cart = [];
let compareList = [];
let selectedCategory = "all";
let activeFlowIndex = 0;
let qrTimerInterval = null;

function saveInventory() {
  localStorage.setItem("mc_inventory", JSON.stringify(motorcycles));
}

// ==========================================
// SISTEMA DE NOTIFICACIONES EN TIEMPO REAL
// ==========================================
function showToast(title, message, type = "info") {
  const container = document.getElementById("toastContainer");
  const colors = {
    info: "border-orange-500/50 text-[#F97316]",
    success: "border-emerald-500/50 text-emerald-400",
    alert: "border-red-500/50 text-red-400"
  };

  const toast = document.createElement("div");
  toast.className = `pointer-events-auto glass-card rounded-2xl p-4 border ${colors[type]} shadow-2xl toast-enter`;
  toast.innerHTML = `
    <div class="flex items-start justify-between gap-2">
      <div>
        <span class="text-[10px] font-black uppercase tracking-wider ${colors[type]}">● LIVE TRACKING</span>
        <h4 class="font-display font-bold text-sm text-white mt-0.5">${title}</h4>
        <p class="text-xs text-slate-300 mt-1">${message}</p>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="text-slate-400 hover:text-white text-xs font-bold">✕</button>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 6000);
}

// ==========================================
// RENDERIZADO DE CATÁLOGO
// ==========================================
function renderCatalog() {
  const catalogGrid = document.getElementById("catalogGrid");
  const brand = document.getElementById("filterBrand").value;
  const ccFilter = document.getElementById("filterCc").value;
  const priceFilter = document.getElementById("filterPrice").value;
  const query = document.getElementById("quickSearchInput").value.toLowerCase().trim();

  const filtered = motorcycles.filter((moto) => {
    const matchCat = selectedCategory === "all" || moto.category === selectedCategory;
    const matchBrand = brand === "all" || moto.brand === brand;
    const matchQuery =
      moto.name.toLowerCase().includes(query) ||
      moto.brand.toLowerCase().includes(query) ||
      moto.category.toLowerCase().includes(query);

    let matchCc = true;
    if (ccFilter === "low") matchCc = moto.cc <= 500;
    if (ccFilter === "mid") matchCc = moto.cc > 500 && moto.cc <= 750;
    if (ccFilter === "high") matchCc = moto.cc > 750;

    let matchPrice = true;
    if (priceFilter === "under7000") matchPrice = moto.price < 7000;
    if (priceFilter === "7000to11000") matchPrice = moto.price >= 7000 && moto.price <= 11000;
    if (priceFilter === "over11000") matchPrice = moto.price > 11000;

    return matchCat && matchBrand && matchQuery && matchCc && matchPrice;
  });

  if (filtered.length === 0) {
    catalogGrid.innerHTML = `
      <div class="col-span-full text-center py-14 glass-card rounded-2xl border border-white/10">
        <p class="font-display font-bold text-lg text-white">No se encontraron motocicletas con esos filtros</p>
        <p class="text-xs text-slate-400 mt-1">Prueba restableciendo los criterios de búsqueda.</p>
      </div>
    `;
    return;
  }

  catalogGrid.innerHTML = filtered
    .map((moto) => {
      const isCompared = compareList.includes(moto.id);
      const monthly = Math.round((moto.price * 0.8) / 36);
      const inStock = moto.stockCount > 0;

      return `
        <article class="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#F97316]/50 transition flex flex-col justify-between">
          <div>
            <div class="relative aspect-[16/10] bg-[#0F172A] overflow-hidden">
              <img src="${moto.image}" alt="${moto.name}" class="w-full h-full object-cover hover:scale-105 transition duration-500" />
              <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-black/70 text-white border border-white/10">
                ${moto.category}
              </span>
              <span class="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                inStock
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-red-500/20 text-red-300 border border-red-500/30"
              }">
                ${inStock ? `${moto.stockCount} Unid. (${moto.sucursal})` : "Agotado"}
              </span>
            </div>

            <div class="p-5">
              <div class="flex items-center justify-between text-xs text-slate-400">
                <span class="font-bold text-[#F97316]">${moto.brand}</span>
                <span>Garantía ${moto.warranty}</span>
              </div>
              <h3 class="font-display font-bold text-lg text-white mt-1">${moto.name}</h3>

              <div class="grid grid-cols-3 gap-2 my-4 text-center">
                <div class="p-2 rounded-lg bg-white/5">
                  <span class="block text-[10px] text-slate-400">Cilindrada</span>
                  <span class="text-xs font-bold">${moto.cc} cc</span>
                </div>
                <div class="p-2 rounded-lg bg-white/5">
                  <span class="block text-[10px] text-slate-400">Potencia</span>
                  <span class="text-xs font-bold">${moto.power}</span>
                </div>
                <div class="p-2 rounded-lg bg-white/5">
                  <span class="block text-[10px] text-slate-400">Peso</span>
                  <span class="text-xs font-bold">${moto.weight}</span>
                </div>
              </div>

              <div class="flex items-baseline justify-between pt-2 border-t border-white/10">
                <div>
                  <span class="block text-[10px] text-slate-400">Precio Contado</span>
                  <span class="font-display text-xl font-black text-white">$${moto.price.toLocaleString()}</span>
                </div>
                <span class="text-[11px] text-slate-400">o <strong class="text-slate-200">$${monthly}/mes</strong></span>
              </div>
            </div>
          </div>

          <div class="px-5 pb-5 space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <button onclick="toggleCompare(${moto.id})" class="py-2 px-2 rounded-xl text-xs font-bold border transition ${
                isCompared
                  ? "bg-orange-500/20 border-[#F97316] text-[#F97316]"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-200"
              }">
                ${isCompared ? "✓ Comparando" : "+ Comparar"}
              </button>
              <button onclick="openSpecModal(${moto.id})" class="py-2 px-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white transition">
                Ficha / Cuotas
              </button>
            </div>
            <button onclick="addToCart(${moto.id})" ${!inStock ? "disabled" : ""} class="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-[#EF4444] to-[#F97316] text-white hover:opacity-95 disabled:opacity-40 transition">
              ${inStock ? "🛒 Reservar / Añadir al Carrito" : "Sin Stock Disponible"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

// ==========================================
// CARRITO, CHECKOUT QR/TARJETA Y CONTRATO PDF
// ==========================================
function addToCart(id) {
  const moto = motorcycles.find((m) => m.id === id);
  if (!moto || moto.stockCount <= 0) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    if (existing.qty >= moto.stockCount) {
      showToast("Límite de Stock", `Solo hay ${moto.stockCount} unidades disponibles en ${moto.sucursal}.`, "alert");
      return;
    }
    existing.qty += 1;
  } else {
    cart.push({ id: moto.id, name: moto.name, brand: moto.brand, price: moto.price, sucursal: moto.sucursal, qty: 1 });
  }

  updateCartBadge();
  showToast("Unidad Añadida", `${moto.name} agregada al carrito de reserva.`, "success");
}

function updateCartBadge() {
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  document.getElementById("cartCountBadge").textContent = totalItems;
}

function openCartModal() {
  const modal = document.getElementById("cartModal");
  const body = document.getElementById("cartModalBody");
  if (qrTimerInterval) clearInterval(qrTimerInterval);

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="text-center py-10">
        <span class="text-4xl">🛒</span>
        <h3 class="font-display text-xl font-extrabold mt-3">Tu Carrito de Reserva está Vacío</h3>
        <p class="text-xs text-slate-400 mt-1">Selecciona una motocicleta del catálogo para iniciar el checkout digital.</p>
      </div>
    `;
    modal.classList.remove("hidden");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const userName = currentUser ? currentUser.name : "";
  const userEmail = currentUser ? currentUser.email : "";

  body.innerHTML = `
    <span class="text-xs font-bold uppercase text-[#F97316]">Checkout Multifunción • MotoConnect Pay</span>
    <h3 class="font-display text-2xl font-extrabold mt-1 mb-4">Resumen de Reserva y Pago</h3>

    <div class="space-y-2.5 mb-5 max-h-44 overflow-y-auto pr-1">
      ${cart
        .map(
          (item, idx) => `
        <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
          <div>
            <strong class="text-white block">${item.name} (x${item.qty})</strong>
            <span class="text-slate-400">${item.sucursal}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="font-display font-bold text-sm text-white">$${(item.price * item.qty).toLocaleString()}</span>
            <button onclick="removeFromCart(${idx})" class="text-red-400 hover:text-red-300 font-bold">✕</button>
          </div>
        </div>
      `
        )
        .join("")}
    </div>

    <!-- Extras OEM -->
    <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-5 space-y-2 text-xs">
      <strong class="text-slate-200 block mb-1">Servicios y Accesorios OEM Opcionales:</strong>
      <label class="flex items-center justify-between cursor-pointer">
        <span><input type="checkbox" id="extraSoat" class="mr-2 accent-[#F97316]" checked onchange="recalcCheckoutTotal(${subtotal})"> Gestión Placas + SOAT Digital (+$180)</span>
        <span class="font-bold">$180</span>
      </label>
      <label class="flex items-center justify-between cursor-pointer">
        <span><input type="checkbox" id="extraHelmet" class="mr-2 accent-[#F97316]" onchange="recalcCheckoutTotal(${subtotal})"> Casco Certificado ECE 22.06 OEM (+$240)</span>
        <span class="font-bold">$240</span>
      </label>
    </div>

    <!-- Datos del Comprador -->
    <div class="grid sm:grid-cols-2 gap-3 mb-5 text-xs">
      <div>
        <label class="block text-slate-400 mb-1">Nombre Completo / Razón Social</label>
        <input id="buyerName" type="text" value="${userName}" placeholder="Ej. Omar Romero" class="w-full rounded-xl bg-[#0B0F19] border border-white/10 px-3 py-2 text-white" />
      </div>
      <div>
        <label class="block text-slate-400 mb-1">Documento de Identidad / NIT</label>
        <input id="buyerDoc" type="text" placeholder="Ej. 8549201" class="w-full rounded-xl bg-[#0B0F19] border border-white/10 px-3 py-2 text-white" />
      </div>
    </div>

    <!-- Selector Método de Pago -->
    <div class="mb-5">
      <span class="block text-xs text-slate-400 mb-2">Método de Pago Digital:</span>
      <div class="grid grid-cols-2 gap-2">
        <button type="button" onclick="switchPaymentTab('qr')" id="tabQrBtn" class="py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#EF4444] to-[#F97316] text-white">
          📱 Pago QR Dinámico
        </button>
        <button type="button" onclick="switchPaymentTab('card')" id="tabCardBtn" class="py-2 rounded-xl text-xs font-bold bg-white/5 text-slate-300">
          💳 Tarjeta Crédito / Débito
        </button>
      </div>

      <!-- Panel QR -->
      <div id="paymentPanelQr" class="mt-3 p-4 rounded-2xl bg-[#0B0F19] border border-white/10 flex flex-col sm:flex-row items-center gap-4">
        <div class="bg-white p-2.5 rounded-xl shrink-0">
          <!-- QR SVG Simulado -->
          <svg class="w-24 h-24 text-slate-950" viewBox="0 0 100 100" fill="currentColor">
            <rect x="10" y="10" width="25" height="25"/><rect x="15" y="15" width="15" height="15" fill="white"/><rect x="18" y="18" width="9" height="9"/>
            <rect x="65" y="10" width="25" height="25"/><rect x="70" y="15" width="15" height="15" fill="white"/><rect x="73" y="18" width="9" height="9"/>
            <rect x="10" y="65" width="25" height="25"/><rect x="15" y="70" width="15" height="15" fill="white"/><rect x="18" y="73" width="9" height="9"/>
            <rect x="42" y="12" width="8" height="8"/><rect x="42" y="28" width="14" height="8"/><rect x="12" y="45" width="16" height="8"/>
            <rect x="40" y="44" width="20" height="20"/><rect x="68" y="46" width="18" height="8"/><rect x="48" y="72" width="12" height="16"/><rect x="70" y="70" width="18" height="18"/>
          </svg>
        </div>
        <div class="text-xs space-y-1.5">
          <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">QR Interbancario Listo</span>
          <p class="text-slate-300">Escanea desde tu banca móvil. El código expira en <strong id="qrCountdown" class="text-[#F97316]">04:59</strong>.</p>
          <p class="text-slate-500">Referencia: MC-${Math.floor(100000 + Math.random() * 900000)}</p>
        </div>
      </div>

      <!-- Panel Tarjeta -->
      <div id="paymentPanelCard" class="hidden mt-3 p-4 rounded-2xl bg-[#0B0F19] border border-white/10 space-y-3 text-xs">
        <input type="text" placeholder="Número de Tarjeta (4532 •••• •••• 8891)" class="w-full rounded-xl bg-[#0F172A] border border-white/10 px-3 py-2 text-white" />
        <div class="grid grid-cols-2 gap-3">
          <input type="text" placeholder="MM/AA (09/29)" class="rounded-xl bg-[#0F172A] border border-white/10 px-3 py-2 text-white" />
          <input type="password" placeholder="CVV (•••)" class="rounded-xl bg-[#0F172A] border border-white/10 px-3 py-2 text-white" />
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between pt-4 border-t border-white/10">
      <div>
        <span class="text-xs text-slate-400 block">Total a Pagar</span>
        <strong id="checkoutTotalDisplay" class="font-display text-2xl font-black text-white">$${(subtotal + 180).toLocaleString()} USD</strong>
      </div>
      <button onclick="processOrder(${subtotal})" class="px-6 py-3 rounded-xl bg-gradient-to-r from-[#EF4444] to-[#F97316] text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 hover:opacity-95 transition">
        Confirmar Pago y Generar PDF
      </button>
    </div>
  `;

  startQrCountdown();
  modal.classList.remove("hidden");
}

function startQrCountdown() {
  let seconds = 299;
  qrTimerInterval = setInterval(() => {
    const el = document.getElementById("qrCountdown");
    if (!el) {
      clearInterval(qrTimerInterval);
      return;
    }
    seconds--;
    if (seconds <= 0) {
      clearInterval(qrTimerInterval);
      el.textContent = "Expirado";
      return;
    }
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    el.textContent = `${mins}:${secs}`;
  }, 1000);
}

function switchPaymentTab(mode) {
  const qrPanel = document.getElementById("paymentPanelQr");
  const cardPanel = document.getElementById("paymentPanelCard");
  const qrBtn = document.getElementById("tabQrBtn");
  const cardBtn = document.getElementById("tabCardBtn");

  if (mode === "qr") {
    qrPanel.classList.remove("hidden");
    cardPanel.classList.add("hidden");
    qrBtn.className = "py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#EF4444] to-[#F97316] text-white";
    cardBtn.className = "py-2 rounded-xl text-xs font-bold bg-white/5 text-slate-300";
  } else {
    cardPanel.classList.remove("hidden");
    qrPanel.classList.add("hidden");
    cardBtn.className = "py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#EF4444] to-[#F97316] text-white";
    qrBtn.className = "py-2 rounded-xl text-xs font-bold bg-white/5 text-slate-300";
  }
}

function recalcCheckoutTotal(subtotal) {
  const soat = document.getElementById("extraSoat")?.checked ? 180 : 0;
  const helmet = document.getElementById("extraHelmet")?.checked ? 240 : 0;
  const total = subtotal + soat + helmet;
  document.getElementById("checkoutTotalDisplay").textContent = `$${total.toLocaleString()} USD`;
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCartBadge();
  openCartModal();
}

function processOrder(subtotal) {
  const buyerName = document.getElementById("buyerName").value.trim() || "Cliente MotoConnect";
  const buyerDoc = document.getElementById("buyerDoc").value.trim() || "CI-9948210";
  const soat = document.getElementById("extraSoat")?.checked ? 180 : 0;
  const helmet = document.getElementById("extraHelmet")?.checked ? 240 : 0;
  const total = subtotal + soat + helmet;
  const orderCode = `MC-${Date.now().toString().slice(-6)}`;
  const chassisCode = `VIN-MC2026-${Math.floor(10000 + Math.random() * 90000)}`;

  // Descontar inventario
  cart.forEach((item) => {
    const moto = motorcycles.find((m) => m.id === item.id);
    if (moto && moto.stockCount >= item.qty) {
      moto.stockCount -= item.qty;
    }
  });
  saveInventory();
  renderCatalog();

  const orderRecord = {
    code: orderCode,
    date: new Date().toLocaleDateString(),
    buyerName,
    buyerDoc,
    chassisCode,
    items: [...cart],
    total
  };

  ordersHistory.unshift(orderRecord);
  localStorage.setItem("mc_orders", JSON.stringify(ordersHistory));

  // Generar PDF real
  generateContractPDF(orderRecord, soat > 0, helmet > 0);

  // Limpiar carrito y mostrar confirmación
  cart = [];
  updateCartBadge();

  document.getElementById("cartModalBody").innerHTML = `
    <div class="text-center py-6 space-y-4">
      <div class="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mx-auto font-bold">✓</div>
      <h3 class="font-display text-2xl font-extrabold text-white">¡Pago Verificado y Contrato Generado!</h3>
      <p class="text-xs text-slate-300 max-w-md mx-auto">
        Orden <strong>${orderCode}</strong> confirmada. Tu contrato digital y factura electrónica se han descargado automáticamente en formato PDF.
      </p>
      <div class="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-left max-w-md mx-auto space-y-1">
        <p><span class="text-slate-400">Titular:</span> <strong>${buyerName}</strong></p>
        <p><span class="text-slate-400">Chasis Asignado:</span> <strong class="text-[#F97316]">${chassisCode}</strong></p>
        <p><span class="text-slate-400">Monto Liquidado:</span> <strong class="text-emerald-400">$${total.toLocaleString()} USD</strong></p>
      </div>
    </div>
  `;

  // Simular tracking en tiempo real
  showToast("Pago Aprobado", `Orden ${orderCode} conciliada por MotoConnect Pay.`, "success");
  setTimeout(() => {
    showToast("SOAT & Chasis Vinculados", `Chasis ${chassisCode} registrado ante Tránsito.`, "info");
  }, 3000);
  setTimeout(() => {
    showToast("Orden de Despacho Emitida", `Tu motocicleta ingresó a inspección pre-entrega de 35 puntos.`, "success");
  }, 6500);
}

function generateContractPDF(order, hasSoat, hasHelmet) {
  if (!window.jspdf) return;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, 210, 38, "F");

  doc.setTextColor(249, 115, 22);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("MOTOCONNECT ENTERPRISE", 15, 18);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("FACTURA ELECTRONICA Y CONTRATO DIGITAL DE COMPRA-VENTA", 15, 27);

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(11);
  doc.text(`N° de Orden: ${order.code}`, 15, 50);
  doc.text(`Fecha de Emision: ${order.date}`, 140, 50);
  doc.text(`Comprador: ${order.buyerName}`, 15, 58);
  doc.text(`Documento / NIT: ${order.buyerDoc}`, 140, 58);
  doc.text(`N° Chasis / VIN Asignado: ${order.chassisCode}`, 15, 66);

  doc.line(15, 72, 195, 72);
  doc.setFont("helvetica", "bold");
  doc.text("Detalle de Unidades y Servicios:", 15, 82);

  doc.setFont("helvetica", "normal");
  let y = 92;
  order.items.forEach((item) => {
    doc.text(`• ${item.name} (${item.sucursal}) x${item.qty}`, 18, y);
    doc.text(`$${(item.price * item.qty).toLocaleString()} USD`, 160, y);
    y += 8;
  });

  if (hasSoat) {
    doc.text("• Gestion Digital de Placas y Poliza SOAT Activada", 18, y);
    doc.text("$180 USD", 160, y);
    y += 8;
  }
  if (hasHelmet) {
    doc.text("• Casco Certificado ECE 22.06 OEM", 18, y);
    doc.text("$240 USD", 160, y);
    y += 8;
  }

  doc.line(15, y + 4, 195, y + 4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`TOTAL PAGADO: $${order.total.toLocaleString()} USD`, 130, y + 15);

  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 116, 139);
  doc.text("Documento generado electronicamente por la plataforma MotoConnect. Valido como constancia de reserva y garantia.", 15, y + 32);

  doc.save(`Contrato_MotoConnect_${order.code}.pdf`);
}

// ==========================================
// SISTEMA DE AUTENTICACIÓN Y ROLES (RBAC)
// ==========================================
function updateAuthButton() {
  const btn = document.getElementById("authActionBtn");
  if (currentUser) {
    btn.textContent = `👤 ${currentUser.name.split(" ")[0]} (${currentUser.role})`;
  } else {
    btn.textContent = "Iniciar Sesión";
  }
}

function openAuthModal() {
  const modal = document.getElementById("authModal");
  const body = document.getElementById("authModalBody");

  if (!currentUser) {
    body.innerHTML = `
      <span class="text-xs font-bold uppercase text-[#F97316]">Control de Acceso Basado en Roles (RBAC)</span>
      <h3 class="font-display text-2xl font-extrabold mt-1 mb-2">Acceso al Ecosistema MotoConnect</h3>
      <p class="text-xs text-slate-400 mb-6">Selecciona un perfil de acceso para probar los permisos de Cliente, Agente de Sucursal o Administrador.</p>

      <div class="space-y-4 text-xs">
        <div>
          <label class="block text-slate-400 mb-1">Nombre del Usuario</label>
          <input id="loginNameInput" type="text" value="Omar Giovanny Romero" class="w-full rounded-xl bg-[#0B0F19] border border-white/10 px-3.5 py-2.5 text-white" />
        </div>
        <div>
          <label class="block text-slate-400 mb-1">Correo Institucional / Personal</label>
          <input id="loginEmailInput" type="email" value="omar.romero@motoconnect.bo" class="w-full rounded-xl bg-[#0B0F19] border border-white/10 px-3.5 py-2.5 text-white" />
        </div>
        <div>
          <label class="block text-slate-400 mb-1">Rol en la Plataforma</label>
          <select id="loginRoleSelect" class="w-full rounded-xl bg-[#0B0F19] border border-white/10 px-3.5 py-2.5 text-white">
            <option value="Cliente">Cliente / Piloto (Historial de Compras y Contratos)</option>
            <option value="Agente">Agente de Sucursal (Gestión de Stock Multi-Sede)</option>
            <option value="Admin">Administrador del Sistema (Control Total e Inventario)</option>
          </select>
        </div>
        <button onclick="handleLogin()" class="w-full py-3 rounded-xl bg-gradient-to-r from-[#EF4444] to-[#F97316] text-white font-bold text-sm shadow-lg">
          Ingresar con Token JWT Simulado
        </button>
      </div>
    `;
  } else {
    const canManageStock = currentUser.role === "Admin" || currentUser.role === "Agente";

    body.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-5">
        <div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-orange-500/20 text-[#F97316]">Rol Activo: ${currentUser.role}</span>
          <h3 class="font-display text-xl font-extrabold text-white mt-1">${currentUser.name}</h3>
          <p class="text-xs text-slate-400">${currentUser.email}</p>
        </div>
        <button onclick="handleLogout()" class="px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 text-xs font-bold">
          Cerrar Sesión
        </button>
      </div>

      ${
        canManageStock
          ? `
        <div class="mb-6">
          <h4 class="font-display font-bold text-sm uppercase text-[#F97316] mb-3">Panel de Control Multi-Sucursal (Edición en Vivo)</h4>
          <div class="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
            ${motorcycles
              .map(
                (m) => `
              <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <strong class="text-white">${m.name}</strong>
                  <span class="text-slate-400 block">${m.sucursal} • $${m.price.toLocaleString()}</span>
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="adjustStock(${m.id}, -1)" class="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 font-bold">-</button>
                  <span class="w-8 text-center font-bold">${m.stockCount}</span>
                  <button onclick="adjustStock(${m.id}, 1)" class="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 font-bold">+</button>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }

      <div>
        <h4 class="font-display font-bold text-sm uppercase text-slate-200 mb-3">Historial de Órdenes y Contratos (${ordersHistory.length})</h4>
        ${
          ordersHistory.length === 0
            ? `<p class="text-xs text-slate-400">Aún no se registran compras en esta sesión.</p>`
            : `<div class="space-y-2 max-h-48 overflow-y-auto text-xs">
                ${ordersHistory
                  .map(
                    (ord) => `
                  <div class="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <strong class="text-white">${ord.code} • ${ord.chassisCode}</strong>
                      <span class="text-slate-400 block">${ord.date} • Titular: ${ord.buyerName}</span>
                    </div>
                    <span class="font-bold text-emerald-400">$${ord.total.toLocaleString()}</span>
                  </div>
                `
                  )
                  .join("")}
              </div>`
        }
      </div>
    `;
  }

  modal.classList.remove("hidden");
}

function handleLogin() {
  const name = document.getElementById("loginNameInput").value.trim() || "Usuario MotoConnect";
  const email = document.getElementById("loginEmailInput").value.trim() || "piloto@motoconnect.com";
  const role = document.getElementById("loginRoleSelect").value;

  currentUser = { name, email, role, token: `jwt_${Date.now()}` };
  localStorage.setItem("mc_user", JSON.stringify(currentUser));
  updateAuthButton();
  openAuthModal();
  showToast("Sesión Iniciada", `Bienvenido ${name} con permisos de ${role}.`, "success");
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem("mc_user");
  updateAuthButton();
  document.getElementById("authModal").classList.add("hidden");
  showToast("Sesión Cerrada", "Token de acceso revocado correctamente.", "info");
}

function adjustStock(id, delta) {
  const moto = motorcycles.find((m) => m.id === id);
  if (!moto) return;
  moto.stockCount = Math.max(0, moto.stockCount + delta);
  saveInventory();
  renderCatalog();
  openAuthModal();
}

// ==========================================
// COMPARADOR Y FICHA TÉCNICA
// ==========================================
function toggleCompare(id) {
  if (compareList.includes(id)) {
    compareList = compareList.filter((item) => item !== id);
  } else {
    if (compareList.length >= 3) {
      showToast("Comparador Lleno", "Puedes comparar hasta un máximo de 3 motocicletas.", "alert");
      return;
    }
    compareList.push(id);
  }
  updateCompareUI();
  renderCatalog();
}

function updateCompareUI() {
  const badge = document.getElementById("compareCountBadge");
  const bar = document.getElementById("floatingCompareBar");
  const barCount = document.getElementById("barCount");
  const listContainer = document.getElementById("floatingCompareList");

  badge.textContent = compareList.length;
  barCount.textContent = compareList.length;

  if (compareList.length === 0) {
    bar.classList.add("hidden");
    return;
  }

  bar.classList.remove("hidden");
  listContainer.innerHTML = compareList
    .map((id) => {
      const m = motorcycles.find((item) => item.id === id);
      return `<span class="px-2.5 py-1 rounded-lg bg-white/10 text-xs font-semibold flex items-center gap-1.5">
        ${m.name}
        <button onclick="toggleCompare(${m.id})" class="text-red-400 hover:text-red-300 font-bold">×</button>
      </span>`;
    })
    .join("");
}

function openSpecModal(id) {
  const moto = motorcycles.find((m) => m.id === id);
  const modal = document.getElementById("specModal");
  const content = document.getElementById("specModalContent");

  content.innerHTML = `
    <span class="text-xs font-bold uppercase text-[#F97316]">${moto.brand} • ${moto.category}</span>
    <h3 class="font-display text-2xl font-extrabold text-white mt-1 mb-4">${moto.name}</h3>
    <img src="${moto.image}" alt="${moto.name}" class="w-full h-52 object-cover rounded-2xl mb-5" />

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-6">
      <div class="p-3 rounded-xl bg-white/5"><span class="text-slate-400 block">Cilindrada</span><strong>${moto.cc} cc</strong></div>
      <div class="p-3 rounded-xl bg-white/5"><span class="text-slate-400 block">Potencia Máx.</span><strong>${moto.power}</strong></div>
      <div class="p-3 rounded-xl bg-white/5"><span class="text-slate-400 block">Transmisión</span><strong>${moto.transmission}</strong></div>
      <div class="p-3 rounded-xl bg-white/5"><span class="text-slate-400 block">Peso en Orden</span><strong>${moto.weight}</strong></div>
      <div class="p-3 rounded-xl bg-white/5"><span class="text-slate-400 block">Disponibilidad</span><strong class="text-emerald-400">${moto.stockCount} Unid. (${moto.sucursal})</strong></div>
      <div class="p-3 rounded-xl bg-white/5"><span class="text-slate-400 block">Garantía Oficial</span><strong>${moto.warranty}</strong></div>
    </div>

    <div class="p-4 rounded-2xl bg-[#0B0F19] border border-white/10">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold uppercase text-[#F97316]">Simulador Rápido de Cuotas</span>
        <span class="font-display font-extrabold text-lg">$${moto.price.toLocaleString()}</span>
      </div>
      <label class="block text-xs text-slate-400 mb-1">Plazo de Financiamiento (20% inicial): <strong id="monthsLabel" class="text-white">36 meses</strong></label>
      <input id="monthsRange" type="range" min="12" max="48" step="12" value="36" class="w-full accent-[#F97316]" />
      <p class="text-sm text-slate-300 mt-3">Cuota mensual estimada: <strong id="monthlyResult" class="text-xl font-display text-[#F97316]">$${Math.round((moto.price * 0.8) / 36)} USD</strong></p>
    </div>
  `;

  modal.classList.remove("hidden");

  document.getElementById("monthsRange").addEventListener("input", (e) => {
    const months = Number(e.target.value);
    document.getElementById("monthsLabel").textContent = `${months} meses`;
    document.getElementById("monthlyResult").textContent = `$${Math.round((moto.price * 0.8) / months)} USD`;
  });
}

function openCompareModal() {
  const modal = document.getElementById("compareModal");
  const content = document.getElementById("compareModalContent");

  if (compareList.length === 0) {
    content.innerHTML = `<p class="text-sm text-slate-400">Aún no has seleccionado modelos. Haz clic en "+ Comparar" en cualquier tarjeta del catálogo.</p>`;
  } else {
    const selected = compareList.map((id) => motorcycles.find((m) => m.id === id));
    content.innerHTML = `
      <table class="w-full text-left border-collapse text-sm">
        <thead>
          <tr class="border-b border-white/10">
            <th class="py-3 px-4 text-slate-400 font-semibold">Especificación</th>
            ${selected.map((m) => `<th class="py-3 px-4 font-display font-bold text-white">${m.name}</th>`).join("")}
          </tr>
        </thead>
        <tbody class="divide-y divide-white/10">
          <tr><td class="py-3 px-4 text-slate-400">Marca</td>${selected.map((m) => `<td class="py-3 px-4">${m.brand}</td>`).join("")}</tr>
          <tr><td class="py-3 px-4 text-slate-400">Categoría</td>${selected.map((m) => `<td class="py-3 px-4">${m.category}</td>`).join("")}</tr>
          <tr><td class="py-3 px-4 text-slate-400">Cilindrada</td>${selected.map((m) => `<td class="py-3 px-4 font-bold">${m.cc} cc</td>`).join("")}</tr>
          <tr><td class="py-3 px-4 text-slate-400">Potencia</td>${selected.map((m) => `<td class="py-3 px-4 font-bold text-[#F97316]">${m.power}</td>`).join("")}</tr>
          <tr><td class="py-3 px-4 text-slate-400">Transmisión</td>${selected.map((m) => `<td class="py-3 px-4">${m.transmission}</td>`).join("")}</tr>
          <tr><td class="py-3 px-4 text-slate-400">Peso</td>${selected.map((m) => `<td class="py-3 px-4">${m.weight}</td>`).join("")}</tr>
          <tr><td class="py-3 px-4 text-slate-400">Sucursal</td>${selected.map((m) => `<td class="py-3 px-4">${m.sucursal} (${m.stockCount} unid.)</td>`).join("")}</tr>
          <tr><td class="py-3 px-4 text-slate-400">Precio Contado</td>${selected.map((m) => `<td class="py-3 px-4 font-display font-extrabold text-lg text-emerald-400">$${m.price.toLocaleString()}</td>`).join("")}</tr>
        </tbody>
      </table>
    `;
  }

  modal.classList.remove("hidden");
}

function renderFlow() {
  const stepsContainer = document.getElementById("flowSteps");
  const detailBox = document.getElementById("flowDetailBox");

  stepsContainer.innerHTML = purchaseSteps
    .map(
      (item, index) => `
      <button onclick="selectFlowStep(${index})" class="p-4 rounded-2xl text-left border transition ${
        index === activeFlowIndex
          ? "bg-gradient-to-br from-[#EF4444]/20 to-[#F97316]/20 border-[#F97316]"
          : "glass-card border-white/10 hover:border-white/25"
      }">
        <span class="text-xs font-black text-[#F97316]">PASO ${item.step}</span>
        <h4 class="font-display font-bold text-sm text-white mt-1">${item.title}</h4>
      </button>
    `
    )
    .join("");

  const current = purchaseSteps[activeFlowIndex];
  detailBox.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-[#F97316]">Etapa Activa • Paso ${current.step} de 06</span>
        <h3 class="font-display text-xl font-extrabold text-white mt-1">${current.title}</h3>
        <p class="text-sm text-slate-300 mt-2">${current.desc}</p>
      </div>
      <button onclick="nextFlowStep()" class="self-start sm:self-center px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition">
        Siguiente Etapa →
      </button>
    </div>
  `;
}

function selectFlowStep(index) {
  activeFlowIndex = index;
  renderFlow();
}

function nextFlowStep() {
  activeFlowIndex = (activeFlowIndex + 1) % purchaseSteps.length;
  renderFlow();
}

// ==========================================
// EVENT LISTENERS GLOBALES
// ==========================================
document.querySelectorAll(".cat-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-tab").forEach((b) => {
      b.classList.remove("bg-gradient-to-r", "from-[#EF4444]", "to-[#F97316]", "text-white");
      b.classList.add("bg-white/5", "text-slate-300");
    });
    btn.classList.remove("bg-white/5", "text-slate-300");
    btn.classList.add("bg-gradient-to-r", "from-[#EF4444]", "to-[#F97316]", "text-white");
    selectedCategory = btn.dataset.cat;
    renderCatalog();
  });
});

document.getElementById("heroSearchBtn").addEventListener("click", () => {
  renderCatalog();
  document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("quickSearchInput").addEventListener("input", renderCatalog);
document.getElementById("filterBrand").addEventListener("change", renderCatalog);
document.getElementById("filterCc").addEventListener("change", renderCatalog);
document.getElementById("filterPrice").addEventListener("change", renderCatalog);

document.getElementById("resetFiltersBtn").addEventListener("click", () => {
  document.getElementById("filterBrand").value = "all";
  document.getElementById("filterCc").value = "all";
  document.getElementById("filterPrice").value = "all";
  document.getElementById("quickSearchInput").value = "";
  selectedCategory = "all";
  document.querySelectorAll(".cat-tab")[0].click();
});

document.getElementById("openCompareBtn").addEventListener("click", openCompareModal);
document.getElementById("launchCompareModalBtn").addEventListener("click", openCompareModal);
document.getElementById("clearCompareBtn").addEventListener("click", () => {
  compareList = [];
  updateCompareUI();
  renderCatalog();
});

document.getElementById("closeSpecModal").addEventListener("click", () => document.getElementById("specModal").classList.add("hidden"));
document.getElementById("closeCompareModal").addEventListener("click", () => document.getElementById("compareModal").classList.add("hidden"));
document.getElementById("openTramitesModal").addEventListener("click", () => document.getElementById("tramitesModal").classList.remove("hidden"));
document.getElementById("closeTramitesModal").addEventListener("click", () => document.getElementById("tramitesModal").classList.add("hidden"));

document.getElementById("open3DShowcaseBtn").addEventListener("click", () => document.getElementById("modal3D").classList.remove("hidden"));
document.getElementById("closeModal3D").addEventListener("click", () => document.getElementById("modal3D").classList.add("hidden"));

document.getElementById("authActionBtn").addEventListener("click", openAuthModal);
document.getElementById("closeAuthModal").addEventListener("click", () => document.getElementById("authModal").classList.add("hidden"));

document.getElementById("openCartBtn").addEventListener("click", openCartModal);
document.getElementById("closeCartModal").addEventListener("click", () => {
  if (qrTimerInterval) clearInterval(qrTimerInterval);
  document.getElementById("cartModal").classList.add("hidden");
});

// Inicialización
updateAuthButton();
renderCatalog();
renderFlow();