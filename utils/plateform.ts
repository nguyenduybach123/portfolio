let isMacResult: boolean | undefined

export function isMac(): boolean {
  if (isMacResult === undefined) {
    isMacResult = navigator.platform.includes('Mac')
  }
  return isMacResult
}

export function getShortcutKey(key: string): string {
  if (`${key}`.toLowerCase() === 'mod') {
    return isMac() ? '⌘' : 'Ctrl'
  } else if (`${key}`.toLowerCase() === 'alt') {
    return isMac() ? '⌥' : 'Alt'
  } else if (`${key}`.toLowerCase() === 'shift') {
    return isMac() ? '⇧' : 'Shift'
  } else {
    return key
  }
}

export function getShortcutKeys(keys: string[]): string {
  return keys.map(getShortcutKey).join(' ')
}
