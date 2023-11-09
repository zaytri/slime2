import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import clsx from 'clsx'
import { useState } from 'react'
import AutosizingTextarea from 'react-textarea-autosize'
import InputWrapper from './input/InputWrapper'
import inputClassName from './input/inputClassName'

export default function FontInput() {
  const { setting, idString, descriptionIdString, value, setValue } =
    useWidgetSetting()
  const [selectValue, setSelectValue] = useState('')

  if (!setting || setting.type !== 'input-font') return null

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  const fontValue = typeof value === 'string' ? value : ''

  return (
    <InputWrapper>
      <div className='flex flex-col divide-y divide-emerald-800 bg-white'>
        <div className='flex divide-x divide-emerald-800 '>
          <input
            type='text'
            id={idString}
            name={idString}
            className={clsx(inputClassName, 'flex-1')}
            placeholder='Type in a font name'
            aria-describedby={descriptionIdString}
            value={fontValue}
            onChange={onChange}
          />
          <div className='flex-1 pl-1'>
            <select
              className={clsx(
                inputClassName,
                '!px-0 text-[16px]',
                (!selectValue || !fonts.includes(fontValue)) && 'text-gray-400',
              )}
              onChange={event => {
                setSelectValue(event.target.value)
                setValue(event.target.value)
              }}
              value={fontValue}
              style={{
                fontFamily: fonts.includes(fontValue)
                  ? fontValue
                  : 'Radio Canada',
              }}
            >
              <option value='' className='font-radiocanada text-gray-400'>
                Font Selector
              </option>
              {fonts.map(fontOption => {
                return (
                  <option
                    key={fontOption}
                    value={fontOption}
                    className='text-base text-black'
                    style={{ fontFamily: fontOption }}
                  >
                    {fontOption}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <AutosizingTextarea
          className={clsx(
            inputClassName,
            'resize-none overflow-auto scrollbar-thin scrollbar-track-emerald-800/25 scrollbar-thumb-emerald-800 scrollbar-track-rounded-none scrollbar-thumb-rounded-none hover:scrollbar-thumb-emerald-700 active:scrollbar-thumb-emerald-600',
          )}
          defaultValue='Font Preview: The quick brown fox jumps over the lazy dog'
          style={{ fontFamily: fontValue }}
        />
      </div>
    </InputWrapper>
  )
}

const fonts = [
  'Al Bayan',
  'American Typewriter',
  'Andalé Mono',
  'Apple Casual',
  'Apple Chancery',
  'Apple Garamond',
  'Apple Gothic',
  'Apple LiGothic',
  'Apple LiSung',
  'Apple Myungjo',
  'AquaKana',
  'Arial',
  'Arial Black',
  'Arial Hebrew',
  'Avant Garde',
  'Ayuthaya',
  'Baghdad',
  'Bahnschrift',
  'Baskerville',
  'Beijing',
  'BiauKai',
  'Bookman',
  'Big Caslon',
  'Browallia New',
  'BrowalliaUPC',
  'Brush Script',
  'Calibri',
  'Cambria',
  'Cambria Math',
  'Candara',
  'Cascadia Code',
  'Cascadia Mono',
  'Century Gothic',
  'Chalkboard',
  'Chalkduster',
  'Charcoal',
  'Charcoal CY',
  'Chicago',
  'Cochin',
  'Comic Sans',
  'Comic Sans MS',
  'Consolas',
  'Constantia',
  'Cooper',
  'Copperplate',
  'Corbel',
  'Corsiva Hebrew',
  'Courier',
  'Courier New',
  'DecoType Naskh',
  'Devanagari',
  'Didot',
  'Ebrima',
  'Euphemia UCAS',
  'Franklin Gothic Medium',
  'Futura',
  'Gabriola',
  'Gadget',
  'Gadugi',
  'Garamond',
  'Geeza Pro',
  'Geezah',
  'Geneva',
  'Geneva CY',
  'Georgia',
  'Gill Sans',
  'Gujarati',
  'Gung Seoche',
  'Gurmukhi',
  'Hangangche',
  'HeadlineA',
  'Hei',
  'Helvetica',
  'Helvetica CY',
  'Helvetica Neue',
  'Herculanum',
  'Hiragino Kaku Gothic Pro',
  'Hiragino Kaku Gothic ProN',
  'Hiragino Kaku Gothic Std',
  'Hiragino Kaku Gothic StdN',
  'Hiragino Maru Gothic Pro',
  'Hiragino Maru Gothic ProN',
  'Hiragino Mincho Pro',
  'Hiragino Mincho ProN',
  'Hoefler Text',
  'Inai Mathi',
  'Impact',
  'Ink Free',
  'Javanese Text',
  'Jung Gothic',
  'Kai',
  'Keyboard',
  'Krungthep',
  'KufiStandard GK',
  'Kuenstler Script',
  'LastResort',
  'Leelawadee UI',
  'LiHei Pro',
  'LiSong Pro',
  'Lucida',
  'Lucida Console',
  'Lucida Grande',
  'Lucida Sans',
  'Lucida Sans Unicode',
  'Malgun Gothic',
  'Marker Felt',
  'Menlo',
  'Microsoft Himalaya',
  'Microsoft JhengHei',
  'Microsoft New Tai Lue',
  'Microsoft PhagsPa',
  'Microsoft Sans Serif',
  'Microsoft Tai Le',
  'Microsoft YaHei',
  'Microsoft Yi Baiti',
  'MingLiU-ExtB',
  'Monaco',
  'Monaco CY',
  'Mongolian Baiti',
  'MS Gothic',
  'MS Serif',
  'Mshtakan',
  'MV Boli',
  'Myanmar Text',
  'Nadeem',
  'New Peninim',
  'New York',
  'Nirmala UI',
  'NISC GB18030',
  'Noto Sans',
  'Optima',
  'Osaka',
  'Palatino',
  'Palatino Linotype',
  'Papyrus',
  'PC Myungjo',
  'Pilgiche',
  'Plantagenet Cherokee',
  'Raanana',
  'Rockwell',
  'San Francisco',
  'Sand',
  'Sathu',
  'Segoe Print',
  'Segoe Script',
  'Segoe UI',
  'Seoul',
  'SimSun',
  'Sitka',
  'Shin Myungjo Neue',
  'Silom',
  'Skia',
  'Snell Roundhand',
  'ST FangSong',
  'ST FangSong 2',
  'ST Heiti',
  'ST Kaiti',
  'ST Song',
  'Sylfaen',
  'Tae Graphic',
  'Tahoma',
  'Taipei',
  'Techno',
  'Textile',
  'Thonburi',
  'Times',
  'Times CY',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
  'Yu Gothic',
  'Zapf Chancery',
  'Zapfino',
]
