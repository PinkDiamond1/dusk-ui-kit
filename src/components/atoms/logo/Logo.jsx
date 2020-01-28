/* @flow */
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as React from 'react'

import theme from '../../../config/dusk.theme'

import LogoSvg from './logo.svg'

type Props = {
  className: string,
  title: string,
  size?: 'small' | 'large',
  variant?: 'primary' | 'dark' | 'light',
}

export const LogoSizes = {
  SMALL: 'small',
  LARGE: 'large',
}

const Logo = (props: Props): React.Element<*> => {
  const { className, title, size, variant } = props
  const updatedClassName = `__duk-logo ${className}`
  let width
  if (size === LogoSizes.SMALL) width = '96px'
  if (size === LogoSizes.LARGE) width = '100%'
  let color
  if (variant === 'primary') color = theme.colors.primary
  if (variant === 'dark') color = theme.colors.dark
  if (variant === 'light') color = theme.colors.light
  return (
    <LogoSvg
      className={updatedClassName}
      title={title}
      css={css`
        fill: ${color};
        width: ${width};
        vertical-align: top;
      `}
    />
  )
}

Logo.defaultProps = {
  className: '',
  size: '',
  title: '',
  variant: 'light',
}

export default Logo
