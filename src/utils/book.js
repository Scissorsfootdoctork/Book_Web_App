import { getReadTime } from './localstorage'
import { realPx } from './utils'

export const FontSizeList = [
  {
    fontSize: 12
  },
  {
    fontSize: 14
  },
  {
    fontSize: 16
  },
  {
    fontSize: 18
  },
  {
    fontSize: 20
  },
  {
    fontSize: 22
  },
  {
    fontSize: 24
  }
]

export const FontFamilyList = [
  {
    font: 'Default'
  },
  {
    font: 'Cabin'
  },
  {
    font: 'Days One'
  },
  {
    font: 'Montserrat'
  },
  {
    font: 'Tangerine'
  }
]

export function ThemeList (vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          color: '#4c5059',
          background: '#cecece',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          color: '#5c5b56',
          background: '#c6c2b6',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          color: '#404c42',
          background: '#a9c1a9',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          color: '#cecece',
          background: '#000000',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        }
      }
    }
  ]
}

export function addCss (href) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.getElementsByTagName('head')[0].appendChild(link)
}

export function removeCss (href) {
  const links = document.getElementsByTagName('link')
  for (let i = links.length; i >= 0; i--) {
    const link = links[i]
    if (
      link &&
      link.getAttribute('href') &&
      link.getAttribute('href') === href
    ) {
      link.parentNode.removeChild(link)
    }
  }
}

export function removeAllCss () {
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
}

export function getReadTimeByMinute (fileName) {
  const time = getReadTime(fileName)
  if (!time) {
    return 0
  } else {
    return Math.ceil(time / 60)
  }
}

export function flutter (array) {
  return array.map(item =>
    [].concat(...[].concat(item, ...flutter(item.subitems)))
  )
}