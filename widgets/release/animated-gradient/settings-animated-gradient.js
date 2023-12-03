addEventListener('slime2:ready', () => {
  slime2.widget.loadSettings('data-animated-gradient.js', [
    defineSetting(
      `Animated Gradient v2.0.1 by Zaytri (https://zaytri.com/)

  Questions and Support: https://forums.slime2.stream/threads/51/

  Rate and Review: https://forums.slime2.stream/resources/17/`,
      'title',
      'text-display',
    ),
    defineSetting('Fill', 'fill', 'boolean-input', {
      defaultValue: false,
      description:
        'When enabled, the gradient fills the entire inside of the frame, if you simply want to use this as an animated gradient source.',
    }),
    animationSettings,
    borderSettings,
    colorSettings,
    glowSettings,
  ])
})

/************************
 * Settings Definitions *
 ************************/

function defineSetting(label, id, type, options) {
  return { label, id, type, ...options }
}

function defineOptions(options) {
  return options.map(option => {
    const [label, value] = option
    return { label, value }
  })
}

const animationSettings = defineSetting('Animation', 'animation', 'group', {
  settings: [
    defineSetting('Animation Type', 'type', 'select-input', {
      defaultValue: 'rotate',
      options: defineOptions([
        ['Rotating', 'rotate'],
        ['Vertical', 'vertical'],
        ['Horizontal', 'horizontal'],
        ['Diagonal', 'diagonal'],
        ['Diagonal (Alternate)', 'diagonal-alt'],
      ]),
    }),
    defineSetting('Reverse Direction', 'reverse', 'boolean-input', {
      defaultValue: false,
      description: 'When enabled, the animation direction is reversed.',
    }),
    defineSetting(
      'Animation Speed (loops per 100 seconds)',
      'speed',
      'number-input',
      {
        defaultValue: 5,
        min: 0,
        max: 10,
        step: 'any',
        description:
          'Max is 10 (1 loop every 10 seconds, to prevent flashing colors).',
      },
    ),
  ],
})

const borderSettings = defineSetting('Border', 'border', 'group', {
  settings: [
    defineSetting('Border Width', 'width', 'number-input', {
      defaultValue: 25,
      slider: true,
      min: 0,
      max: 500,
      step: 1,
    }),
    defineSetting('Border Radius', 'radius', 'number-input', {
      defaultValue: 50,
      slider: true,
      min: 0,
      max: 1000,
      step: 1,
    }),
  ],
})

const glowSettings = defineSetting('Glow', 'glow', 'group', {
  settings: [
    defineSetting('Glow Edge', 'edge', 'select-input', {
      defaultValue: 'inner',
      options: defineOptions(
        ['Both', 'Outer', 'Inner'].map(label => {
          return [label, label.toLowerCase()]
        }),
      ),
    }),
    defineSetting('Glow Size (px)', 'size', 'number-input', {
      defaultValue: 0,
      slider: true,
      min: 0,
      max: 100,
      step: 1,
    }),
    defineSetting('Glow Opacity (%)', 'opacity', 'number-input', {
      defaultValue: 100,
      slider: true,
      min: 0,
      max: 100,
      step: 1,
    }),
  ],
})

const colorSettings = defineSetting('Colors', 'colors', 'group', {
  multiple: true,
  defaultValues: [
    { color: '#ff00cb' },
    { color: '#ffd400' },
    { color: '#fff100' },
    { color: '#7bc714' },
    { color: '#00fff3' },
    { color: '#a451f5' },
  ],
  settings: [
    defineSetting('Color', 'color', 'color-input', {
      defaultValue: 'black',
    }),
  ],
})
