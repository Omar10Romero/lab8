const test = require("node:test");
const assert = require("node:assert");

function calculateMonthlyInstallment(price, downPaymentRatio = 0.2, months = 36) {
  return Math.round((price * (1 - downPaymentRatio)) / months);
}

function filterByBudget(list, maxPrice) {
  return list.filter((item) => item.price <= maxPrice);
}

test("Cálculo de cuota mensual con 20% inicial a 36 meses", () => {
  const result = calculateMonthlyInstallment(8450, 0.2, 36);
  assert.strictEqual(result, 188);
});

test("Filtro de catálogo por presupuesto máximo", () => {
  const sample = [
    { name: "Yamaha MT-07", price: 8450 },
    { name: "Kawasaki Ninja 400", price: 5900 },
    { name: "BMW F 850 GS", price: 15400 }
  ];
  const filtered = filterByBudget(sample, 9000);
  assert.strictEqual(filtered.length, 2);
});