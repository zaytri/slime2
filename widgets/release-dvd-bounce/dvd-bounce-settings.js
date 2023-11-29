addEventListener('slime2:ready', () => {
  slime2.widget.loadSettings('dvd-bounce-data.js', settings)
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

const settings = [
  defineSetting(
    `DVD Bounce v1.0.1 by Zaytri (https://zaytri.com/)

Questions and Support: https://forums.slime2.stream/threads/45/

Rate and Review: https://forums.slime2.stream/resources/16/`,
    'title',
    'text-display',
  ),
  defineSetting('Opacity (%)', 'opacity', 'number-input', {
    defaultValue: 100,
    slider: true,
    min: 0,
    max: 100,
    step: 1,
  }),
  defineSetting('Speed (pixels per second)', 'speed', 'number-input', {
    defaultValue: 100,
    slider: true,
    min: 1,
    max: 1000,
    step: 1,
  }),
  defineSetting('Media Type', 'mediaType', 'select-input', {
    defaultValue: 'image',
    options: defineOptions([
      ['Image', 'image'],
      ['Video', 'video'],
      ['Text', 'text'],
    ]),
  }),
  defineSetting('Image Settings', 'image', 'group', {
    settings: [
      defineSetting('Image', 'url', 'image-input', {
        defaultValue: 'assets/dvd logo.png',
      }),
      defineSetting('Scale (%)', 'scale', 'number-input', {
        defaultValue: 30,
        slider: true,
        min: 1,
        max: 200,
        step: 1,
        description:
          'Changes the image size proportionally based on the scale.',
      }),
    ],
  }),
  defineSetting('Video Settings', 'video', 'group', {
    settings: [
      defineSetting('Video', 'url', 'video-input'),
      defineSetting('Volume (%)', 'volume', 'number-input', {
        defaultValue: 0,
        slider: true,
        min: 0,
        max: 100,
        step: 1,
      }),
      defineSetting('Scale (%)', 'scale', 'number-input', {
        defaultValue: 100,
        slider: true,
        min: 1,
        max: 200,
        step: 1,
        description:
          'Changes the video size proportionally based on the scale.',
      }),
    ],
  }),
  defineSetting('Text Settings', 'text', 'group', {
    settings: [
      defineSetting('Text', 'text', 'text-input', {
        defaultValue: 'Your Text Here',
        multiline: true,
      }),
      defineSetting('Text Align', 'textAlign', 'select-input', {
        defaultValue: 'center',
        options: defineOptions([
          ['Left', 'left'],
          ['Center', 'center'],
          ['Right', 'right'],
        ]),
      }),
      defineSetting('Text Color', 'color', 'color-input', {
        defaultValue: 'white',
      }),
      defineSetting('Background Color', 'backgroundColor', 'color-input', {
        defaultValue: 'black',
      }),
      defineSetting('Font', 'font', 'group', {
        settings: [
          defineSetting('Custom Font', 'name', 'font-input'),
          defineSetting('Font Size (px)', 'size', 'number-input', {
            defaultValue: 72,
            min: 1,
            step: 1,
          }),
          defineSetting('Font Weight', 'weight', 'select-input', {
            defaultValue: 'normal',
            options: defineOptions(
              ['Normal', 'Bold']
                .map(label => {
                  return [label, label.toLowerCase()]
                })
                .concat(
                  [100, 200, 300, 400, 500, 600, 700, 800, 900].map(value => {
                    return [value.toString(), value]
                  }),
                ),
            ),
          }),
        ],
      }),
      defineSetting('Padding', 'padding', 'group', {
        settings: [
          defineSetting('Padding Top (px)', 'top', 'number-input', {
            defaultValue: 20,
            min: 0,
            step: 1,
          }),
          defineSetting('Padding Bottom (px)', 'bottom', 'number-input', {
            defaultValue: 20,
            min: 0,
            step: 1,
          }),
          defineSetting('Padding Left (px)', 'left', 'number-input', {
            defaultValue: 20,
            min: 0,
            step: 1,
          }),
          defineSetting('Padding Right (px)', 'right', 'number-input', {
            defaultValue: 20,
            min: 0,
            step: 1,
          }),
        ],
      }),
      defineSetting('Border', 'border', 'group', {
        settings: [
          defineSetting('Radius (px)', 'radius', 'number-input', {
            defaultValue: 0,
            min: 0,
            step: 1,
            description: 'Curves the corners.',
          }),
          defineSetting('Width (px)', 'width', 'number-input', {
            defaultValue: 0,
            min: 0,
            step: 1,
          }),
          defineSetting('Color', 'color', 'color-input', {
            defaultValue: 'black',
          }),
          defineSetting('Style', 'style', 'select-input', {
            defaultValue: 'solid',
            options: defineOptions(
              [
                'Solid',
                'Dashed',
                'Dotted',
                'Double',
                'Groove',
                'Ridge',
                'Inset',
                'Outset',
                'Hidden',
              ].map(label => {
                return [label, label.toLowerCase()]
              }),
            ),
          }),
        ],
      }),
    ],
  }),
]
