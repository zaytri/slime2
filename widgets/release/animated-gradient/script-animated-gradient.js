// this event is fired every time a widget setting is changed
// use this to update the widget live, rather than the user having to refresh
addEventListener('slime2:widget-data-update', () => {
  // slime2.widget.getData() will always fetch the latest data
  const data = slime2.widget.getData()

  const { animation, colors, border, fill, glow } = data

  const rotateColors = []
  const linearColors = []
  colors.forEach(data => {
    rotateColors.push(data.color)
    rotateColors.push(data.color)
    linearColors.push(data.color)
  })

  const firstColor = rotateColors.shift()
  rotateColors.push(firstColor)

  if (colors.length > 1) {
    linearColors.push(colors[0].color)
    linearColors.push(colors[1].color)
  }

  const container = $('#container').removeClass()

  container
    .addClass([`animation-${animation.type}`, `glow-edge-${glow.edge}`])
    .css({
      '--firstColor': colors[0] ? colors[0].color : 'transparent',
      '--rotateColors': rotateColors.join(', '),
      '--linearColors': linearColors.join(', '),
      '--colorCount': colors.length,
      '--speed': `${100 / Math.min(animation.speed, 20)}s`,
      '--borderWidth': `${border.width}px`,
      '--borderRadius': `${border.radius}px`,
      '--glowSize': `${glow.size}px`,
      '--glowOpacity': glow.opacity / 100,
    })

  if (animation.reverse) container.addClass('animation-reverse')
  if (fill) container.addClass('fill')
  if (!glow.size || !glow.opacity) container.addClass('glow-zero')
  if (colors.length < 2) container.addClass('colors-1')
})
