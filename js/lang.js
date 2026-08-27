
window.translations = window.translations || {};

function toggleLangDropdown(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function changeLang(lang) {
    const t = window.translations[lang];
    if (!t) {
        console.warn(`Language '${lang}' not found.`);
        return;
    }

    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (t[key]) el.textContent = t[key];
    });

    document.querySelectorAll('[data-alt]').forEach(el => {
        const key = el.getAttribute('data-alt');
        if (key && t[key]) {
            el.alt = t[key];
        } else if (key) {
            el.alt = key;
        }
    });

    const currentLangLabel = document.getElementById('current-lang-label');
    if (currentLangLabel) {
        currentLangLabel.textContent = t.current_lang;
    }

    try {
        if (t.site_title) document.title = t.site_title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && t.site_description) metaDesc.setAttribute('content', t.site_description);
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        const twTitle = document.querySelector('meta[property="twitter:title"]');
        const twDesc = document.querySelector('meta[property="twitter:description"]');
        if (ogTitle && t.site_title) ogTitle.setAttribute('content', t.site_title);
        if (twTitle && t.site_title) twTitle.setAttribute('content', t.site_title);
        if (ogDesc && t.site_description) ogDesc.setAttribute('content', t.site_description);
        if (twDesc && t.site_description) twDesc.setAttribute('content', t.site_description);
    } catch (e) {
        console.error('Error updating meta/titles for lang:', e);
    }

    localStorage.setItem('lang', lang);

    if (typeof window.renderEvents === 'function') {
        window.renderEvents(lang);
    }

    if (typeof toggleMobileMenu === 'function') {
        toggleMobileMenu(false);
    }

    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    let savedLang = localStorage.getItem('lang');
    if (!savedLang) {
        // 自動偵測瀏覽器語言
        const browserLang = navigator.language || navigator.userLanguage || 'zh';
        const lowerLang = browserLang.toLowerCase();
        
        if (lowerLang.startsWith('zh-cn') || lowerLang.startsWith('zh-sg') || lowerLang.startsWith('zh-hans')) {
            savedLang = 'zh-Hans';
        } else if (lowerLang.startsWith('zh')) {
            savedLang = 'zh';
        } else if (lowerLang.startsWith('ja')) {
            savedLang = 'ja';
        } else if (lowerLang.startsWith('en')) {
            savedLang = 'en';
        } else {
            savedLang = 'zh'; // 預設語言
        }
    }

    setTimeout(() => {
        changeLang(savedLang);
    }, 0);

    document.addEventListener('click', () => {
        const dropdown = document.getElementById('lang-dropdown');
        if (dropdown && dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
        }
    });
});
