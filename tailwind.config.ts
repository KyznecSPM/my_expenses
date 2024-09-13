import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        border: 'var(--border)',
      },
      lineHeight: {
        tab: '23.8px',
        title: '48px',
        subtitle: '29.26px',
        big: '19.5px',
        normal: '14.63px',
        small: '14px',
      },
      fontSize: {
        tab: '14px',
        title: '32px',
        subtitle: '24px',
        big: '16px',
        normal: '12px',
      },
      boxShadow: {
        card: '0px 20px 67px -12px #00000021',
      },
    },
  },
  plugins: [],
};
export default config;
