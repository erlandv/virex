import type { Navigation } from '../lib/types';

export const navigation: Navigation = {
  header: {
    main: [
      { label: '首頁', href: '/' },
      { label: 'BLOG', href: '/blog' },
      { label: '關於我', href: '/about' },
      { label: '訂閱電子報', href: 'https://billy4select.kit.com/profile/posts' },
    ],
    cta: [
      { label: '加入群組', href: 'https://line.me/ti/g2/RSL2m-6lcwDLR6RJ-XfMGMZnomMixnbD3jrBUw', variant: 'primary' },
    ],
  },
  footer: {
    product: [ 
      { label: '首頁', href: '/' },
      { label: 'BLOG', href: '/blog' },
      { label: '關於我', href: '/about' },
      { label: '隱私權政策', href: '/privacy' },
      { label: '免責聲明', href: '/terms' },
    ],
    solutions: [ 
      { label: '《AI時代職場生存法則》', href: '/features' }, 
      { label: '《從零開始自媒體》', href: '/customers' },
      { label: '《寫給大家的行銷書》', href: '/pricing' },
      { label: '《流量騙局》', href: '/enterprise' },
    ],
    resources: [
      { label: '索取檔案', href: '/docs' },
      { label: '訂閱電子報', href: 'https://billy4select.kit.com/profile/posts' },
      { label: '更新日誌', href: '/changelog' },
    ],
    company: [
      { label: 'YouTube', href: 'https://www.youtube.com/@billyselect4' },
      { label: 'Instagram', href: 'https://www.instagram.com/billy4select' },
      { label: 'Threads', href: 'https://www.threads.net/@billy4select' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
};