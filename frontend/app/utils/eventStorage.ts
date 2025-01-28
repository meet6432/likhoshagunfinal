const isBrowser = typeof window !== "undefined" && window.indexedDB

interface ChandlaDB extends DBSchema {
  events: {
    key: [string, number] // [email, id]
    value: {
      id: number
      name: string
      gifts: any[]
      lastModified: number
      email: string
    }
    indexes: { "by-email": string }
  }
  syncQueue: {
    key: number
    value: {
      action: "create" | "update" | "delete"
      eventId: number
      data?: any
      timestamp: number
    }
  }
}

let dbPromise: Promise<IDBDatabase> | null = null

if (isBrowser) {
  const { openDB } = await import("idb")

  dbPromise = openDB<ChandlaDB>("chandla-db", 1, {
    upgrade(db) {
      const eventStore = db.createObjectStore("events", { keyPath: ["email", "id"] })
      eventStore.createIndex("by-email", "email")
      db.createObjectStore("syncQueue", { keyPath: "timestamp" })
    },
  })
}

export async function createEvent(event: { id: number; name: string; gifts: any[]; email: string }) {
  if (!isBrowser) return
  const db = await dbPromise
  if (!db) return
  const eventWithTimestamp = { ...event, lastModified: Date.now() }
  await db.put("events", eventWithTimestamp)
  await addToSyncQueue("create", event.id, eventWithTimestamp)
}

export async function getEvents(email: string) {
  if (!isBrowser) return []
  const db = await dbPromise
  if (!db) return []
  return db.getAllFromIndex("events", "by-email", email)
}

export async function getEvent(email: string, id: number) {
  if (!isBrowser) return null
  const db = await dbPromise
  if (!db) return null
  return db.get("events", [email, id])
}

export async function updateEvent(event: { id: number; name: string; gifts: any[]; email: string }) {
  if (!isBrowser) return
  const db = await dbPromise
  if (!db) return
  const eventWithTimestamp = { ...event, lastModified: Date.now() }
  await db.put("events", eventWithTimestamp)
  await addToSyncQueue("update", event.id, eventWithTimestamp)
}

export async function deleteEvent(email: string, id: number) {
  if (!isBrowser) return
  const db = await dbPromise
  if (!db) return
  await db.delete("events", [email, id])
  await addToSyncQueue("delete", id)
}

async function addToSyncQueue(action: "create" | "update" | "delete", eventId: number, data?: any) {
  const db = await dbPromise
  if (!db) return
  await db.add("syncQueue", {
    action,
    eventId,
    data,
    timestamp: Date.now(),
  })
}

export async function syncWithServer() {
  if (!isBrowser) return
  const db = await dbPromise
  if (!db) return
  const syncQueue = await db.getAll("syncQueue")

  for (const item of syncQueue) {
    try {
      // Implement your server sync logic here
      // For example:
      // await fetch('/api/sync', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(item),
      // })

      // If successful, remove the item from the sync queue
      await db.delete("syncQueue", item.timestamp)
    } catch (error) {
      console.error("Error syncing item:", error)
      // You might want to implement a retry mechanism here
    }
  }
}

export function setupOnlineListener() {
  if (!isBrowser) return
  window.addEventListener("online", () => {
    syncWithServer()
  })
}

export function getInitialEvents() {
  return []
}

