addEventListener('slime2:ready', () => {
  slime2.widget.loadSettings('data-scrolling-chat.js', [
    defineSetting(
      [
        'Scrolling Chat v2.0.1 by Zaytri: https://zaytri.com/',
        '',
        'Questions and Support: https://forums.slime2.stream/threads/27/',
      ].join('\n'),
      'title',
      'text-display',
    ),
    displaySettings,
    filterSettings,
    pronounsSettings,
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

const displaySettings = defineSetting('Display', 'display', 'group', {
  settings: [
    defineSetting('Scroll Speed (pixels per second)', 'speed', 'number-input', {
      defaultValue: 100,
      slider: true,
      min: 1,
      max: 1000,
      step: 1,
      description:
        "Affects new messages when you change it. I don't recommend going above 150 for text, but higher speeds could be fun when Emotes Only is enabled.",
    }),
    defineSetting('Message Max', 'max', 'number-input', {
      defaultValue: 30,
      min: 0,
      max: 200,
      step: 1,
      description:
        'When there are more messages than the max, the oldest messages will be removed.',
    }),
    defineSetting('Message Delay (seconds)', 'delay', 'number-input', {
      defaultValue: 0,
      min: 0,
      step: 'any',
      description: 'Adds a delay before messages show up on screen.',
    }),
    defineSetting('Hide Twitch Badges', 'hideBadges', 'boolean-input', {
      defaultValue: false,
    }),
    defineSetting('Hide All User Info', 'hideUser', 'boolean-input', {
      defaultValue: false,
      description:
        'When enabled, badges, username, and pronouns will be hidden.',
    }),
    defineSetting('Emotes Only', 'emoteOnly', 'boolean-input', {
      defaultValue: false,
      description:
        'When enabled, only emotes will be shown. You can use this to create a scrolling emote wall effect. Emote size scales off of font size in Text Styles.',
    }),
    defineSetting('Static Emotes', 'static', 'boolean-input', {
      defaultValue: false,
      description:
        'When enabled, all emotes will be static instead of animated.',
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
      options: ['Lowercase', 'Capitalize', 'Uppercase'].map(label => {
        return { label, value: label.toLowerCase() }
      }),
      description: [
        'Examples:',
        '- Lowercase: she/her',
        '- Capitalize: She/Her',
        '- Uppercase: SHE/HER',
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

const textSettings = defineSetting('Text Styles', 'textStyles', 'group', {
  settings: [
    defineSetting('Custom Font Name', 'font', 'font-input'),
    defineSetting('Font Size (px)', 'size', 'number-input', {
      defaultValue: 24,
      min: 0,
      step: 1,
    }),
    defineSetting('Font Weight', 'weight', 'select-input', {
      defaultValue: 900,
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
    defineSetting('Text Color', 'colorOption', 'select-input', {
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
    defineSetting('Custom Text Color', 'color', 'color-input', {
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
        ].map(label => {
          return [label, label.replaceAll(' ', '-').toLowerCase()]
        }),
      ),
    }),
    defineSetting('Edge Color', 'edgeColor', 'color-input', {
      defaultValue: 'black',
    }),
  ],
})
