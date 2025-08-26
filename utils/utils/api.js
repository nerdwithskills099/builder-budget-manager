export async function addExpense(expense) {
  const res = await fetch("https://<your-replit-url>/add-expense", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return res.json();
}

export async function getExpenses(userId) {
  const res = await fetch(`https://<your-replit-url>/get-expenses/${userId}`);
  return res.json();
}
