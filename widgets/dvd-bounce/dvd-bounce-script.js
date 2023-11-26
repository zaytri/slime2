let currentVideoUrl = null
let currentMediaType = null

// the slime2:ready event is fired once
// indicates that the slime2 global variable is ready to use
addEventListener('slime2:ready', () => {
  slime2.widget.loadSettings('dvd-bounce-data.js', settings)
  run()
})

// this event is fired every time a widget setting is changed
// use this to update the widget live, rather than the user having to refresh
addEventListener('slime2:widget-data-update', () => {
  // slime2.widget.getData() will always fetch the latest data
  const data = slime2.widget.getData()

  const { width, height, opacity, mediaType, image, video, textBox } = data

  $('#dvd')
    .removeClass()
    .addClass(`media-${mediaType}`)
    .css({
      '--width': `${width}px`,
      '--height': `${height}px`,
      '--opacity': opacity / 100,
      '--image': `url('${image.url}')`,
    })

  const videoSource = $('#video source')
  const videoElement = $('#video')[0]
  videoElement.volume = video.volume / 100

  if (mediaType === 'video') {
    if (currentVideoUrl !== video.url || currentMediaType !== mediaType) {
      if (currentVideoUrl) videoElement.pause()
      videoSource.attr('src', video.url)
      currentVideoUrl = video.url
      videoElement.load()
    }
  } else {
    videoElement.pause()
    videoSource.removeAttr('src')
    videoElement.load()
  }

  $('#text-box').css({
    alignItems: textBox.alignItems,
    textAlign: textBox.textAlign,
    fontFamily: textBox.font,
    fontSize: textBox.fontSize,
    fontWeight: textBox.fontWeight,
    color: textBox.color,
    backgroundColor: textBox.backgroundColor,
    padding: textBox.padding,
    borderRadius: textBox.borderRadius,
    borderWidth: textBox.borderWidth,
    borderColor: textBox.borderColor,
  })

  $('#text').text(textBox.text)

  currentMediaType = mediaType
})

/***********
 * Physics *
 ***********/

const position = { x: -1, y: -1 }
const velocity = { x: 0, y: 0 }

function run() {
  setInterval(update, 10) // 100 fps
}

function update() {
  const { width, height, speed } = slime2.widget.getData()
  if (!speed || !width || !height) return

  const pixelsPerSecond = speed / 100
  const boundingWidth = window.innerWidth
  const boundingHeight = window.innerHeight

  // collide left
  if (position.x < 0) {
    position.x = 0
    velocity.x = 1
  }

  // collide right
  if (position.x > boundingWidth - width) {
    position.x = boundingWidth - width
    velocity.x = -1
  }

  // collide top
  if (position.y < 0) {
    position.y = 0
    velocity.y = 1
  }

  // collide bottom
  if (position.y > boundingHeight - height) {
    position.y = boundingHeight - height
    velocity.y = -1
  }

  position.x += velocity.x * pixelsPerSecond
  position.y += velocity.y * pixelsPerSecond

  $('#dvd').css({
    left: position.x,
    top: position.y,
  })
}

/************************
 * Settings Definitions *
 ************************/

function defineSetting(label, id, type, options) {
  return { label, id, type, ...options }
}

function defineSettingOption(label, value) {
  return { label, value }
}

const settings = [
  defineSetting(
    `# DVD Bounce v1.0.0 by [Zaytri](https://zaytri.com/)
Questions and Support: https://forums.slime2.stream/threads/20/`,
    'title',
    'text-display',
  ),
  defineSetting('Width (px)', 'width', 'number-input', {
    defaultValue: 305,
    slider: true,
    min: 1,
    max: 1000,
    step: 1,
  }),
  defineSetting('Height (px)', 'height', 'number-input', {
    defaultValue: 137,
    slider: true,
    min: 1,
    max: 1000,
    step: 1,
  }),
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
    options: [
      defineSettingOption('Image', 'image'),
      defineSettingOption('Video', 'video'),
      defineSettingOption('Text Box', 'text'),
    ],
  }),
  defineSetting('Image Settings', 'image', 'group', {
    settings: [
      defineSetting('Image', 'url', 'image-input', {
        defaultValue: 'assets/dvd logo.png',
      }),
    ],
  }),
  defineSetting('Video Settings', 'video', 'group', {
    settings: [
      defineSetting('Video', 'url', 'video-input'),
      defineSetting('Volume (%)', 'volume', 'number-input', {
        defaultValue: 50,
        slider: true,
        min: 0,
        max: 100,
        step: 1,
      }),
    ],
  }),
  defineSetting('Text Box Settings', 'textBox', 'group', {
    settings: [
      defineSetting('Text', 'text', 'text-input', {
        defaultValue: 'Your Text Here',
        multiline: true,
      }),
      defineSetting('Text Vertical Align', 'alignItems', 'select-input', {
        defaultValue: 'center',
        options: [
          defineSettingOption('Top', 'flex-start'),
          defineSettingOption('Center', 'center'),
          defineSettingOption('Bottom', 'flex-end'),
        ],
      }),
      defineSetting('Text Horizontal Align', 'textAlign', 'select-input', {
        defaultValue: 'center',
        options: [
          defineSettingOption('Left', 'left'),
          defineSettingOption('Center', 'center'),
          defineSettingOption('Right', 'right'),
        ],
      }),
      defineSetting('Font', 'font', 'font-input'),
      defineSetting('Font Size (px)', 'fontSize', 'number-input', {
        defaultValue: 24,
        min: 1,
        step: 1,
      }),
      defineSetting('Font Weight', 'fontWeight', 'select-input', {
        defaultValue: 'normal',
        options: ['Normal', 'Bold']
          .map(label => {
            return defineSettingOption(label, label.toLowerCase())
          })
          .concat(
            [100, 200, 300, 400, 500, 600, 700, 800, 900].map(value => {
              return defineSettingOption(value.toString(), value)
            }),
          ),
      }),

      defineSetting('Text Color', 'color', 'color-input', {
        defaultValue: 'white',
      }),
      defineSetting('Background Color', 'backgroundColor', 'color-input', {
        defaultValue: 'black',
      }),
      defineSetting('Padding (px)', 'padding', 'number-input', {
        defaultValue: 0,
        min: 0,
        step: 1,
      }),
      defineSetting('Border Radius (px)', 'borderRadius', 'number-input', {
        defaultValue: 0,
        min: 0,
        step: 1,
      }),
      defineSetting('Border Width (px)', 'borderWidth', 'number-input', {
        defaultValue: 0,
        min: 0,
        step: 1,
      }),
      defineSetting('Border Color', 'borderColor', 'color-input', {
        defaultValue: 'transparent',
      }),
    ],
  }),
]
