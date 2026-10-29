'use client';
const themeScript = `(function(){try{var t=localStorage.getItem('breakloop-theme');document.documentElement.dataset.theme=['light','dark'].includes(t)?t:'system'}catch(e){document.documentElement.dataset.theme='system'}})()`;
export function ThemeScript() {
  return typeof window === 'undefined' ? <script dangerouslySetInnerHTML={{ __html: themeScript }} /> : null;
}

