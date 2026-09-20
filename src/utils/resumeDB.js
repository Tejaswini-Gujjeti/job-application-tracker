const DB_NAME = "JobTrackerDB"
const STORE_NAME = "resumes"

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onupgradeneeded = (event) => {
      const db = event.target.result

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "applicationId"
        })
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

export const saveResume = async (applicationId, file) => {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readwrite"
    )

    const store = transaction.objectStore(STORE_NAME)

    store.put({
      applicationId,
      file
    })

    transaction.oncomplete = () => {
      resolve()
    }

    transaction.onerror = () => {
      reject(transaction.error)
    }
  })
}

export const getResume = async (applicationId) => {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readonly"
    )

    const store = transaction.objectStore(STORE_NAME)

    const request = store.get(applicationId)

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

export const deleteResume = async (applicationId) => {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readwrite"
    )

    const store = transaction.objectStore(STORE_NAME)

    store.delete(applicationId)

    transaction.oncomplete = () => {
      resolve()
    }

    transaction.onerror = () => {
      reject(transaction.error)
    }
  })
}