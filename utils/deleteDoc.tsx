export type DeleteDocParams = {
  userId: string
  docId: number
  productId: string
}

export async function deleteDoc({ userId, docId, productId }: DeleteDocParams) {
  try {
    const res = await fetch(
      `/api/deleteDoc?userId=${userId}&docId=${docId}&productId=${productId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Failed to delete user's document data")
    }

    return data
  } catch (error) {
    console.error("Error deleting document:", error)
    throw error
  }
}
