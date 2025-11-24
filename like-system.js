// ========== 通用按讚功能系統 ==========
// 此腳本可用於所有頁面

class LikeSystem {
    constructor(pageKey) {
        this.pageKey = pageKey; // 用於區分不同頁面的按讚數據
        this.LIKES_KEY = `${pageKey}Likes`;
        this.LIKED_KEY = `${pageKey}Liked`;
    }

    // 初始化按讚數據
    initLikes() {
        const likes = JSON.parse(localStorage.getItem(this.LIKES_KEY) || '{}');
        const liked = JSON.parse(localStorage.getItem(this.LIKED_KEY) || '{}');
        return { likes, liked };
    }

    // 儲存按讚數據
    saveLikes(likes, liked) {
        localStorage.setItem(this.LIKES_KEY, JSON.stringify(likes));
        localStorage.setItem(this.LIKED_KEY, JSON.stringify(liked));
    }

    // 載入並顯示所有按讚狀態
    loadLikesState() {
        const { likes, liked } = this.initLikes();
        
        document.querySelectorAll('.card').forEach(card => {
            const itemId = card.dataset.itemId;
            if (!itemId) return;
            
            const likeCount = card.querySelector('.like-count');
            const heartIcon = card.querySelector('.heart-icon');
            const likeBtn = card.querySelector('.like-btn');
            
            if (!likeCount || !heartIcon || !likeBtn) return;
            
            // 設定按讚數
            likeCount.textContent = likes[itemId] || 0;
            
            // 設定按讚狀態
            if (liked[itemId]) {
                heartIcon.textContent = '❤️';
                likeBtn.classList.add('liked');
            } else {
                heartIcon.textContent = '🤍';
                likeBtn.classList.remove('liked');
            }
        });
    }

    // 處理按讚點擊
    handleLike(event, card) {
        event.stopPropagation(); // 防止觸發卡片翻轉或其他事件
        
        const itemId = card.dataset.itemId;
        if (!itemId) return;
        
        const { likes, liked } = this.initLikes();
        const likeBtn = card.querySelector('.like-btn');
        const heartIcon = card.querySelector('.heart-icon');
        const likeCount = card.querySelector('.like-count');
        
        if (!likeBtn || !heartIcon || !likeCount) return;
        
        // 切換按讚狀態
        if (liked[itemId]) {
            // 取消按讚
            likes[itemId] = Math.max((likes[itemId] || 0) - 1, 0);
            liked[itemId] = false;
            heartIcon.textContent = '🤍';
            likeBtn.classList.remove('liked');
        } else {
            // 按讚
            likes[itemId] = (likes[itemId] || 0) + 1;
            liked[itemId] = true;
            heartIcon.textContent = '❤️';
            likeBtn.classList.add('liked');
        }
        
        // 更新顯示
        likeCount.textContent = likes[itemId];
        
        // 儲存到 localStorage
        this.saveLikes(likes, liked);
    }

    // 初始化按讚系統
    init() {
        // 綁定所有按讚按鈕
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const card = btn.closest('.card');
                this.handleLike(event, card);
            });
        });

        // 頁面載入時初始化按讚狀態
        this.loadLikesState();
    }
}
