export async function getUserData(userId: string) {
  const res = await fetch(`/api/getUserData?userId=${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch user data on the Dashboard")
  }

  const data = await res.json()

  return data
}
