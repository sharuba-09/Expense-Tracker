const table = document.getElementById("expenseTable");
const form = document.getElementById("expenseForm");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");

async function loadData() {
  const res = await fetch("/expenses");
  const data = await res.json();
  table.innerHTML = "";
  data.forEach(item => {
    table.innerHTML += `
      <tr>
        <td><input value="${item.name}" onchange="updateItem(${item.id}, this.value, '${item.amount}')"></td>
        <td><input value="${item.amount}" onchange="updateItem(${item.id}, '${item.name}', this.value)"></td>
        <td>
          <button onclick="deleteItem(${item.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch("/expenses", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name: nameInput.value, amount: amountInput.value })
  });
  nameInput.value = "";
  amountInput.value = "";
  loadData();
});

async function updateItem(id, name, amount) {
  await fetch(`/expenses/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name, amount})
  });
  loadData();
}

async function deleteItem(id) {
  await fetch(`/expenses/${id}`, { method: "DELETE" });
  loadData();
}

loadData();
