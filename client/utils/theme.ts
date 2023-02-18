import { RowProps, SpaceProps } from 'antd'
import type { ThemeConfig } from 'antd/es/config-provider/context'
import type { CSSProperties } from 'react'

export const themeColors = {
  primary: '#007fd0',
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
      colorItemText: '#777777',
      colorItemTextSelected: themeColors.primary,
      colorItemBgSelected: '#daf1ff',
      colorItemTextHover: themeColors.primary,
      colorItemBgHover: '#daf1ff',
      fontSize: 14,
      colorItemBg: '#ffffff',
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
      controlItemBgActive: '#eeeeee',
      controlItemBgActiveHover: '#eeeeee',
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
