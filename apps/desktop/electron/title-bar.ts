/**
 * The window's own title bar on Windows: the system's bar takes its color from the user's accent
 * and no theme can reach it, so the window draws the bar itself (a strip of the page, which drags
 * the window) and Electron keeps only the three buttons, painted in the theme's colors.
 */
export const TITLE_BAR_HEIGHT = 32

/** Only Windows: Linux keeps its system bar and macOS its traffic lights. */
export function hasCustomTitleBar(platform: string): boolean {
  return platform === 'win32'
}

const COLOR = /^#[0-9a-f]{6}$/i

/** The buttons' look, from what the page asked: two `#rrggbb` colors, or nothing for anything else. */
export function titleBarLook(
  color: unknown,
  symbolColor: unknown
): null | { color: string; height: number; symbolColor: string } {
  if (typeof color !== 'string' || typeof symbolColor !== 'string' || !COLOR.test(color) || !COLOR.test(symbolColor)) {
    return null
  }

  return { color, height: TITLE_BAR_HEIGHT, symbolColor }
}
