// 將主要邏輯放在這裡，確保所有外部腳本都已載入
// 平滑滾動至頂部
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 滾動追蹤 (ScrollSpy) 功能 ---
const sections = document.querySelectorAll('section, footer#contact');
const navLinks = document.querySelectorAll('#desktop-nav .nav-link');

function updateActiveNav() {
    let current = "";
    const offset = 100; // 滾動偏移量補償

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - offset && window.pageYOffset < sectionTop + sectionHeight - offset) {
            current = section.getAttribute('id');
        }
    });

    // 修正：當滾動到頁面最底部時，強制選中最後一個選項 (聯絡)
    if ((window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight - 20) {
        current = 'contact';
    }

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-nav');
        }
    });
}

// --- 效能優化：滾動事件節流 (Throttling) ---
let isScrolling = false;

function onScroll() {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateActiveNav();
            toggleHeaderShadow();
            isScrolling = false;
        });
        isScrolling = true;
    }
}

window.addEventListener('scroll', onScroll);

// --- 滾動揭露效果 (Intersection Observer) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 側邊選單控制
function toggleMobileMenu(isOpen) {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (isOpen) {
        menu.classList.add('active');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        menu.classList.remove('active');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// --- 作品集 Modal 控制 ---
function toggleWorksModal(show) {
    const modal = document.getElementById('works-modal');
    const backdrop = document.getElementById('works-modal-backdrop');
    const panel = document.getElementById('works-modal-panel');

    if (!modal || !backdrop || !panel) {
        alert('錯誤：作品集視窗元件遺失！\n請確認 js/works-modal.js 檔案是否正確載入。');
        console.error("Modal element(s) not found! Check if js/works-modal.js is loaded correctly.");
        return;
    }

    if (show) {
        // 開啟時：如果歷史紀錄中沒有 modal 狀態，則推入一筆
        if (!history.state || !history.state.worksModal) {
            history.pushState({ worksModal: true }, '', '#works');
        }

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // 鎖定背景滾動

        // 動畫進場
        setTimeout(() => {
            backdrop.classList.remove('opacity-0');
            panel.classList.remove('opacity-0', 'scale-95');
            panel.classList.add('opacity-100', 'scale-100');
        }, 10);
    } else {
        // 關閉時：如果當前歷史紀錄是 modal 狀態，則執行上一頁 (這會觸發 popstate 事件來關閉)
        if (history.state && history.state.worksModal) {
            history.back();
            return;
        }

        // 動畫退場
        backdrop.classList.add('opacity-0');
        panel.classList.remove('opacity-100', 'scale-100');
        panel.classList.add('opacity-0', 'scale-95');

        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            // 每次關閉時重置回作品網格視圖
            if (typeof showWorksGrid === 'function') {
                showWorksGrid(false); // 傳入 false 避免重複操作歷史紀錄
            }
        }, 300); // 等待 transition 結束
    }
}

// --- 生日倒計時邏輯 ---
function updateBirthdayCountdown() {
    const birthdayMonth = 3; // 3月
    const birthdayDay = 25;  // 25日

    const now = new Date();
    let year = now.getFullYear();
    let nextBirthday = new Date(year, birthdayMonth - 1, birthdayDay);

    // 如果今年生日已過，計算明年的生日
    if (now > nextBirthday) {
        nextBirthday = new Date(year + 1, birthdayMonth - 1, birthdayDay);
    }

    const diff = nextBirthday - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    // 安全檢查：確保元素存在才更新，避免報錯
    if (!document.getElementById('days')) return;

    document.getElementById('days').innerText = d.toString().padStart(2, '0');
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}

// 每秒更新一次
setInterval(updateBirthdayCountdown, 1000);
updateBirthdayCountdown();

// 初始化主題與語言
(function init() {
    // 初始化選單高亮
    updateActiveNav();
})();

// 導覽列捲動效果
function toggleHeaderShadow() {
    const header = document.querySelector('header');
    if (!header) return;

    if (window.scrollY > 20) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
}

// --- 語言切換動畫封裝 ---
(function wrapLanguageSwitcher() {
    if (typeof window.changeLang !== 'function') return;

    const originalChangeLang = window.changeLang;
    let initialLang = localStorage.getItem('lang') || 'zh';
    let currentLang = initialLang;

    // 動畫執行函數 (只對文字元素執行原本的滑動動畫)
    const runAnimation = (targetLang, direction, callback) => {
        // 選取所有靜態翻譯元素，以及活動區塊內的文字子元素 (不包含卡片本身)
        const getElements = () => document.querySelectorAll('[data-t], .event-title, .event-desc, .event-btn, .status-tag');
        
        let elements = getElements();
        const outClass = direction === 'down' ? 'lang-anim-out-down' : 'lang-anim-out-up';
        const inClass = direction === 'down' ? 'lang-anim-in-down' : 'lang-anim-in-up';

        // 1. 文字退場
        elements.forEach(el => {
            el.style.transition = 'all 0.2s ease-in-out';
            el.classList.add(outClass);
        });

        setTimeout(async () => {
            // 2. 更換文字內容
            originalChangeLang(targetLang); // 更新靜態文字
            if (typeof renderEvents === 'function') {
                await renderEvents(targetLang); // 更新活動區塊文字 (不刷新 HTML 結構)
            }
            
            // 重新獲取元素以確保捕捉到所有目標
            elements = getElements();

            // 3. 文字進場
            elements.forEach(el => {
                el.classList.remove(outClass);
                el.classList.add(inClass);
            });
            
            setTimeout(() => {
                elements.forEach(el => {
                    el.classList.remove(inClass);
                    el.style.transition = '';
                });
                if (callback) callback();
            }, 300);
        }, 200);
    };

    window.changeLang = function (lang) {
        if (lang === currentLang) {
            originalChangeLang(lang);
            return;
        }

        const fromLang = currentLang;
        const toLang = lang;

        // 保持最原始的多段連鎖路徑
        if (fromLang === 'zh' && toLang === 'zh-Hans') {
            runAnimation('zh-Hans', 'down');
        } else if (fromLang === 'zh' && toLang === 'en') {
            runAnimation('zh-Hans', 'down', () => {
                runAnimation('en', 'down');
            });
        } else if (fromLang === 'zh' && toLang === 'ja') {
            runAnimation('zh-Hans', 'down', () => {
                runAnimation('en', 'down', () => {
                    runAnimation('ja', 'down');
                });
            });
        } else if (fromLang === 'zh-Hans' && toLang === 'zh') {
            runAnimation('zh', 'up');
        } else if (fromLang === 'zh-Hans' && toLang === 'en') {
            runAnimation('en', 'down');
        } else if (fromLang === 'zh-Hans' && toLang === 'ja') {
            runAnimation('en', 'down', () => {
                runAnimation('ja', 'down');
            });
        } else if (fromLang === 'en' && toLang === 'zh') {
            runAnimation('zh-Hans', 'up', () => {
                runAnimation('zh', 'up');
            });
        } else if (fromLang === 'en' && toLang === 'zh-Hans') {
            runAnimation('zh-Hans', 'up');
        } else if (fromLang === 'en' && toLang === 'ja') {
            runAnimation('ja', 'down');
        } else if (fromLang === 'ja' && toLang === 'en') {
            runAnimation('en', 'up');
        } else if (fromLang === 'ja' && toLang === 'zh-Hans') {
            runAnimation('en', 'up', () => {
                runAnimation('zh-Hans', 'up');
            });
        } else if (fromLang === 'ja' && toLang === 'zh') {
            runAnimation('en', 'up', () => {
                runAnimation('zh-Hans', 'up', () => {
                    runAnimation('zh', 'up');
                });
            });
        } else {
            runAnimation(toLang, 'down');
        }

        currentLang = lang;
    };
})();
