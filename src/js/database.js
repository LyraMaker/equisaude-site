import { openDB } from "idb"

const DB_NAME = 'MeuBanco'
const DB_VERSION = 5
const STORE_NAME = 'fichasAnimal'

let dbInstance = null

/**
 * Singleton do banco (garante uma única conexão)
 */
async function getDB() {
    if (dbInstance) return dbInstance

    dbInstance = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            console.log('⚙️ Upgrade do banco executando...')

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                console.log('📦 Criando store:', STORE_NAME)

                const store = db.createObjectStore(STORE_NAME, {
                    keyPath: 'id',
                    autoIncrement: true
                })

                store.createIndex('ficha', 'ficha')
            }
        }
    })

    console.log('📚 Stores disponíveis:', [...dbInstance.objectStoreNames])

    return dbInstance
}

export async function add(data) {
    try {
        const db = await getDB()
        const id = await db.add(STORE_NAME, data)

        return { success: true, id }

    } catch (error) {
        console.error('❌ Erro ao adicionar:', error)
        return { success: false, error }
    }
}

export async function get(id) {
    const db = await getDB()
    return db.get(STORE_NAME, id)
}

export async function update(id, data) {
  const db = await getDB()
  return db.put(STORE_NAME, { ...data, id })
} 

export async function getAll() {
    const db = await getDB()
    return db.getAll(STORE_NAME)
}

export async function remove(id) {
    const db = await getDB()
    return db.delete(STORE_NAME, id)
}

export async function getByFicha(ficha) {
    const db = await getDB()
    return db.getFromIndex(STORE_NAME, 'ficha', ficha)
}

export function verifyCompatibility() {
    if (!window.indexedDB) {
        alert("Seu navegador não suporta IndexedDB.")
        return false
    }
    return true
}