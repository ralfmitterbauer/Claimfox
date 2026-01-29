export function nowTs(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return fallback
    return { ...fallback, ...JSON.parse(raw) }
  } catch {
    return fallback
  }
}

export function writeJson<T>(key: string, value: T): void {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export function resetKeys(keys: string[]): void {
  keys.forEach((key) => sessionStorage.removeItem(key))
}

export function readAudit(key: string): { ts: string; message: string }[] {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function appendAudit(key: string, message: string): void {
  const list = readAudit(key)
  list.unshift({ ts: nowTs(), message })
  sessionStorage.setItem(key, JSON.stringify(list))
}

export function clearAudit(key: string): void {
  sessionStorage.removeItem(key)
}
