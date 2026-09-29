// 이 파일은 scripts/native-tokens.js가 src/tokens/*.css에서 만든다. 손으로 고치지 않는다.
// 앱(React Native)용이다. 웹은 CSS 변수와 .text-* 클래스를 쓴다.

export const color = {
  "bgDefault": "#ffffff",
  "bgSecondary": "#fafafa",
  "bgTertiary": "#f5f5f5",
  "bgPressed": "rgba(0, 0, 0, 0.08)",
  "bgAccent": "#a966ee",
  "bgAccentSubtle": "#f0e2ff",
  "bgOverlay": "rgba(0, 0, 0, 0.60)",
  "bgOverlayBlur": "rgba(255, 255, 255, 0.88)",
  "bgPrimary": "#111111",
  "bgInverse": "#111111",
  "bgCritical": "#dc3412",
  "bgCriticalSubtle": "#ffe2e0",
  "bgBrandSubtle": "#f0e2ff",
  "textDefault": "#1e1e1e",
  "textSecondary": "#757575",
  "textTertiary": "#b3b3b3",
  "textAccent": "#9642e2",
  "textOnaccent": "#ffffff",
  "textOnprimary": "#ffffff",
  "textOninverse": "#ffffff",
  "textLink": "#0768cf",
  "textCritical": "#dc3412",
  "textOncritical": "#ffffff",
  "textBrand": "#c18bff",
  "borderSubtle": "#f5f5f5",
  "borderDefault": "#d9d9d9",
  "borderStrong": "#999999",
  "borderAccent": "#9642e2",
  "borderCritical": "#dc3412",
  "borderOverlay": "rgba(0, 0, 0, 0.04)",
  "iconDefault": "#383838",
  "iconSecondary": "#757575",
  "iconTertiary": "#b3b3b3",
  "iconAccent": "#a966ee",
  "iconOnaccent": "#ffffff",
  "iconOnprimary": "#ffffff",
  "iconOninverse": "#ffffff",
  "iconCritical": "#dc3412"
};

export const spacing = {
  "1": 4,
  "2": 8,
  "3": 12,
  "4": 16,
  "5": 20,
  "6": 24,
  "8": 32,
  "10": 40,
  "12": 48,
  "16": 64
};

export const layout = {
  "globalPaddingT": 16,
  "globalPaddingB": 24,
  "globalPaddingL": 20,
  "globalPaddingR": 20,
  "sectionGap": 32,
  "componentGap": 16,
  "itemGap": 8
};

export const radius = {
  "xs": 4,
  "sm": 8,
  "md": 12,
  "lg": 16,
  "xl": 20,
  "2xl": 24,
  "full": 9999
};

export const typography = {
  "headingLg": {
    "fontSize": 28,
    "fontWeight": "600",
    "lineHeight": 36
  },
  "headingMd": {
    "fontSize": 24,
    "fontWeight": "600",
    "lineHeight": 31
  },
  "headingSm": {
    "fontSize": 20,
    "fontWeight": "600",
    "lineHeight": 26
  },
  "headingXs": {
    "fontSize": 15,
    "fontWeight": "600",
    "lineHeight": 20
  },
  "bodyLg": {
    "fontSize": 17,
    "fontWeight": "400",
    "lineHeight": 26
  },
  "bodyMd": {
    "fontSize": 15,
    "fontWeight": "400",
    "lineHeight": 23
  },
  "bodySm": {
    "fontSize": 13,
    "fontWeight": "400",
    "lineHeight": 20
  },
  "labelLg": {
    "fontSize": 17,
    "fontWeight": "500"
  },
  "labelMd": {
    "fontSize": 15,
    "fontWeight": "500"
  },
  "labelSm": {
    "fontSize": 13,
    "fontWeight": "500"
  },
  "labelXs": {
    "fontSize": 11,
    "fontWeight": "500"
  }
};

export const motion = {
  "duration": {
    "short1": 50,
    "short2": 100,
    "short3": 150,
    "short4": 200,
    "medium1": 250,
    "medium2": 300,
    "medium3": 350,
    "medium4": 400,
    "long1": 450,
    "long2": 500,
    "long3": 550,
    "long4": 600,
    "extraLong1": 700,
    "extraLong2": 800,
    "extraLong3": 900,
    "extraLong4": 1000
  },
  "easing": {
    "standard": [
      0.2,
      0,
      0,
      1
    ],
    "standardDecelerate": [
      0,
      0,
      0,
      1
    ],
    "standardAccelerate": [
      0.3,
      0,
      1,
      1
    ]
  }
};

export const shadow = {
  "sm": "0 1px  3px rgba(0, 0, 0, 0.08)",
  "md": "0 4px 12px rgba(0, 0, 0, 0.08)",
  "lg": "0 8px 24px rgba(0, 0, 0, 0.12)",
  "overlay": "0 16px 48px rgba(0, 0, 0, 0.16)",
  "overlayUp": "0 -8px 24px rgba(0, 0, 0, 0.12)"
};
