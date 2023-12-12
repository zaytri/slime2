// the slime2:ready event is fired once
// indicates that the slime2 global variable is ready to use
addEventListener('slime2:ready', () => {
  slime2.widget.loadSettings('data-slime-chat.js', [
    defineSetting(
      `# Slime Chat v3.1.0 by [Zaytri](https://zaytri.com/)
Questions and Support: https://forums.slime2.stream/threads/20/`,
      'title',
      'text-display',
    ),
    alignmentSettings,
    animationSettings,
    badgeSettings,
    delaySettings,
    disappearingSettings,
    emoteSettings,
    filterSettings,
    pronounsSettings,
    soundSettings,
    textSettings,
  ])
})

/************************
 * Setting Definitions *
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

const alignmentSettings = defineSetting('Alignment', 'alignment', 'group', {
  settings: [
    defineSetting('Direction', 'direction', 'select-input', {
      defaultValue: 'vertical',
      options: defineOptions(
        ['Vertical', 'Horizontal'].map(label => [label, label.toLowerCase()]),
      ),
    }),
    defineSetting('Corner', 'corner', 'select-input', {
      defaultValue: 'bottom-left',
      placeholder: 'Command prefix',
      options: defineOptions(
        ['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right'].map(label => [
          label,
          label.replaceAll(' ', '-').toLowerCase(),
        ]),
      ),
    }),
  ],
})

const disappearingSettings = defineSetting(
  'Disappearing',
  'disappear',
  'group',
  {
    settings: [
      defineSetting('Expiration time (seconds)', 'expiration', 'number-input', {
        min: 0,
        step: 1,
        placeholder: 'Seconds',
        description:
          'Each messages will be removed after the expiration time. If empty or set to 0, messages will never expire.',
      }),
      defineSetting('Maximum number of messages', 'max', 'number-input', {
        defaultValue: 100,
        min: 0,
        max: 200,
        step: 1,
        description:
          'When there are more messages than the max, the oldest messages will be removed.',
      }),
    ],
  },
)

const delaySettings = defineSetting('Delay', 'delay', 'group', {
  settings: [
    defineSetting('Message Delay (seconds)', 'amount', 'number-input', {
      defaultValue: 0,
      min: 0,
      step: 1,
      description: 'Adds a delay before chat messages appear.',
    }),
  ],
})

const emoteSettings = defineSetting('Emotes', 'emotes', 'group', {
  settings: [
    defineSetting('Static emotes', 'static', 'boolean-input', {
      defaultValue: false,
      description:
        'When enabled, all emotes will be static instead of animated.',
    }),
    defineSetting('Use dynamic emote sizing', 'dynamic', 'boolean-input', {
      defaultValue: true,
      description:
        'When enabled, emotes are larger when the chat message only contains emotes.',
    }),
    defineSetting(
      'Dynamic size for multiple emotes (px)',
      'medium',
      'number-input',
      {
        defaultValue: 56,
        slider: true,
        min: 28,
        max: 112,
        step: 1,
        description: 'When a message only contains multiple emotes.',
      },
    ),
    defineSetting(
      'Dynamic size for single emote (px)',
      'large',
      'number-input',
      {
        defaultValue: 112,
        slider: true,
        min: 28,
        max: 112,
        step: 1,
        description: 'When a message only contains a single emote.',
      },
    ),
    defineSetting(
      'Dynamic emote sizing example',
      'dynamicPreview',
      'image-display',
      {
        url: 'https://i.imgur.com/vfHCWjB.png',
        alt: [
          'Three chat messages.',
          "The first one contains text and an emote, showing the emote at it's normal size.",
          'The second one contains 3 emotes, showing the emotes at a larger size.',
          "The third one contains a single emote, showing the emote at it's largest size.",
        ].join('\n'),
      },
    ),
  ],
})

const badgeSettings = defineSetting('Badges', 'badges', 'group', {
  settings: [
    defineSetting('Show Twitch Badges', 'display', 'boolean-input', {
      defaultValue: true,
    }),
    defineSetting('Badge Size (px)', 'size', 'number-input', {
      defaultValue: 24,
      min: 0,
      step: 1,
    }),
  ],
})

const pronounsSettings = defineSetting('Pronouns', 'pronouns', 'group', {
  settings: [
    defineSetting(
      'Set your pronouns here: https://pronouns.alejo.io/',
      'link',
      'text-display',
    ),
    defineSetting('Pronouns Display', 'display', 'select-input', {
      defaultValue: 'lowercase',
      options: defineOptions(
        ['Lowercase', 'Capitalize', 'Uppercase', 'Hidden'].map(label => [
          label,
          label.toLowerCase(),
        ]),
      ),
      description: [
        'Examples:',
        '- Lowercase: she/her',
        '- Capitalize: She/Her',
        '- Uppercase: SHE/HER',
        'Hidden: For when you want a more compact chat.',
      ].join('\n'),
    }),
  ],
})

const botFilterSettings = defineSetting('Bot Filters', 'botFilters', 'group', {
  settings: [
    defineSetting('Bots to hide', 'names', 'text-input', {
      multiple: true,
      defaultValue: ['Sery_Bot', 'Nightbot', 'StreamElements', 'Streamlabs'],
      placeholder: 'Bot name',
      description: 'Use this to hide chat messages from specific bots.',
    }),
    defineSetting('Command prefixes to hide', 'prefixes', 'text-input', {
      multiple: true,
      defaultValue: ['!'],
      placeholder: 'Command prefix',
      description:
        'Chat messages that start with these prefixes will be hidden. For example, if one of the prefixes is ! then messages like !socials or !followage will be hidden.',
    }),
  ],
})

const userFilterSettings = defineSetting(
  'User Filters',
  'userFilters',
  'group',
  {
    settings: [
      defineSetting(
        'Show messages from these types of users',
        'types',
        'select-input',
        {
          multiple: true,
          defaultValue: ['all', 'subs', 'mods', 'vips', 'followers', 'artists'],
          options: defineOptions([
            ['Everyone', 'all'],
            ['Followers', 'followers'],
            ['Subscribers', 'subs'],
            ['Moderators', 'mods'],
            ['VIPs', 'vips'],
            ['Artists', 'artists'],
          ]),
        },
      ),
      defineSetting('Follow age (hours)', 'followHours', 'number-input', {
        min: 0,
        step: 'any',
        placeholder: 'Hours',
        description:
          "If you're using the follower option above, users will only be considered a follower if they have followed for at least this many hours.",
      }),
      defineSetting(
        'Always show messages from these users',
        'users',
        'text-input',
        {
          multiple: true,
          placeholder: 'Username',
          description:
            'These users will always have their messages shown regardless of the options above.',
        },
      ),
    ],
  },
)

const messageFilterSettings = defineSetting(
  'Message Filters',
  'messageFilters',
  'group',
  {
    settings: [
      defineSetting('Hide these message types', 'types', 'select-input', {
        multiple: true,
        defaultValue: [],
        options: defineOptions([
          ['First-time chat', 'first'],
          ['/me message', 'action'],
          ['Messages with text', 'text'],
          ['Messages with emotes', 'emote'],
          ['Message with bits', 'cheer'],
          ['Replies', 'reply'],
          ['Highlighted', 'highlight'],
          ['Channel point redemption message', 'redeem'],
          ['Resub message', 'resub'],
          ['Announcements', 'announcement'],
        ]),
      }),
      defineSetting(
        'Hide messages containing these words',
        'words',
        'text-input',
        {
          multiple: true,
          description:
            'Messages that contain these words will never be shown, regardless of other filters.',
        },
      ),
    ],
  },
)

const filterSettings = defineSetting('Filters', 'filters', 'group', {
  settings: [botFilterSettings, userFilterSettings, messageFilterSettings],
})

const soundSettings = defineSetting('Sound Effect', 'sound', 'group', {
  settings: [
    defineSetting('Sound', 'audio', 'audio-input', {
      description: 'This sound effect will be played for every chat message.',
    }),
    defineSetting('Volume (%)', 'volume', 'number-input', {
      defaultValue: 50,
      slider: true,
      min: 0,
      max: 100,
      step: 1,
    }),
  ],
})

const textSettings = defineSetting('Text Styles', 'textStyles', 'group', {
  settings: [
    defineSetting('Custom Font Name', 'font', 'font-input'),
    defineSetting('Font Size (px)', 'size', 'number-input', {
      defaultValue: 16,
      min: 0,
      step: 1,
    }),
    defineSetting('Font Weight', 'weight', 'select-input', {
      defaultValue: 800,
      options: defineOptions(
        ['Normal', 'Bold']
          .map(label => [label, label.toLowerCase()])
          .concat(
            [100, 200, 300, 400, 500, 600, 700, 800, 900].map(value => [
              value.toString(),
              value,
            ]),
          ),
      ),
    }),
    defineSetting('Username Color', 'usernameColorOption', 'select-input', {
      defaultValue: 'user-light',
      options: defineOptions([
        ['Twitch Light', 'user-light'],
        ['Twitch Dark', 'user-dark'],
        ['Twitch', 'user'],
        ['Custom', 'custom'],
      ]),
      description:
        'Twitch Light/Dark are lightened/darkened versions of the username colors people have chosen in chat.',
    }),
    defineSetting('Custom Username Color', 'usernameColor', 'color-input', {
      defaultValue: 'white',
      description: 'This will only be applied when you select "Custom" above.',
    }),
    defineSetting('Message Text Color', 'textColor', 'color-input', {
      defaultValue: 'white',
      description: 'This will only be applied when you select "Custom" above.',
    }),
    defineSetting('Edge Style', 'edge', 'select-input', {
      defaultValue: 'outline-2',
      options: defineOptions(
        [
          'Outline 1',
          'Outline 2',
          'Bottom Shadow 1',
          'Bottom Shadow 2',
          'Bottom Right Shadow 1',
          'Bottom Right Shadow 2',
          'None',
        ].map(label => [label, label.replaceAll(' ', '-').toLowerCase()]),
      ),
    }),
    defineSetting('Edge Color', 'edgeColor', 'color-input', {
      defaultValue: 'black',
    }),
  ],
})

const animationSettings = defineSetting('Animations', 'animations', 'group', {
  settings: [
    defineSetting('Entrance Animation', 'enter', 'select-input', {
      defaultValue: 'none',
      options: defineOptions(
        ['Fade', 'Fade Left', 'Fade Right', 'None'].map(label => [
          label,
          label.replaceAll(' ', '-').toLowerCase(),
        ]),
      ),
    }),
    defineSetting('Exit Animation', 'exit', 'select-input', {
      defaultValue: 'none',
      options: defineOptions(
        ['Fade', 'Fade Left', 'Fade Right', 'None'].map(label => [
          label,
          label.replaceAll(' ', '-').toLowerCase(),
        ]),
      ),
    }),
  ],
})
