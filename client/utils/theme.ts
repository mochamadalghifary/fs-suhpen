import { RowProps, SpaceProps } from 'antd'
import type { ThemeConfig } from 'antd/es/config-provider/context'
import type { CSSProperties } from 'react'

export const themeColors = {
  primary: '#253DA1',
  secondary: '',
  success: '',
  warning: '',
  error: '',
  info: '',
}

export const iconActionTableStyle: CSSProperties = {
  color: themeColors.primary,
}

export const sidebarThemeConfig: ThemeConfig = {
  components: {
    Menu: {
      colorItemText: '#ffffff',
      colorItemTextHover: '#ffffff',
      colorItemTextSelected: '#ffffff',
      colorItemBgHover: '#3A98D0',
      colorItemBgSelected: '#3A98D0',
      fontSize: 14,
      colorItemBg: themeColors.primary,
    },
  },
}

export const defaultGutter: RowProps['gutter'] = [16, 16]

export const defaultSizeSpace: SpaceProps['size'] = 'middle'

export const globalThemeConfig: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: themeColors.primary,
      colorPrimaryHover: themeColors.primary,
    },
    Checkbox: {
      colorPrimary: themeColors.primary,
      colorPrimaryHover: themeColors.primary,
    },
    Table: {
      controlItemBgActive: '#E6FFFB',
      controlItemBgActiveHover: '#E6FFFB',
    },
    Steps: {
      colorPrimary: themeColors.primary,
    },
    Tabs: {
      colorPrimary: themeColors.primary,
    },
    Upload: {
      colorPrimary: themeColors.primary,
    },
    Radio: {
      colorPrimary: themeColors.primary,
    },
    Switch: {
      colorPrimary: themeColors.primary,
    },
    Timeline: {
      colorPrimary: themeColors.primary,
    },
  },
}
