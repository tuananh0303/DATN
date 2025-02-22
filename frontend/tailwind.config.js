/** @type {import('tailwindcss').Config} */
const defaultColors = require("tailwindcss/colors");
const COLORS = {
  footer: {
    100: "#0A2F67",
    200: "#144CA10D",
  },
  success: {
    100: "#DEF5D9",
    200: "#AEE4AD",
    300: "#73C686",
    400: "#28A745",
    500: "#008E39",
  },
  info: {
    100: "#E2F1FF",
    200: "#ADD9FF",
    300: "#72B7FB",
    400: "#2B88FB",
    500: "#006EEF",
  },
  warning: {
    100: "#FEF6E9",
    200: "#FFE1A8",
    300: "#FDC66E",
    400: "#F0A328",
    500: "#E99208",
  },
  error: {
    100: "#FDECEF",
    200: "#FFABB5",
    300: "#FA8091",
    400: "#EA3E53",
    500: "#DA072D",
  },
  primary: {
    1: "#144CA1",
    2: "#00AEEF",
    3: "#8BBFE6",
    4: "#B9D8F0",
    5: "#0A2F67",
  },
  secondary: {
    1: "#0A2F67",
    2: "#FFC0CF",
    3: "#17CD76",
    4: "#2ED283",
    4: "#8BE6BA",
  },
  // tertiary: {
  //   1: "#005F59",
  //   2: "#00A198",
  //   3: "#A4EEEA",
  //   4: "#E3F5F4",
  //   5: "#F8FBFB",
  // },
  // quaternary: {
  //   1: "#D98905",
  //   2: "#ED970B",
  //   3: "#FFA004",
  //   4: "#FFB741",
  //   5: "#FDC871",
  // },
  "neutral-1": {
    900: "#2C333A",
    800: "#424752",
    700: "#5A6271",
    600: "#6B7280",
    500: "#858F9B",
    400: "#929DAA",
    300: "#A1ACB8",
    200: "#CDD3DB",
    100: "#D2D8E0",
    50: "#DDE2E9",
  },
  "neutral-2": {
    300: "#DAE0E6",
    200: "#E2E7ED",
    100: "#E9EDF2",
    50: "#F2F4F7",
  },
  "neutral-3": {
    300: "#E3E6E9",
    200: "#EBEDEF",
    100: "#F0F1F3",
    50: "#F8F9FB",
  },
  transparent: {
    300: "#000000",
  },
  gradient: {
    1: {
      start: "#D3EAFF",
      // mid:'',
      end: "#0085FF",
    },
    2: {
      start: "#FE8C48",
      // mid:'',
      end: "#FF7A00",
    },
    3: {
      start: "#A4EEEA",
      mid: "#0696DE",
      end: "#00A198",
    },
    4: {
      start: "#FFB741",
      // mid:'',
      end: "#FFA004",
    },
  },
};

function genarateColorTDS() {
  var colors = [];
  for (const colorName in COLORS) {
    for (const colorOpacity in COLORS[colorName]) {
      colors.push(`${colorName}-${colorOpacity}`);
    }
  }
  if (COLORTAIWIND.length > 0) {
    for (let index = 0; index < COLORTAIWIND.length; index++) {
      const colorName = COLORTAIWIND[index];
      if (defaultColors[colorName])
        for (const colorOpacity in defaultColors[colorName]) {
          colors.push(`${colorName}-${colorOpacity}`);
        }
    }
  }
  var prefixs = [
    "ring",
    "bg",
    "border",
    "text",
    "focus:bg",
    "focus:border",
    "hover:border",
    "hover:bg",
    "disabled:bg",
    "disabled:border",
    "dark:bg",
    "dark:text",
    "dark:border",
    "dark:group-hover:text",
    "dark:hover:bg",
    "dark:hover:text",
  ];

  var result = [];
  for (let index = 0; index < prefixs.length; index++) {
    const prefix = prefixs[index];
    for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {
      const color = colors[colorIndex];
      result.push(prefix + "-" + color);
    }
  }

  return result;
}

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    screens: {
      sm: "640px",
      md: "768px", // Thay đổi giá trị này thành 834px
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        ...COLORS,
      },
      ringColor: {
        ...COLORS,
      },
      borderColor: {
        ...COLORS,
      },
      placeholderColor: {
        ...COLORS,
      },
      fontSize: {
        "heading-1": ["20px", "24px"],
        "heading-2": ["28px", "48px"],
        "heading-3": ["28px", "48px"],
        "heading-4": ["30px", "auto"],
        "heading-5": ["40px", "54px"],
        "body-1": ["14px", "20px"],
        "body-2": ["16px", "24px"],
        "body-3": ["16px", "30px"],
        "body-4": ["18px", "30px"],
        "body-5": ["24px", "34px"],
        "caption-1": ["12px", "14px"],
        "caption-3": ["14px", "24px"],
        "caption-4": ["18px", "24px"],
        "title-1": ["16px", "20px"],
        "title-2": ["18px", "26px"],
        "title-3": ["20px", "26px"],
        "title-4": ["20px", "30px"],
        "title-5": ["24px", "28px"],
        "title-6": ["24px", "30px"],
        button: ["16px", "24px"],
      },
      fontFamily: {
        OpenSans: ["Open-Sans", "sans-serif"],
      },
      backgroundImage: {
        "section-1": "url('/src/img/home/bg-section1.png')",
        "section-2": "url('/src/img/home/bg-section-2.png')",
        "section-6": "url('/src/img/home/bg-section-6.png')",
        footer: "url('/src/img/home/bg-footer.png')",
        "section-9": "url('/src/img/home/bg-section-9.jpg')",
        "section-1-about": "url('/src/img/about/bg-section-1.jpg')",
        "section-5-about": "url('/src/img/about/bg-section-5.jpg')",
        "section-1-service": "url('/src/img/service/bg-section-1-service.jpg')",
      },
      animation: {
        header: "spin 300ms ease-in-out infinite",
        menustart: "translate-right-to-left 0.8s",
        menuclose: "translate-left-to-right 0.8s",
        submenustart: "translate-top-to-bottom 0.8s",
        submenuclose: "translate-bottom-to-top 0.8s",
      },
      keyframes: {
        "translate-right-to-left": {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        "translate-left-to-right": {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "translate-top-to-bottom": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
        "translate-bottom-to-top": {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
      },
      boxShadow: {
        "custom-section-5": "0px 0px 10px 0px rgba(197, 197, 197, 0.25)",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["responsive", "hover", "focus"],
    },
  },
  plugins: [],
};
