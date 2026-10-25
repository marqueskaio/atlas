/**
 * The window's light, sand or dark look (asked for by the user on 18/10/2026), kept as
 * a `dark` class on the page's root, which Tailwind's `dark:` reads, and the choice kept
 * in the window's own storage, a look of this computer and not of a home. Light, dark, or the
 * system's (on the settings screen since step 15b), which it follows as it changes;
 * until the user chooses, the system's.
 */
import { atom } from 'nanostores'

export type Theme = 'dark' | 'light' | 'sand'
export type ThemeChoice = 'system' | Theme

const KEY = 'atlas.theme'
const SYSTEM_DARK = '(prefers-color-scheme: dark)'

/** The system's dark query; none in the tests' window, which has no `matchMedia`. */
function media(): MediaQueryList | undefined {
  return typeof globalThis.matchMedia === 'function' ? globalThis.matchMedia(SYSTEM_DARK) : undefined
}

function chosen(): ThemeChoice {
  const stored = localStorage.getItem(KEY)

  return stored === 'dark' || stored === 'light' || stored === 'sand' ? stored : 'system'
}

function system(): Theme {
  return media()?.matches ? 'dark' : 'light'
}

function resolved(choice: ThemeChoice): Theme {
  return choice === 'system' ? system() : choice
}

/** What the user chose. */
export const $themeChoice = atom<ThemeChoice>(chosen())
/** The look on screen. */
export const $theme = atom<Theme>(resolved(chosen()))

function paint(theme: Theme): void {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.classList.toggle('sand', theme === 'sand')
  root.style.colorScheme = theme === 'dark' ? 'dark' : 'light'
}

/** Paint the look now, and follow the system's while it is the one chosen. */
export function startTheme(): void {
  paint($theme.get())
  media()?.addEventListener('change', () => {
    if ($themeChoice.get() === 'system') {
      $theme.set(system())
      paint($theme.get())
    }
  })
}

export function setTheme(choice: ThemeChoice): void {
  if (choice === 'system') {
    localStorage.removeItem(KEY)
  } else {
    localStorage.setItem(KEY, choice)
  }
  $themeChoice.set(choice)
  $theme.set(resolved(choice))
  paint($theme.get())
}
