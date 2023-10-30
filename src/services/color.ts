import Color from 'colorjs.io'
import type { ColorTypes } from 'colorjs.io/types/src/color'

export default class Slime2Color extends Color {
  static light(foreground: ColorTypes): string {
    return new Color(
      this._generateAccessibleColor(foreground, 'black'),
    ).toString({
      format: 'hex',
    })
  }

  static dark(foreground: ColorTypes): string {
    return new Color(
      this._generateAccessibleColor(foreground, 'white'),
    ).toString({
      format: 'hex',
    })
  }

  static accessibleBackground(foreground: ColorTypes): 'black' | 'white' {
    const blackBackgroundContrast = this._contrast('black', foreground)
    const whiteBackgroundContrast = this._contrast('white', foreground)

    return blackBackgroundContrast > whiteBackgroundContrast ? 'black' : 'white'
  }

  static accessibleForeground(background: ColorTypes): 'black' | 'white' {
    const blackTextContrast = this._contrast(background, 'black')
    const whiteTextContrast = this._contrast(background, 'white')

    return blackTextContrast > whiteTextContrast ? 'black' : 'white'
  }

  private static _generateAccessibleColor(
    foreground: ColorTypes,
    targetBackground: 'black' | 'white',
  ): ColorTypes {
    let newColor = foreground

    const colors = this.steps(
      foreground,
      targetBackground === 'black' ? 'white' : 'black',
      {
        space: 'hsv',
        outputSpace: 'srgb',
        steps: 9,
      },
    )

    for (const color of colors) {
      if (this._contrast(targetBackground, color) > 75) {
        newColor = color
        break
      }
    }

    return newColor
  }

  private static _contrast(
    background: ColorTypes,
    foreground: ColorTypes,
  ): number {
    return Math.abs(this.contrastAPCA(background, foreground))
  }
}
