/**
 * 自動抓取並渲染活動資訊至社群頻道區塊
 */
let isRendering = false;
let cachedEvents = null; // 用於儲存已抓取的活動資料

window.renderEvents = async function (lang) {
    if (isRendering) return;
    isRendering = true;
    // ====設定區====
    const eventSources = [
        'Events/event_1/event_1.json',
        'Events/event_2/event_2.json'
    ];
    // =============
    const showEventPageBtn = false; // 設定是否顯示「前往我的活動頁」按鈕
    // =============

    const eventPageBtn = document.getElementById('btn-go-events');
    if (eventPageBtn) {
        eventPageBtn.style.display = showEventPageBtn ? 'inline-flex' : 'none';
    }

    const container = document.querySelector('#events .events-grid');
    if (!container) {
        isRendering = false;
        return;
    }

    const langMap = {
        'zh': 'zh-tw',
        'zh-Hans': 'zh-cn',
        'en': 'en',
        'ja': 'ja',
        'ko': 'ko'
    };
    const jsonLang = langMap[lang] || 'en';

    if (!cachedEvents) {
        cachedEvents = [];
        for (const url of eventSources) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    cachedEvents.push(data);
                }
            } catch (error) {
                console.error(`載入活動 ${url} 失敗:`, error);
            }
        }
    }

    const cards = container.querySelectorAll('.event-card');

    if (cards.length === 0) {
        container.innerHTML = '';
        cachedEvents.forEach((data, index) => {
            const title = data.titles[jsonLang] || data.titles['en'];
            const description = data.descriptions[jsonLang] || data.descriptions['en'];
            const t = getEventTranslations(lang, data.finished);

            const card = document.createElement('div');
            card.className = `event-card ${data.finished ? 'is-finished' : ''}`;
            card.setAttribute('data-event-id', index);

            card.innerHTML = `
                <div class="event-image">
                    <img src="${data.img}" alt="${title}" loading="lazy">
                </div>
                <div class="event-body">
                    <h3 class="event-title">${title}</h3>
                    <p class="event-desc">${description}</p>
                </div>
                <div class="event-action">
                    <a href="${data.link}" class="event-btn" target="_blank" rel="noopener noreferrer">
                        ${t.btn} →
                    </a>
                    <div class="event-status-group">
                        ${(data.isTentative && !data.finished) ? `<span class="status-tag tentative">${t.tentative}</span>` : ''}
                        <span class="status-tag ${data.finished ? 'finished' : 'upcoming'}">
                            ${t.status}
                        </span>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    } else {
        cards.forEach((card, index) => {
            const data = cachedEvents[index];
            if (!data) return;

            const title = data.titles[jsonLang] || data.titles['en'];
            const description = data.descriptions[jsonLang] || data.descriptions['en'];
            const t = getEventTranslations(lang, data.finished);

            const titleEl = card.querySelector('.event-title');
            const descEl = card.querySelector('.event-desc');
            const btnEl = card.querySelector('.event-btn');
            const statusEl = card.querySelector('.status-tag:not(.tentative)');
            const tentativeEl = card.querySelector('.tentative');

            if (titleEl) titleEl.textContent = title;
            if (descEl) descEl.textContent = description;
            if (btnEl) btnEl.textContent = `${t.btn} →`;
            if (statusEl) statusEl.textContent = t.status;
            if (tentativeEl) tentativeEl.textContent = t.tentative;
        });
    }

    isRendering = false;
}

function getEventTranslations(lang, finished) {
    const translations = {
        'zh': { btn: '查看詳情', status: finished ? '已結束' : '未開始', tentative: '暫定' },
        'zh-Hans': { btn: '查看详情', status: finished ? '已结束' : '未开始', tentative: '暂定' },
        'ja': { btn: '詳細を見る', status: finished ? '終了' : '予定', tentative: '暫定' },
        'ko': { btn: '자세히 보기', status: finished ? '종료됨' : '예정됨', tentative: '잠정' },
        'en': { btn: 'View Details', status: finished ? 'Finished' : 'Upcoming', tentative: 'Tentative' }
    };
    return translations[lang] || translations['en'];
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'zh';
    window.renderEvents(savedLang);
});
