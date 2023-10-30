export function getGlobalEmotes(): Slime2.Event.Message.EmoteMap {
  const emoteMap = new Map<string, Slime2.Event.Message.Emote>()

  scrapedGlobalEmojis.forEach(emoji => {
    const name = emoji.shortcuts[0]
    emoteMap.set(name, {
      id: emoji.emojiId,
      name,
      images: {
        default: buildEmoteUrls(emoji.image),
        static: buildEmoteUrls(emoji.image),
      },
      source: 'youtube',
    })
  })

  return emoteMap
}

function buildEmoteUrls(
  image: YouTube.Emoji['image'],
): Slime2.Event.Message.Emote.Urls {
  return {
    x1: image.thumbnails[0].url,
    x2: image.thumbnails[1].url,
    x4: image.thumbnails[1].url,
  }
}

// last scraped 10/20/2023
const scrapedGlobalEmojis: YouTube.Emoji[] = [
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/flower-rainbow-heart-red',
    shortcuts: [':pride-flower-rainbow-heart:'],
    searchTerms: ['pride-flower-rainbow-heart'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/8cF4z9clPGshgty6vT3ImAtx_CUvz3TMY-SAu_UKw-x1Z9-2KzcK4OuyAIROrKhyvcabrw=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/8cF4z9clPGshgty6vT3ImAtx_CUvz3TMY-SAu_UKw-x1Z9-2KzcK4OuyAIROrKhyvcabrw=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-flower-rainbow-heart',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-green-earth-head',
    shortcuts: [':pride-person-earth-intersex:'],
    searchTerms: ['pride-person-earth-intersex'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/Gr-3he7L8jjQFj7aI0kSY1eV4aIsy-vT7Hk5shdakigG9aAJO_uMBmV6haCtK1OHjTEjj1o=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/Gr-3he7L8jjQFj7aI0kSY1eV4aIsy-vT7Hk5shdakigG9aAJO_uMBmV6haCtK1OHjTEjj1o=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-person-earth-intersex',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-yellow-heart-lesbian',
    shortcuts: [':pride-person-heart-lesbian:'],
    searchTerms: ['pride-person-heart-lesbian'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/tKVZ2TfK5tMLvF88cnz2YNVwuHNgr0eDR9Ef8J0OCkZEHXLFUtH3f6-xSHhqhwd2sL3Tu4I=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/tKVZ2TfK5tMLvF88cnz2YNVwuHNgr0eDR9Ef8J0OCkZEHXLFUtH3f6-xSHhqhwd2sL3Tu4I=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-person-heart-lesbian',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-yellow-flower-nonbinary',
    shortcuts: [':pride-person-flower-nonbinary:'],
    searchTerms: ['pride-person-flower-nonbinary'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/le1X4KHLOmK5K1s5xu-owmP_eZK4D0ExyjnMCS6UNqZa-Zh4uEzz3mZnU3jBlLfi14Zpngw=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/le1X4KHLOmK5K1s5xu-owmP_eZK4D0ExyjnMCS6UNqZa-Zh4uEzz3mZnU3jBlLfi14Zpngw=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-person-flower-nonbinary',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/flower-rainbow-heart-pansexual',
    shortcuts: [':pride-flower-pansexual:'],
    searchTerms: ['pride-flower-pansexual'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/blSdVv_UpdTn8BIWU6u9oCWhdtpc0-a-3dJeaRX9As6ftLc0OGPJ1PveQEJbUEDzf6by2Xi9=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/blSdVv_UpdTn8BIWU6u9oCWhdtpc0-a-3dJeaRX9As6ftLc0OGPJ1PveQEJbUEDzf6by2Xi9=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-flower-pansexual',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/heart-stripes-pride-flag',
    shortcuts: [':pride-heart-rainbow-philly:'],
    searchTerms: ['pride-heart-rainbow-philly'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/7iYeXsmU2YMcKsKalaKJhirWdDASATIpl_c7Ib7akaRhvz8GChI4xpM0d0dtASjmmWPbg1NG=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/7iYeXsmU2YMcKsKalaKJhirWdDASATIpl_c7Ib7akaRhvz8GChI4xpM0d0dtASjmmWPbg1NG=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-heart-rainbow-philly',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/symbol-turquoise-flowers-transgender',
    shortcuts: [':pride-flowers-turquoise-transgender:'],
    searchTerms: ['pride-flowers-turquoise-transgender'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/ovz1T6ay1D1GNFXwwYibZeu_rV5_iSRXWSHR2thQDLLWejVQMqWPUhsUWrMMw1tlBwllYA=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/ovz1T6ay1D1GNFXwwYibZeu_rV5_iSRXWSHR2thQDLLWejVQMqWPUhsUWrMMw1tlBwllYA=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-flowers-turquoise-transgender',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/hand-rainbow-fan-open',
    shortcuts: [':pride-fan-rainbow-open:'],
    searchTerms: ['pride-fan-rainbow-open'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/lDH5aORWtlc42NxTwiP3aIUIjttLVvE4Q_xIJDuu55DKvYSLeDIysOEKtGuMmEtOLgvZ_zTX=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/lDH5aORWtlc42NxTwiP3aIUIjttLVvE4Q_xIJDuu55DKvYSLeDIysOEKtGuMmEtOLgvZ_zTX=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-fan-rainbow-open',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/face-pink-hair-earrings',
    shortcuts: [':pride-face-pink-earrings:'],
    searchTerms: ['pride-face-pink-earrings'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/utFog-w4fqgJ05xfQFjSdy8jvRBtFCeuWRkLH3IaVJ4WCBrdjDbXzXOprJA_h6MPOuksv0c=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/utFog-w4fqgJ05xfQFjSdy8jvRBtFCeuWRkLH3IaVJ4WCBrdjDbXzXOprJA_h6MPOuksv0c=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-face-pink-earrings',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/unicorn-white-rainbow-mane',
    shortcuts: [':pride-unicorn-rainbow-mane:'],
    searchTerms: ['pride-unicorn-rainbow-mane'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/fvdANfncTw5aDF8GBq20kHicN5rMVoCMTM3FY8MQbZH9sZXvHy5o48yvHZWN4No5rz8b7-0=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/fvdANfncTw5aDF8GBq20kHicN5rMVoCMTM3FY8MQbZH9sZXvHy5o48yvHZWN4No5rz8b7-0=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-unicorn-rainbow-mane',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/people-embracing-two',
    shortcuts: [':pride-people-embracing-two:'],
    searchTerms: ['pride-people-embracing-two'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/h1zJqFv2R4LzS3ZUpVyHhprCHQTIhbSecqu2Lid23byl5hD5cJdnshluOCyRdldYkWCUNg=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/h1zJqFv2R4LzS3ZUpVyHhprCHQTIhbSecqu2Lid23byl5hD5cJdnshluOCyRdldYkWCUNg=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-people-embracing-two',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/face-green-hair-tears',
    shortcuts: [':pride-face-green-tears:'],
    searchTerms: ['pride-face-green-tears'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/2BNf4_qBG7mqt1sN-JwThp1srHlDr03xoya9hpIvbgS65HwLaaDz46r3A6dy8JnO2GtLNag=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/2BNf4_qBG7mqt1sN-JwThp1srHlDr03xoya9hpIvbgS65HwLaaDz46r3A6dy8JnO2GtLNag=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-face-green-tears',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/megaphone-rainbow-handle',
    shortcuts: [':pride-megaphone-rainbow-handle:'],
    searchTerms: ['pride-megaphone-rainbow-handle'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/cop1MU9YkEuUxbe8d1NhPl1S9uJ60YSVTMM1gelP7Cy0BICa6Ey_TpxEFFdYITtsUK1cSg=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/cop1MU9YkEuUxbe8d1NhPl1S9uJ60YSVTMM1gelP7Cy0BICa6Ey_TpxEFFdYITtsUK1cSg=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-megaphone-rainbow-handle',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/hand-brown-yellow-nails',
    shortcuts: [':pride-hand-yellow-nails:'],
    searchTerms: ['pride-hand-yellow-nails'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/1dEPlxkQ1RdZkPo5CLgYvneMQ-BBo63b3nnASEAXoccnVktMjgviKqMj1pjPiK2zTPTc7g=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/1dEPlxkQ1RdZkPo5CLgYvneMQ-BBo63b3nnASEAXoccnVktMjgviKqMj1pjPiK2zTPTc7g=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-hand-yellow-nails',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/face-orange-hair-flowing',
    shortcuts: [':pride-face-orange-flowing:'],
    searchTerms: ['pride-face-orange-flowing'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/RuhTeU8YiT0_NaOYjMmXv77eEw5eO5Bdzfr7ouS0u3ZAK2J4coKGe5g4fN8mJV85jC63hw=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/RuhTeU8YiT0_NaOYjMmXv77eEw5eO5Bdzfr7ouS0u3ZAK2J4coKGe5g4fN8mJV85jC63hw=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pride-face-orange-flowing',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/CIW60IPp_dYCFcuqTgodEu4IlQ',
    shortcuts: [':yt:'],
    searchTerms: ['yt'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/IkpeJf1g9Lq0WNjvSa4XFq4LVNZ9IP5FKW8yywXb12djo1OGdJtziejNASITyq4L0itkMNw=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/IkpeJf1g9Lq0WNjvSa4XFq4LVNZ9IP5FKW8yywXb12djo1OGdJtziejNASITyq4L0itkMNw=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'yt',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/CN2m5cKr49sCFYbFggodDFEKrg',
    shortcuts: [':oops:'],
    searchTerms: ['oops'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/PFoVIqIiFRS3aFf5-bt_tTC0WrDm_ylhF4BKKwgqAASNb7hVgx_adFP-XVhFiJLXdRK0EQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/PFoVIqIiFRS3aFf5-bt_tTC0WrDm_ylhF4BKKwgqAASNb7hVgx_adFP-XVhFiJLXdRK0EQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'oops',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/X_zdXMHgJaPa8gTGt4f4Ag',
    shortcuts: [':buffering:'],
    searchTerms: ['buffering'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/5gfMEfdqO9CiLwhN9Mq7VI6--T2QFp8AXNNy5Fo7btfY6fRKkThWq35SCZ6SPMVCjg-sUA=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/5gfMEfdqO9CiLwhN9Mq7VI6--T2QFp8AXNNy5Fo7btfY6fRKkThWq35SCZ6SPMVCjg-sUA=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'buffering',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/1v50XorRJ8GQ8gTz_prwAg',
    shortcuts: [':stayhome:'],
    searchTerms: ['stayhome'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/_1FGHypiub51kuTiNBX1a0H3NyFih3TnHX7bHU06j_ajTzT0OQfMLl9RI1SiQoxtgA2Grg=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/_1FGHypiub51kuTiNBX1a0H3NyFih3TnHX7bHU06j_ajTzT0OQfMLl9RI1SiQoxtgA2Grg=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'stayhome',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/8P50XuS9Oo7h8wSqtIagBA',
    shortcuts: [':dothefive:'],
    searchTerms: ['dothefive'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/-nM0DOd49969h3GNcl705Ti1fIf1ZG_E3JxcOUVV-qPfCW6jY8xZ98caNLHkVSGRTSEb7Y9y=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/-nM0DOd49969h3GNcl705Ti1fIf1ZG_E3JxcOUVV-qPfCW6jY8xZ98caNLHkVSGRTSEb7Y9y=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'dothefive',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/Fv90Xq-vJcPq8gTqzreQAQ',
    shortcuts: [':elbowbump:'],
    searchTerms: ['elbowbump'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/2ou58X5XuhTrxjtIM2wew1f-HKRhN_T5SILQgHE-WD9dySzzJdGwL4R1gpKiJXcbtq6sjQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/2ou58X5XuhTrxjtIM2wew1f-HKRhN_T5SILQgHE-WD9dySzzJdGwL4R1gpKiJXcbtq6sjQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'elbowbump',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/Iv90XouTLuOR8gSxxrToBA',
    shortcuts: [':goodvibes:'],
    searchTerms: ['goodvibes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/2CvFOwgKpL29mW_C51XvaWa7Eixtv-3tD1XvZa1_WemaDDL2AqevKbTZ1rdV0OWcnOZRag=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/2CvFOwgKpL29mW_C51XvaWa7Eixtv-3tD1XvZa1_WemaDDL2AqevKbTZ1rdV0OWcnOZRag=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'goodvibes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/Rf90XtDbG8GQ8gTz_prwAg',
    shortcuts: [':thanksdoc:'],
    searchTerms: ['thanksdoc'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/bUnO_VwXW2hDf-Da8D64KKv6nBJDYUBuo13RrOg141g2da8pi9-KClJYlUDuqIwyPBfvOO8=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/bUnO_VwXW2hDf-Da8D64KKv6nBJDYUBuo13RrOg141g2da8pi9-KClJYlUDuqIwyPBfvOO8=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'thanksdoc',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/VP90Xv_wG82o8wTCi7CQAw',
    shortcuts: [':videocall:'],
    searchTerms: ['videocall'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/k5v_oxUzRWmTOXP0V6WJver6xdS1lyHMPcMTfxn23Md6rmixoR5RZUusFbZi1uZwjF__pv4=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/k5v_oxUzRWmTOXP0V6WJver6xdS1lyHMPcMTfxn23Md6rmixoR5RZUusFbZi1uZwjF__pv4=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'videocall',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/dv90XtfhAurw8gTgzar4DA',
    shortcuts: [':virtualhug:'],
    searchTerms: ['virtualhug'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/U1TjOZlqtS58NGqQhE8VWDptPSrmJNkrbVRp_8jI4f84QqIGflq2Ibu7YmuOg5MmVYnpevc=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/U1TjOZlqtS58NGqQhE8VWDptPSrmJNkrbVRp_8jI4f84QqIGflq2Ibu7YmuOg5MmVYnpevc=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'virtualhug',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/hf90Xv-jHeOR8gSxxrToBA',
    shortcuts: [':yougotthis:'],
    searchTerms: ['yougotthis'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/s3uOe4lUx3iPIt1h901SlMp_sKCTp3oOVj1JV8izBw_vDVLxFqk5dq-3NX-nK_gnUwVEXld3=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/s3uOe4lUx3iPIt1h901SlMp_sKCTp3oOVj1JV8izBw_vDVLxFqk5dq-3NX-nK_gnUwVEXld3=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'yougotthis',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/lP90XvOhCZGl8wSO1JmgAw',
    shortcuts: [':sanitizer:'],
    searchTerms: ['sanitizer'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/EJ_8vc4Gl-WxCWBurHwwWROAHrPzxgePodoNfkRY1U_I8L1O2zlqf7-wfUtTeyzq2qHNnocZ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/EJ_8vc4Gl-WxCWBurHwwWROAHrPzxgePodoNfkRY1U_I8L1O2zlqf7-wfUtTeyzq2qHNnocZ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'sanitizer',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/uP90Xq6wNYrK8gTUoo3wAg',
    shortcuts: [':takeout:'],
    searchTerms: ['takeout'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/FizHI5IYMoNql9XeP7TV3E0ffOaNKTUSXbjtJe90e1OUODJfZbWU37VqBbTh-vpyFHlFIS0=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/FizHI5IYMoNql9XeP7TV3E0ffOaNKTUSXbjtJe90e1OUODJfZbWU37VqBbTh-vpyFHlFIS0=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'takeout',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/fAF1XtDQMIrK8gTUoo3wAg',
    shortcuts: [':hydrate:'],
    searchTerms: ['hydrate'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/tpgZgmhX8snKniye36mnrDVfTnlc44EK92EPeZ0m9M2EPizn1vKEGJzNYdp7KQy6iNZlYDc1=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/tpgZgmhX8snKniye36mnrDVfTnlc44EK92EPeZ0m9M2EPizn1vKEGJzNYdp7KQy6iNZlYDc1=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'hydrate',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/vQF1XpyaG_XG8gTs77bACQ',
    shortcuts: [':chillwcat:'],
    searchTerms: ['chillwcat'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/y03dFcPc1B7CO20zgQYzhcRPka5Bhs6iSg57MaxJdhaLidFvvXBLf_i4_SHG7zJ_2VpBMNs=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/y03dFcPc1B7CO20zgQYzhcRPka5Bhs6iSg57MaxJdhaLidFvvXBLf_i4_SHG7zJ_2VpBMNs=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'chillwcat',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/ygF1XpGUMMjk8gSDrI2wCw',
    shortcuts: [':chillwdog:'],
    searchTerms: ['chillwdog'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/Ir9mDxzUi0mbqyYdJ3N9Lq7bN5Xdt0Q7fEYFngN3GYAcJT_tccH1as1PKmInnpt2cbWOam4=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/Ir9mDxzUi0mbqyYdJ3N9Lq7bN5Xdt0Q7fEYFngN3GYAcJT_tccH1as1PKmInnpt2cbWOam4=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'chillwdog',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/8gF1Xp_zK8jk8gSDrI2wCw',
    shortcuts: [':elbowcough:'],
    searchTerms: ['elbowcough'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/DTR9bZd1HOqpRJyz9TKiLb0cqe5Hb84Yi_79A6LWlN1tY-5kXqLDXRmtYVKE9rcqzEghmw=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/DTR9bZd1HOqpRJyz9TKiLb0cqe5Hb84Yi_79A6LWlN1tY-5kXqLDXRmtYVKE9rcqzEghmw=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'elbowcough',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/EAJ1XrS7PMGQ8gTz_prwAg',
    shortcuts: [':learning:'],
    searchTerms: ['learning'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/ZuBuz8GAQ6IEcQc7CoJL8IEBTYbXEvzhBeqy1AiytmhuAT0VHjpXEjd-A5GfR4zDin1L53Q=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/ZuBuz8GAQ6IEcQc7CoJL8IEBTYbXEvzhBeqy1AiytmhuAT0VHjpXEjd-A5GfR4zDin1L53Q=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'learning',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/JAJ1XpGpJYnW8wTupZu4Cw',
    shortcuts: [':washhands:'],
    searchTerms: ['washhands'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/qXUeUW0KpKBc9Z3AqUqr_0B7HbW1unAv4qmt7-LJGUK_gsFBIaHISWJNt4n3yvmAnQNZHE-u=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/qXUeUW0KpKBc9Z3AqUqr_0B7HbW1unAv4qmt7-LJGUK_gsFBIaHISWJNt4n3yvmAnQNZHE-u=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'washhands',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/PAJ1XsOOI4fegwOo57ewAg',
    shortcuts: [':socialdist:'],
    searchTerms: ['socialdist'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/igBNi55-TACUi1xQkqMAor-IEXmt8He56K7pDTG5XoTsbM-rVswNzUfC5iwnfrpunWihrg=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/igBNi55-TACUi1xQkqMAor-IEXmt8He56K7pDTG5XoTsbM-rVswNzUfC5iwnfrpunWihrg=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'socialdist',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/egJ1XufTKYfegwOo57ewAg',
    shortcuts: [':shelterin:'],
    searchTerms: ['shelterin'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/gjC5x98J4BoVSEPfFJaoLtc4tSBGSEdIlfL2FV4iJG9uGNykDP9oJC_QxAuBTJy6dakPxVeC=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/gjC5x98J4BoVSEPfFJaoLtc4tSBGSEdIlfL2FV4iJG9uGNykDP9oJC_QxAuBTJy6dakPxVeC=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'shelterin',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/G8AfY6yWGuKuhL0PlbiA2AE',
    shortcuts: [':hand-pink-waving:'],
    searchTerms: ['hand-pink-waving'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/KOxdr_z3A5h1Gb7kqnxqOCnbZrBmxI2B_tRQ453BhTWUhYAlpg5ZP8IKEBkcvRoY8grY91Q=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/KOxdr_z3A5h1Gb7kqnxqOCnbZrBmxI2B_tRQ453BhTWUhYAlpg5ZP8IKEBkcvRoY8grY91Q=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'hand-pink-waving',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/KsIfY6LzFoLM6AKanYDQAg',
    shortcuts: [':face-blue-smiling:'],
    searchTerms: ['face-blue-smiling'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/cktIaPxFwnrPwn-alHvnvedHLUJwbHi8HCK3AgbHpphrMAW99qw0bDfxuZagSY5ieE9BBrA=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/cktIaPxFwnrPwn-alHvnvedHLUJwbHi8HCK3AgbHpphrMAW99qw0bDfxuZagSY5ieE9BBrA=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-blue-smiling',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/W8IfY_bwAfiPq7IPvNCA2AU',
    shortcuts: [':face-red-droopy-eyes:'],
    searchTerms: ['face-red-droopy-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/oih9s26MOYPWC_uL6tgaeOlXSGBv8MMoDrWzBt-80nEiVSL9nClgnuzUAKqkU9_TWygF6CI=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/oih9s26MOYPWC_uL6tgaeOlXSGBv8MMoDrWzBt-80nEiVSL9nClgnuzUAKqkU9_TWygF6CI=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-red-droopy-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/b8IfY7zOK9iVkNAP_I2A-AY',
    shortcuts: [':face-purple-crying:'],
    searchTerms: ['face-purple-crying'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/g6_km98AfdHbN43gvEuNdZ2I07MmzVpArLwEvNBwwPqpZYzszqhRzU_DXALl11TchX5_xFE=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/g6_km98AfdHbN43gvEuNdZ2I07MmzVpArLwEvNBwwPqpZYzszqhRzU_DXALl11TchX5_xFE=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-purple-crying',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/hcIfY57lBJXp6AKBx4CoCA',
    shortcuts: [':text-green-game-over:'],
    searchTerms: ['text-green-game-over'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/cr36FHhSiMAJUSpO9XzjbOgxhtrdJNTVJUlMJeOOfLOFzKleAKT2SEkZwbqihBqfTXYCIg=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/cr36FHhSiMAJUSpO9XzjbOgxhtrdJNTVJUlMJeOOfLOFzKleAKT2SEkZwbqihBqfTXYCIg=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'text-green-game-over',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/ssIfY7OFG5OykQOpn4CQCw',
    shortcuts: [':person-turqouise-waving:'],
    searchTerms: ['person-turqouise-waving'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/uNSzQ2M106OC1L3VGzrOsGNjopboOv-m1bnZKFGuh0DxcceSpYHhYbuyggcgnYyaF3o-AQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/uNSzQ2M106OC1L3VGzrOsGNjopboOv-m1bnZKFGuh0DxcceSpYHhYbuyggcgnYyaF3o-AQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'person-turqouise-waving',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/xsIfY4OqCd2T29sP54iAsAw',
    shortcuts: [':face-green-smiling:'],
    searchTerms: ['face-green-smiling'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/G061SAfXg2bmG1ZXbJsJzQJpN8qEf_W3f5cb5nwzBYIV58IpPf6H90lElDl85iti3HgoL3o=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/G061SAfXg2bmG1ZXbJsJzQJpN8qEf_W3f5cb5nwzBYIV58IpPf6H90lElDl85iti3HgoL3o=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-green-smiling',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/2sIfY8vIG8z96ALulYDQDQ',
    shortcuts: [':face-orange-frowning:'],
    searchTerms: ['face-orange-frowning'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/Ar8jaEIxzfiyYmB7ejDOHba2kUMdR37MHn_R39mtxqO5CD4aYGvjDFL22DW_Cka6LKzhGDk=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/Ar8jaEIxzfiyYmB7ejDOHba2kUMdR37MHn_R39mtxqO5CD4aYGvjDFL22DW_Cka6LKzhGDk=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-orange-frowning',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/7cIfY5niDOmSkNAP08CA6A4',
    shortcuts: [':eyes-purple-crying:'],
    searchTerms: ['eyes-purple-crying'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/FrYgdeZPpvXs-6Mp305ZiimWJ0wV5bcVZctaUy80mnIdwe-P8HRGYAm0OyBtVx8EB9_Dxkc=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/FrYgdeZPpvXs-6Mp305ZiimWJ0wV5bcVZctaUy80mnIdwe-P8HRGYAm0OyBtVx8EB9_Dxkc=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'eyes-purple-crying',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/A8MfY-_pEIKNr8oP78-AGA',
    shortcuts: [':face-fuchsia-wide-eyes:'],
    searchTerms: ['face-fuchsia-wide-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/zdcOC1SMmyXJOAddl9DYeEFN9YYcn5mHemJCdRFQMtDuS0V-IyE-5YjNUL1tduX1zs17tQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/zdcOC1SMmyXJOAddl9DYeEFN9YYcn5mHemJCdRFQMtDuS0V-IyE-5YjNUL1tduX1zs17tQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-fuchsia-wide-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/E8MfY5u7JPSXkNAP95GAmAE',
    shortcuts: [':cat-orange-whistling:'],
    searchTerms: ['cat-orange-whistling'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/0ocqEmuhrKCK87_J21lBkvjW70wRGC32-Buwk6TP4352CgcNjL6ug8zcsel6JiPbE58xhq5g=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/0ocqEmuhrKCK87_J21lBkvjW70wRGC32-Buwk6TP4352CgcNjL6ug8zcsel6JiPbE58xhq5g=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'cat-orange-whistling',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/LsMfY8P6G-yckNAPjoWA8AI',
    shortcuts: [':face-blue-wide-eyes:'],
    searchTerms: ['face-blue-wide-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/2Ht4KImoWDlCddiDQVuzSJwpEb59nZJ576ckfaMh57oqz2pUkkgVTXV8osqUOgFHZdUISJM=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/2Ht4KImoWDlCddiDQVuzSJwpEb59nZJ576ckfaMh57oqz2pUkkgVTXV8osqUOgFHZdUISJM=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-blue-wide-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/Z8MfY8mzLbnovwK5roC4Bg',
    shortcuts: [':face-orange-raised-eyebrow:'],
    searchTerms: ['face-orange-raised-eyebrow'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/JbCfmOgYI-mO17LPw8e_ycqbBGESL8AVP6i7ZsBOVLd3PEpgrfEuJ9rEGpP_unDcqgWSCg=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/JbCfmOgYI-mO17LPw8e_ycqbBGESL8AVP6i7ZsBOVLd3PEpgrfEuJ9rEGpP_unDcqgWSCg=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-orange-raised-eyebrow',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/hcMfY5_zAbbxvwKLooCoCA',
    shortcuts: [':face-fuchsia-tongue-out:'],
    searchTerms: ['face-fuchsia-tongue-out'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/EURfJZi_heNulV3mfHzXBk8PIs9XmZ9lOOYi5za6wFMCGrps4i2BJX9j-H2gK6LIhW6h7sY=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/EURfJZi_heNulV3mfHzXBk8PIs9XmZ9lOOYi5za6wFMCGrps4i2BJX9j-H2gK6LIhW6h7sY=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-fuchsia-tongue-out',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/ygF1XpGUMMjk8gSDrI2wCx',
    shortcuts: [':face-orange-biting-nails:'],
    searchTerms: ['face-orange-biting-nails'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/HmsXEgqUogkQOnL5LP_FdPit9Z909RJxby-uYcPxBLNhaPyqPTcGwvGaGPk2hzB_cC0hs_pV=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/HmsXEgqUogkQOnL5LP_FdPit9Z909RJxby-uYcPxBLNhaPyqPTcGwvGaGPk2hzB_cC0hs_pV=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-orange-biting-nails',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/m8MfY4jbFsWJhL0PyouA2Ak',
    shortcuts: [':face-red-heart-shape:'],
    searchTerms: ['face-red-heart-shape'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/I0Mem9dU_IZ4a9cQPzR0pUJ8bH-882Eg0sDQjBmPcHA6Oq0uXOZcsjPvPbtormx91Ha2eRA=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/I0Mem9dU_IZ4a9cQPzR0pUJ8bH-882Eg0sDQjBmPcHA6Oq0uXOZcsjPvPbtormx91Ha2eRA=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-red-heart-shape',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/6_cfY8HJH8bV5QS5yYDYDg',
    shortcuts: [':face-fuchsia-poop-shape:'],
    searchTerms: ['face-fuchsia-poop-shape'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/_xlyzvSimqMzhdhODyqUBLXIGA6F_d5en2bq-AIfc6fc3M7tw2jucuXRIo5igcW3g9VVe3A=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/_xlyzvSimqMzhdhODyqUBLXIGA6F_d5en2bq-AIfc6fc3M7tw2jucuXRIo5igcW3g9VVe3A=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-fuchsia-poop-shape',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/DfgfY9LaNdmMq7IPuI2AaA',
    shortcuts: [':face-purple-wide-eyes:'],
    searchTerms: ['face-purple-wide-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/5RDrtjmzRQKuVYE_FKPUHiGh7TNtX5eSNe6XzcSytMsHirXYKunxpyAsVacTFMg0jmUGhQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/5RDrtjmzRQKuVYE_FKPUHiGh7TNtX5eSNe6XzcSytMsHirXYKunxpyAsVacTFMg0jmUGhQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-purple-wide-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/HvgfY93GEYmqvwLUuYDwAQ',
    shortcuts: [':glasses-purple-yellow-diamond:'],
    searchTerms: ['glasses-purple-yellow-diamond'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/EnDBiuksboKsLkxp_CqMWlTcZtlL77QBkbjz_rLedMSDzrHmy_6k44YWFy2rk4I0LG6K2KI=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/EnDBiuksboKsLkxp_CqMWlTcZtlL77QBkbjz_rLedMSDzrHmy_6k44YWFy2rk4I0LG6K2KI=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'glasses-purple-yellow-diamond',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/NvgfY9aeC_OFvOMPkrOAsAM',
    shortcuts: [':face-pink-tears:'],
    searchTerms: ['face-pink-tears'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/RL5QHCNcO_Mc98SxFEblXZt9FNoh3bIgsjm0Kj8kmeQJWMeTu7JX_NpICJ6KKwKT0oVHhAA=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/RL5QHCNcO_Mc98SxFEblXZt9FNoh3bIgsjm0Kj8kmeQJWMeTu7JX_NpICJ6KKwKT0oVHhAA=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-pink-tears',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/UvgfY_vqE92T29sPvqiAkAU',
    shortcuts: [':body-blue-raised-arms:'],
    searchTerms: ['body-blue-raised-arms'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/2Jds3I9UKOfgjid97b_nlDU4X2t5MgjTof8yseCp7M-6ZhOhRkPGSPfYwmE9HjCibsfA1Uzo=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/2Jds3I9UKOfgjid97b_nlDU4X2t5MgjTof8yseCp7M-6ZhOhRkPGSPfYwmE9HjCibsfA1Uzo=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'body-blue-raised-arms',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/YvgfY-LIBpjChgHKyYCQBg',
    shortcuts: [':hand-orange-covering-eyes:'],
    searchTerms: ['hand-orange-covering-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/y8ppa6GcJoRUdw7GwmjDmTAnSkeIkUptZMVQuFmFaTlF_CVIL7YP7hH7hd0TJbd8p9w67IM=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/y8ppa6GcJoRUdw7GwmjDmTAnSkeIkUptZMVQuFmFaTlF_CVIL7YP7hH7hd0TJbd8p9w67IM=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'hand-orange-covering-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/ePgfY-K2Kp6Mr8oP1oqAwAc',
    shortcuts: [':trophy-yellow-smiling:'],
    searchTerms: ['trophy-yellow-smiling'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/7tf3A_D48gBg9g2N0Rm6HWs2aqzshHU4CuVubTXVxh1BP7YDBRC6pLBoC-ibvr-zCl_Lgg=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/7tf3A_D48gBg9g2N0Rm6HWs2aqzshHU4CuVubTXVxh1BP7YDBRC6pLBoC-ibvr-zCl_Lgg=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'trophy-yellow-smiling',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/jPgfY5j2IIud29sP3ZeA4Ag',
    shortcuts: [':eyes-pink-heart-shape:'],
    searchTerms: ['eyes-pink-heart-shape'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/5vzlCQfQQdzsG7nlQzD8eNjtyLlnATwFwGvrMpC8dgLcosNhWLXu8NN9qIS3HZjJYd872dM=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/5vzlCQfQQdzsG7nlQzD8eNjtyLlnATwFwGvrMpC8dgLcosNhWLXu8NN9qIS3HZjJYd872dM=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'eyes-pink-heart-shape',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/oPgfY_DoKfSXkNAPq8-AgAo',
    shortcuts: [':face-turquoise-covering-eyes:'],
    searchTerms: ['face-turquoise-covering-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/H2HNPRO8f4SjMmPNh5fl10okSETW7dLTZtuE4jh9D6pSmaUiLfoZJ2oiY-qWU3Owfm1IsXg=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/H2HNPRO8f4SjMmPNh5fl10okSETW7dLTZtuE4jh9D6pSmaUiLfoZJ2oiY-qWU3Owfm1IsXg=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-turquoise-covering-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/tPgfY7mSO4XovQKzmYCgCw',
    shortcuts: [':hand-green-crystal-ball:'],
    searchTerms: ['hand-green-crystal-ball'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/qZfJrWDEmR03FIak7PMNRNpMjNsCnOzD9PqK8mOpAp4Kacn_uXRNJNb99tE_1uyEbvgJReF2=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/qZfJrWDEmR03FIak7PMNRNpMjNsCnOzD9PqK8mOpAp4Kacn_uXRNJNb99tE_1uyEbvgJReF2=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'hand-green-crystal-ball',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/zPgfY66lCJGRhL0Pz6iA4Aw',
    shortcuts: [':face-turquoise-drinking-coffee:'],
    searchTerms: ['face-turquoise-drinking-coffee'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/myqoI1MgFUXQr5fuWTC9mz0BCfgf3F8GSDp06o1G7w6pTz48lwARjdG8vj0vMxADvbwA1dA=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/myqoI1MgFUXQr5fuWTC9mz0BCfgf3F8GSDp06o1G7w6pTz48lwARjdG8vj0vMxADvbwA1dA=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-turquoise-drinking-coffee',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/4PgfY73cJprKCq-_gIAO',
    shortcuts: [':body-green-covering-eyes:'],
    searchTerms: ['body-green-covering-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/UR8ydcU3gz360bzDsprB6d1klFSQyVzgn-Fkgu13dIKPj3iS8OtG1bhBUXPdj9pMwtM00ro=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/UR8ydcU3gz360bzDsprB6d1klFSQyVzgn-Fkgu13dIKPj3iS8OtG1bhBUXPdj9pMwtM00ro=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'body-green-covering-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/-fgfY9DIGYjbhgHLzoDIDw',
    shortcuts: [':goat-turquoise-white-horns:'],
    searchTerms: ['goat-turquoise-white-horns'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/jMnX4lu5GnjBRgiPtX5FwFmEyKTlWFrr5voz-Auko35oP0t3-zhPxR3PQMYa-7KhDeDtrv4=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/jMnX4lu5GnjBRgiPtX5FwFmEyKTlWFrr5voz-Auko35oP0t3-zhPxR3PQMYa-7KhDeDtrv4=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'goat-turquoise-white-horns',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/EvkfY6uNC5OykQOewoCQAQ',
    shortcuts: [':hand-purple-blue-peace:'],
    searchTerms: ['hand-purple-blue-peace'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/-sC8wj6pThd7FNdslEoJlG4nB9SIbrJG3CRGh7-bNV0RVfcrJuwiWHoUZ6UmcVs7sQjxTg4=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/-sC8wj6pThd7FNdslEoJlG4nB9SIbrJG3CRGh7-bNV0RVfcrJuwiWHoUZ6UmcVs7sQjxTg4=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'hand-purple-blue-peace',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/LfkfY_zhH4GFr8oP4aKA6AI',
    shortcuts: [':face-blue-question-mark:'],
    searchTerms: ['face-blue-question-mark'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/Wx4PMqTwG3f4gtR7J9Go1s8uozzByGWLSXHzrh3166ixaYRinkH_F05lslfsRUsKRvHXrDk=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/Wx4PMqTwG3f4gtR7J9Go1s8uozzByGWLSXHzrh3166ixaYRinkH_F05lslfsRUsKRvHXrDk=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-blue-question-mark',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/RPkfY8TPGsCakNAP-JWAoAQ',
    shortcuts: [':face-blue-covering-eyes:'],
    searchTerms: ['face-blue-covering-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/kj3IgbbR6u-mifDkBNWVcdOXC-ut-tiFbDpBMGVeW79c2c54n5vI-HNYCOC6XZ9Bzgupc10=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/kj3IgbbR6u-mifDkBNWVcdOXC-ut-tiFbDpBMGVeW79c2c54n5vI-HNYCOC6XZ9Bzgupc10=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-blue-covering-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/Mm5IY53bH7SEq7IP-MWAkAM',
    shortcuts: [':face-purple-smiling-fangs:'],
    searchTerms: ['face-purple-smiling-fangs'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/k1vqi6xoHakGUfa0XuZYWHOv035807ARP-ZLwFmA-_NxENJMxsisb-kUgkSr96fj5baBOZE=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/k1vqi6xoHakGUfa0XuZYWHOv035807ARP-ZLwFmA-_NxENJMxsisb-kUgkSr96fj5baBOZE=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-purple-smiling-fangs',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/UW5IY-ibBqa8jgTymoCIBQ',
    shortcuts: [':face-purple-sweating:'],
    searchTerms: ['face-purple-sweating'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/tRnrCQtEKlTM9YLPo0vaxq9mDvlT0mhDld2KI7e_nDRbhta3ULKSoPVHZ1-bNlzQRANmH90=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/tRnrCQtEKlTM9YLPo0vaxq9mDvlT0mhDld2KI7e_nDRbhta3ULKSoPVHZ1-bNlzQRANmH90=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-purple-sweating',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/Ym5IY7-0LoqA29sPq9CAkAY',
    shortcuts: [':face-purple-smiling-tears:'],
    searchTerms: ['face-purple-smiling-tears'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/MJV1k3J5s0hcUfuo78Y6MKi-apDY5NVDjO9Q7hL8fU4i0cIBgU-cU4rq4sHessJuvuGpDOjJ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/MJV1k3J5s0hcUfuo78Y6MKi-apDY5NVDjO9Q7hL8fU4i0cIBgU-cU4rq4sHessJuvuGpDOjJ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-purple-smiling-tears',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/dG5IY-mhEof9jgSykoCgBw',
    shortcuts: [':face-blue-star-eyes:'],
    searchTerms: ['face-blue-star-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/m_ANavMhp6cQ1HzX0HCTgp_er_yO2UA28JPbi-0HElQgnQ4_q5RUhgwueTpH-st8L3MyTA=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/m_ANavMhp6cQ1HzX0HCTgp_er_yO2UA28JPbi-0HElQgnQ4_q5RUhgwueTpH-st8L3MyTA=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-blue-star-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/hm5IY4W-H9SO5QS6n4CwCA',
    shortcuts: [':face-blue-heart-eyes:'],
    searchTerms: ['face-blue-heart-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/M9tzKd64_r3hvgpTSgca7K3eBlGuyiqdzzhYPp7ullFAHMgeFoNLA0uQ1dGxj3fXgfcHW4w=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/M9tzKd64_r3hvgpTSgca7K3eBlGuyiqdzzhYPp7ullFAHMgeFoNLA0uQ1dGxj3fXgfcHW4w=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-blue-heart-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/mW5IY47PMcSnkMkPo6OAyAk',
    shortcuts: [':face-blue-three-eyes:'],
    searchTerms: ['face-blue-three-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/nSQHitVplLe5uZC404dyAwv1f58S3PN-U_799fvFzq-6b3bv-MwENO-Zs1qQI4oEXCbOJg=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/nSQHitVplLe5uZC404dyAwv1f58S3PN-U_799fvFzq-6b3bv-MwENO-Zs1qQI4oEXCbOJg=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-blue-three-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/rW5IY_26FryOq7IPlL2A6Ao',
    shortcuts: [':face-blue-droopy-eyes:'],
    searchTerms: ['face-blue-droopy-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/hGPqMUCiXGt6zuX4dHy0HRZtQ-vZmOY8FM7NOHrJTta3UEJksBKjOcoE6ZUAW9sz7gIF_nk=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/hGPqMUCiXGt6zuX4dHy0HRZtQ-vZmOY8FM7NOHrJTta3UEJksBKjOcoE6ZUAW9sz7gIF_nk=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-blue-droopy-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/v25IY7KcJIGOr8oPz4OA-As',
    shortcuts: [':planet-orange-purple-ring:'],
    searchTerms: ['planet-orange-purple-ring'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/xkaLigm3P4_1g4X1JOtkymcC7snuJu_C5YwIFAyQlAXK093X0IUjaSTinMTLKeRZ6280jXg=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/xkaLigm3P4_1g4X1JOtkymcC7snuJu_C5YwIFAyQlAXK093X0IUjaSTinMTLKeRZ6280jXg=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'planet-orange-purple-ring',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-yellow-podium-blue',
    shortcuts: [':person-yellow-podium-blue:'],
    searchTerms: ['person-yellow-podium-blue'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/N28nFDm82F8kLPAa-jY_OySFsn3Ezs_2Bl5kdxC8Yxau5abkj_XZHYsS3uYKojs8qy8N-9w=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/N28nFDm82F8kLPAa-jY_OySFsn3Ezs_2Bl5kdxC8Yxau5abkj_XZHYsS3uYKojs8qy8N-9w=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'person-yellow-podium-blue',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/baseball-white-cap-out',
    shortcuts: [':baseball-white-cap-out:'],
    searchTerms: ['baseball-white-cap-out'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/8DaGaXfaBN0c-ZsZ-1WqPJ6H9TsJOlUUQQEoXvmdROphZE9vdRtN0867Gb2YZcm2x38E9Q=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/8DaGaXfaBN0c-ZsZ-1WqPJ6H9TsJOlUUQQEoXvmdROphZE9vdRtN0867Gb2YZcm2x38E9Q=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'baseball-white-cap-out',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/whistle-red-blow',
    shortcuts: [':whistle-red-blow:'],
    searchTerms: ['whistle-red-blow'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/DBu1ZfPJTnX9S1RyKKdBY-X_CEmj7eF6Uzl71j5jVBz5y4k9JcKnoiFtImAbeu4u8M2X8tU=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/DBu1ZfPJTnX9S1RyKKdBY-X_CEmj7eF6Uzl71j5jVBz5y4k9JcKnoiFtImAbeu4u8M2X8tU=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'whistle-red-blow',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-turquoise-crowd-surf',
    shortcuts: [':person-turquoise-crowd-surf:'],
    searchTerms: ['person-turquoise-crowd-surf'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/Q0wFvHZ5h54xGSTo-JeGst6InRU3yR6NdBRoyowaqGY66LPzdcrV2t-wBN21kBIdb2TeNA=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/Q0wFvHZ5h54xGSTo-JeGst6InRU3yR6NdBRoyowaqGY66LPzdcrV2t-wBN21kBIdb2TeNA=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'person-turquoise-crowd-surf',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/finger-red-number-one',
    shortcuts: [':finger-red-number-one:'],
    searchTerms: ['finger-red-number-one'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/Hbk0wxBzPTBCDvD_y4qdcHL5_uu7SeOnaT2B7gl9GLB4u8Ecm9OaXCGSMMUBFeNGl5Q3fHJ2=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/Hbk0wxBzPTBCDvD_y4qdcHL5_uu7SeOnaT2B7gl9GLB4u8Ecm9OaXCGSMMUBFeNGl5Q3fHJ2=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'finger-red-number-one',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/text-yellow-goal',
    shortcuts: [':text-yellow-goal:'],
    searchTerms: ['text-yellow-goal'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/tnHp8rHjXecGbGrWNcs7xss_aVReaYE6H-QWRCXYg_aaYszHXnbP_pVADnibUiimspLvgX0L=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/tnHp8rHjXecGbGrWNcs7xss_aVReaYE6H-QWRCXYg_aaYszHXnbP_pVADnibUiimspLvgX0L=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'text-yellow-goal',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/medal-yellow-first-red',
    shortcuts: [':medal-yellow-first-red:'],
    searchTerms: ['medal-yellow-first-red'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/EEHiiIalCBKuWDPtNOjjvmEZ-KRkf5dlgmhe5rbLn8aZQl-pNz_paq5UjxNhCrI019TWOQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/EEHiiIalCBKuWDPtNOjjvmEZ-KRkf5dlgmhe5rbLn8aZQl-pNz_paq5UjxNhCrI019TWOQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'medal-yellow-first-red',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-blue-wheelchair-race',
    shortcuts: [':person-blue-wheelchair-race:'],
    searchTerms: ['person-blue-wheelchair-race'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/ZepxPGk5TwzrKAP9LUkzmKmEkbaF5OttNyybwok6mJENw3p0lxDXkD1X2_rAwGcUM0L-D04=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/ZepxPGk5TwzrKAP9LUkzmKmEkbaF5OttNyybwok6mJENw3p0lxDXkD1X2_rAwGcUM0L-D04=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'person-blue-wheelchair-race',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/card-red-penalty',
    shortcuts: [':card-red-penalty:'],
    searchTerms: ['card-red-penalty'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/uRDUMIeAHnNsaIaShtRkQ6hO0vycbNH_BQT7i3PWetFJb09q88RTjxwzToBy9Cez20D7hA=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/uRDUMIeAHnNsaIaShtRkQ6hO0vycbNH_BQT7i3PWetFJb09q88RTjxwzToBy9Cez20D7hA=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'card-red-penalty',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/stopwatch-blue-hand-timer',
    shortcuts: [':stopwatch-blue-hand-timer:'],
    searchTerms: ['stopwatch-blue-hand-timer'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/DCvefDAiskRfACgolTlvV1kMfiZVcG50UrmpnRrg3k0udFWG2Uo9zFMaJrJMSJYwcx6fMgk=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/DCvefDAiskRfACgolTlvV1kMfiZVcG50UrmpnRrg3k0udFWG2Uo9zFMaJrJMSJYwcx6fMgk=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'stopwatch-blue-hand-timer',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/face-turquoise-speaker-shape',
    shortcuts: [':face-turquoise-speaker-shape:'],
    searchTerms: ['face-turquoise-speaker-shape'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/WTFFqm70DuMxSC6ezQ5Zs45GaWD85Xwrd9Sullxt54vErPUKb_o0NJQ4kna5m7rvjbRMgr3A=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/WTFFqm70DuMxSC6ezQ5Zs45GaWD85Xwrd9Sullxt54vErPUKb_o0NJQ4kna5m7rvjbRMgr3A=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-turquoise-speaker-shape',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/octopus-red-waving',
    shortcuts: [':octopus-red-waving:'],
    searchTerms: ['octopus-red-waving'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/L9Wo5tLT_lRQX36iZO_fJqLJR4U74J77tJ6Dg-QmPmSC_zhVQ-NodMRc9T0ozwvRXRaT43o=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/L9Wo5tLT_lRQX36iZO_fJqLJR4U74J77tJ6Dg-QmPmSC_zhVQ-NodMRc9T0ozwvRXRaT43o=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'octopus-red-waving',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/pillow-turquoise-hot-chocolate',
    shortcuts: [':pillow-turquoise-hot-chocolate:'],
    searchTerms: ['pillow-turquoise-hot-chocolate'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/cAR4cehRxbn6dPbxKIb-7ShDdWnMxbaBqy2CXzBW4aRL3IqXs3rxG0UdS7IU71OEU7LSd20q=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/cAR4cehRxbn6dPbxKIb-7ShDdWnMxbaBqy2CXzBW4aRL3IqXs3rxG0UdS7IU71OEU7LSd20q=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'pillow-turquoise-hot-chocolate',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/hourglass-purple-sand-orange',
    shortcuts: [':hourglass-purple-sand-orange:'],
    searchTerms: ['hourglass-purple-sand-orange'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/MFDLjasPt5cuSM_tK5Fnjaz_k08lKHdX_Mf7JkI6awaHriC3rGL7J_wHxyG6PPhJ8CJ6vsQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/MFDLjasPt5cuSM_tK5Fnjaz_k08lKHdX_Mf7JkI6awaHriC3rGL7J_wHxyG6PPhJ8CJ6vsQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'hourglass-purple-sand-orange',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/fish-orange-wide-eyes',
    shortcuts: [':fish-orange-wide-eyes:'],
    searchTerms: ['fish-orange-wide-eyes'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/iQLKgKs7qL3091VHgVgpaezc62uPewy50G_DoI0dMtVGmQEX5pflZrUxWfYGmRfzfUOOgJs=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/iQLKgKs7qL3091VHgVgpaezc62uPewy50G_DoI0dMtVGmQEX5pflZrUxWfYGmRfzfUOOgJs=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'fish-orange-wide-eyes',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/popcorn-yellow-striped-smile',
    shortcuts: [':popcorn-yellow-striped-smile:'],
    searchTerms: ['popcorn-yellow-striped-smile'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/TW_GktV5uVYviPDtkCRCKRDrGlUc3sJ5OHO81uqdMaaHrIQ5-sXXwJfDI3FKPyv4xtGpOlg=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/TW_GktV5uVYviPDtkCRCKRDrGlUc3sJ5OHO81uqdMaaHrIQ5-sXXwJfDI3FKPyv4xtGpOlg=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'popcorn-yellow-striped-smile',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/penguin-blue-waving-tear',
    shortcuts: [':penguin-blue-waving-tear:'],
    searchTerms: ['penguin-blue-waving-tear'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/p2u7dcfZau4_bMOMtN7Ma8mjHX_43jOjDwITf4U9adT44I-y-PT7ddwPKkfbW6Wx02BTpNoC=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/p2u7dcfZau4_bMOMtN7Ma8mjHX_43jOjDwITf4U9adT44I-y-PT7ddwPKkfbW6Wx02BTpNoC=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'penguin-blue-waving-tear',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/clock-turquoise-looking-up',
    shortcuts: [':clock-turquoise-looking-up:'],
    searchTerms: ['clock-turquoise-looking-up'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/tDnDkDZykkJTrsWEJPlRF30rmbek2wcDcAIymruOvSLTsUFIZHoAiYTRe9OtO-80lDfFGvo=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/tDnDkDZykkJTrsWEJPlRF30rmbek2wcDcAIymruOvSLTsUFIZHoAiYTRe9OtO-80lDfFGvo=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'clock-turquoise-looking-up',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/face-red-smiling-live',
    shortcuts: [':face-red-smiling-live:'],
    searchTerms: ['face-red-smiling-live'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/14Pb--7rVcqnHvM7UlrYnV9Rm4J-uojX1B1kiXYvv1my-eyu77pIoPR5sH28-eNIFyLaQHs=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/14Pb--7rVcqnHvM7UlrYnV9Rm4J-uojX1B1kiXYvv1my-eyu77pIoPR5sH28-eNIFyLaQHs=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-red-smiling-live',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/hands-yellow-heart-red',
    shortcuts: [':hands-yellow-heart-red:'],
    searchTerms: ['hands-yellow-heart-red'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/qWSu2zrgOKLKgt_E-XUP9e30aydT5aF3TnNjvfBL55cTu1clP8Eoh5exN3NDPEVPYmasmoA=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/qWSu2zrgOKLKgt_E-XUP9e30aydT5aF3TnNjvfBL55cTu1clP8Eoh5exN3NDPEVPYmasmoA=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'hands-yellow-heart-red',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/volcano-green-lava-orange',
    shortcuts: [':volcano-green-lava-orange:'],
    searchTerms: ['volcano-green-lava-orange'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/_IWOdMxapt6IBY5Cb6LFVkA3J77dGQ7P2fuvYYv1-ahigpVfBvkubOuGLSCyFJ7jvis-X8I=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/_IWOdMxapt6IBY5Cb6LFVkA3J77dGQ7P2fuvYYv1-ahigpVfBvkubOuGLSCyFJ7jvis-X8I=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'volcano-green-lava-orange',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-turquoise-waving-speech',
    shortcuts: [':person-turquoise-waving-speech:'],
    searchTerms: ['person-turquoise-waving-speech'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/gafhCE49PH_9q-PuigZaDdU6zOKD6grfwEh1MM7fYVs7smAS_yhYCBipq8gEiW73E0apKTzi=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/gafhCE49PH_9q-PuigZaDdU6zOKD6grfwEh1MM7fYVs7smAS_yhYCBipq8gEiW73E0apKTzi=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'person-turquoise-waving-speech',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/face-orange-tv-shape',
    shortcuts: [':face-orange-tv-shape:'],
    searchTerms: ['face-orange-tv-shape'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/EVK0ik6dL5mngojX9I9Juw4iFh053emP0wcUjZH0whC_LabPq-DZxN4Jg-tpMcEVfJ0QpcJ4=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/EVK0ik6dL5mngojX9I9Juw4iFh053emP0wcUjZH0whC_LabPq-DZxN4Jg-tpMcEVfJ0QpcJ4=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-orange-tv-shape',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/face-blue-spam-shape',
    shortcuts: [':face-blue-spam-shape:'],
    searchTerms: ['face-blue-spam-shape'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/hpwvR5UgJtf0bGkUf8Rn-jTlD6DYZ8FPOFY7rhZZL-JHj_7OPDr7XUOesilRPxlf-aW42Zg=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/hpwvR5UgJtf0bGkUf8Rn-jTlD6DYZ8FPOFY7rhZZL-JHj_7OPDr7XUOesilRPxlf-aW42Zg=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-blue-spam-shape',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/face-fuchsia-flower-shape',
    shortcuts: [':face-fuchsia-flower-shape:'],
    searchTerms: ['face-fuchsia-flower-shape'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/o9kq4LQ0fE_x8yxj29ZeLFZiUFpHpL_k2OivHbjZbttzgQytU49Y8-VRhkOP18jgH1dQNSVz=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/o9kq4LQ0fE_x8yxj29ZeLFZiUFpHpL_k2OivHbjZbttzgQytU49Y8-VRhkOP18jgH1dQNSVz=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-fuchsia-flower-shape',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-blue-holding-pencil',
    shortcuts: [':person-blue-holding-pencil:'],
    searchTerms: ['person-blue-holding-pencil'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/TKgph5IHIHL-A3fgkrGzmiNXzxJkibB4QWRcf_kcjIofhwcUK_pWGUFC4xPXoimmne3h8eQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/TKgph5IHIHL-A3fgkrGzmiNXzxJkibB4QWRcf_kcjIofhwcUK_pWGUFC4xPXoimmne3h8eQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'person-blue-holding-pencil',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/body-turquoise-yoga-pose',
    shortcuts: [':body-turquoise-yoga-pose:'],
    searchTerms: ['body-turquoise-yoga-pose'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/GW3otW7CmWpuayb7Ddo0ux5c-OvmPZ2K3vaytJi8bHFjcn-ulT8vcHMNcqVqMp1j2lit2Vw=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/GW3otW7CmWpuayb7Ddo0ux5c-OvmPZ2K3vaytJi8bHFjcn-ulT8vcHMNcqVqMp1j2lit2Vw=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'body-turquoise-yoga-pose',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/location-yellow-teal-bars',
    shortcuts: [':location-yellow-teal-bars:'],
    searchTerms: ['location-yellow-teal-bars'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/YgeWJsRspSlAp3BIS5HMmwtpWtMi8DqLg9fH7DwUZaf5kG4yABfE1mObAvjCh0xKX_HoIR23=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/YgeWJsRspSlAp3BIS5HMmwtpWtMi8DqLg9fH7DwUZaf5kG4yABfE1mObAvjCh0xKX_HoIR23=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'location-yellow-teal-bars',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-turquoise-writing-headphones',
    shortcuts: [':person-turquoise-writing-headphones:'],
    searchTerms: ['person-turquoise-writing-headphones'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/DC4KrwzNkVxLZa2_KbKyjZTUyB9oIvH5JuEWAshsMv9Ctz4lEUVK0yX5PaMsTK3gGS-r9w=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/DC4KrwzNkVxLZa2_KbKyjZTUyB9oIvH5JuEWAshsMv9Ctz4lEUVK0yX5PaMsTK3gGS-r9w=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'person-turquoise-writing-headphones',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-turquoise-wizard-wand',
    shortcuts: [':person-turquoise-wizard-wand:'],
    searchTerms: ['person-turquoise-wizard-wand'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/OiZeNvmELg2PQKbT5UCS0xbmsGbqRBSbaRVSsKnRS9gvJPw7AzPp-3ysVffHFbSMqlWKeQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/OiZeNvmELg2PQKbT5UCS0xbmsGbqRBSbaRVSsKnRS9gvJPw7AzPp-3ysVffHFbSMqlWKeQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'person-turquoise-wizard-wand',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-blue-eating-spaghetti',
    shortcuts: [':person-blue-eating-spaghetti:'],
    searchTerms: ['person-blue-eating-spaghetti'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/AXZ8POmCHoxXuBaRxX6-xlT5M-nJZmO1AeUNo0t4o7xxT2Da2oGy347sHpMM8shtUs7Xxh0=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/AXZ8POmCHoxXuBaRxX6-xlT5M-nJZmO1AeUNo0t4o7xxT2Da2oGy347sHpMM8shtUs7Xxh0=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'person-blue-eating-spaghetti',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/face-turquoise-music-note',
    shortcuts: [':face-turquoise-music-note:'],
    searchTerms: ['face-turquoise-music-note'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/-K6oRITFKVU8V4FedrqXGkV_vTqUufVCQpBpyLK6w3chF4AS1kzT0JVfJxhtlfIAw5jrNco=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/-K6oRITFKVU8V4FedrqXGkV_vTqUufVCQpBpyLK6w3chF4AS1kzT0JVfJxhtlfIAw5jrNco=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-turquoise-music-note',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-pink-swaying-hair',
    shortcuts: [':person-pink-swaying-hair:'],
    searchTerms: ['person-pink-swaying-hair'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/L8cwo8hEoVhB1k1TopQaeR7oPTn7Ypn5IOae5NACgQT0E9PNYkmuENzVqS7dk2bYRthNAkQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/L8cwo8hEoVhB1k1TopQaeR7oPTn7Ypn5IOae5NACgQT0E9PNYkmuENzVqS7dk2bYRthNAkQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'person-pink-swaying-hair',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-blue-speaking-microphone',
    shortcuts: [':person-blue-speaking-microphone:'],
    searchTerms: ['person-blue-speaking-microphone'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/FMaw3drKKGyc6dk3DvtHbkJ1Ki2uD0FLqSIiFDyuChc1lWcA9leahX3mCFMBIWviN2o8eyc=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/FMaw3drKKGyc6dk3DvtHbkJ1Ki2uD0FLqSIiFDyuChc1lWcA9leahX3mCFMBIWviN2o8eyc=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'person-blue-speaking-microphone',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/rocket-red-countdown-liftoff',
    shortcuts: [':rocket-red-countdown-liftoff:'],
    searchTerms: ['rocket-red-countdown-liftoff'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/lQZFYAeWe5-SJ_fz6dCAFYz1MjBnEek8DvioGxhlj395UFTSSHqYAmfhJN2i0rz3fDD5DQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/lQZFYAeWe5-SJ_fz6dCAFYz1MjBnEek8DvioGxhlj395UFTSSHqYAmfhJN2i0rz3fDD5DQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'rocket-red-countdown-liftoff',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/face-purple-rain-drops',
    shortcuts: [':face-purple-rain-drops:'],
    searchTerms: ['face-purple-rain-drops'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/woHW5Jl2RD0qxijnl_4vx4ZhP0Zp65D4Ve1DM_HrwJW-Kh6bQZoRjesGnEwjde8F4LynrQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/woHW5Jl2RD0qxijnl_4vx4ZhP0Zp65D4Ve1DM_HrwJW-Kh6bQZoRjesGnEwjde8F4LynrQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-purple-rain-drops',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/face-pink-drinking-tea',
    shortcuts: [':face-pink-drinking-tea:'],
    searchTerms: ['face-pink-drinking-tea'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/WRLIgKpnClgYOZyAwnqP-Edrdxu6_N19qa8gsB9P_6snZJYIMu5YBJX8dlM81YG6H307KA=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/WRLIgKpnClgYOZyAwnqP-Edrdxu6_N19qa8gsB9P_6snZJYIMu5YBJX8dlM81YG6H307KA=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-pink-drinking-tea',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/person-purple-stage-event',
    shortcuts: [':person-purple-stage-event:'],
    searchTerms: ['person-purple-stage-event'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/YeVVscOyRcDJAhKo2bMwMz_B6127_7lojqafTZECTR9NSEunYO5zEi7R7RqxBD7LYLxfNnXe=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/YeVVscOyRcDJAhKo2bMwMz_B6127_7lojqafTZECTR9NSEunYO5zEi7R7RqxBD7LYLxfNnXe=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'person-purple-stage-event',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCkszU2WH9gy1mb0dV-11UJg/face-purple-open-box',
    shortcuts: [':face-purple-open-box:'],
    searchTerms: ['face-purple-open-box'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/7lJM2sLrozPtNLagPTcN0xlcStWpAuZEmO2f4Ej5kYgSp3woGdq3tWFrTH30S3mD2PyjlQ=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/7lJM2sLrozPtNLagPTcN0xlcStWpAuZEmO2f4Ej5kYgSp3woGdq3tWFrTH30S3mD2PyjlQ=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'face-purple-open-box',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCzC5CNksIBaiT-NdMJjJNOQ/COLRg9qOwdQCFce-qgodrbsLaA',
    shortcuts: [':awesome:'],
    searchTerms: ['awesome'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/xqqFxk7nC5nYnjy0oiSPpeWX4yu4I-ysb3QJMOuVml8dHWz82FvF8bhGVjlosZRIG_XxHA=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/xqqFxk7nC5nYnjy0oiSPpeWX4yu4I-ysb3QJMOuVml8dHWz82FvF8bhGVjlosZRIG_XxHA=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'awesome',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCzC5CNksIBaiT-NdMJjJNOQ/CMKC7uKOwdQCFce-qgodqbsLaA',
    shortcuts: [':gar:'],
    searchTerms: ['gar'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/pxQTF9D-uxlSIgoopRcS8zAZnBBEPp2R9bwo5qIc3kc7PF2k18so72-ohINWPa6OvWudEcsC=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/pxQTF9D-uxlSIgoopRcS8zAZnBBEPp2R9bwo5qIc3kc7PF2k18so72-ohINWPa6OvWudEcsC=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'gar',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCzC5CNksIBaiT-NdMJjJNOQ/CJiQ8uiOwdQCFcx9qgodysAOHg',
    shortcuts: [':jakepeter:'],
    searchTerms: ['jakepeter'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/iq0g14tKRcLwmfdpHULRMeUGfpWUlUyJWr0adf1K1-dStgPOguOe8eo5bKrxmCqIOlu-J18=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/iq0g14tKRcLwmfdpHULRMeUGfpWUlUyJWr0adf1K1-dStgPOguOe8eo5bKrxmCqIOlu-J18=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'jakepeter',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCzC5CNksIBaiT-NdMJjJNOQ/CI3h3uDJitgCFdARTgodejsFWg',
    shortcuts: [':wormRedBlue:'],
    searchTerms: ['wormRedBlue'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/QrjYSGexvrRfCVpWrgctyB3shVRAgKmXtctM1vUnA78taji1zYNWwrHs1GKBpdpG5A6yK_k=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/QrjYSGexvrRfCVpWrgctyB3shVRAgKmXtctM1vUnA78taji1zYNWwrHs1GKBpdpG5A6yK_k=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'wormRedBlue',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCzC5CNksIBaiT-NdMJjJNOQ/CI69oYTKitgCFdaPTgodsHsP5g',
    shortcuts: [':wormOrangeGreen:'],
    searchTerms: ['wormOrangeGreen'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/S-L8lYTuP13Ds9TJZ2UlxdjDiwNRFPnj0o4x6DAecyJLXDdQ941upYRhxalbjzpJn5USU_k=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/S-L8lYTuP13Ds9TJZ2UlxdjDiwNRFPnj0o4x6DAecyJLXDdQ941upYRhxalbjzpJn5USU_k=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'wormOrangeGreen',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCzC5CNksIBaiT-NdMJjJNOQ/CKzQr47KitgCFdCITgodq6EJZg',
    shortcuts: [':wormYellowRed:'],
    searchTerms: ['wormYellowRed'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/L9TQqjca5x7TE8ZB-ifFyU51xWXArz47rJFU7Pg2KgWMut5th9qsU-pCu1zIF98szO5wNXE=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/L9TQqjca5x7TE8ZB-ifFyU51xWXArz47rJFU7Pg2KgWMut5th9qsU-pCu1zIF98szO5wNXE=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'wormYellowRed',
        },
      },
    },
    isCustomEmoji: true,
  },
  {
    emojiId: 'UCzC5CNksIBaiT-NdMJjJNOQ/CPGD8Iu8kN4CFREChAod9OkLmg',
    shortcuts: [':ytg:'],
    searchTerms: ['ytg'],
    image: {
      thumbnails: [
        {
          url: 'https://yt3.ggpht.com/7PgbidnZLTC-38qeoqYensfXg7s7EC1Dudv9q9l8aIjqLgnfvpfhnEBH_7toCmVmqhIe4I45=w24-h24-c-k-nd',
          width: 24,
          height: 24,
        },
        {
          url: 'https://yt3.ggpht.com/7PgbidnZLTC-38qeoqYensfXg7s7EC1Dudv9q9l8aIjqLgnfvpfhnEBH_7toCmVmqhIe4I45=w48-h48-c-k-nd',
          width: 48,
          height: 48,
        },
      ],
      accessibility: {
        accessibilityData: {
          label: 'ytg',
        },
      },
    },
    isCustomEmoji: true,
  },
]
