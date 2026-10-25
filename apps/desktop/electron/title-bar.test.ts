import { describe, expect, it } from 'vitest'

import { hasCustomTitleBar, TITLE_BAR_HEIGHT, titleBarLook } from './title-bar'

describe('the window title bar', () => {
  it('is drawn by the window only on Windows', () => {
    expect(hasCustomTitleBar('win32')).toBe(true)
    expect(hasCustomTitleBar('linux')).toBe(false)
    expect(hasCustomTitleBar('darwin')).toBe(false)
  })

  it('takes two hex colors and gives the buttons their look', () => {
    expect(titleBarLook('#e2dbc9', '#1c1b17')).toEqual({
      color: '#e2dbc9',
      height: TITLE_BAR_HEIGHT,
      symbolColor: '#1c1b17'
    })
  })

  it('refuses anything that is not a hex color', () => {
    expect(titleBarLook('red', '#000000')).toBeNull()
    expect(titleBarLook('#fff', '#000000')).toBeNull()
    expect(titleBarLook('#ffffff', 'url(x)')).toBeNull()
    expect(titleBarLook(1, null)).toBeNull()
  })
})
