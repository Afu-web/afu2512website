document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Split Screen Logic ---
    const container = document.querySelector('.split-container');
    const leftSplit = document.getElementById('split-left');
    const rightSplit = document.getElementById('split-right');

    if (container && leftSplit && rightSplit) {
        // Left Side Hover
        leftSplit.addEventListener('mouseenter', () => {
            container.classList.add('hover-left');
        });
        leftSplit.addEventListener('mouseleave', () => {
            container.classList.remove('hover-left');
        });

        // Right Side Hover
        rightSplit.addEventListener('mouseenter', () => {
            container.classList.add('hover-right');
        });
        rightSplit.addEventListener('mouseleave', () => {
            container.classList.remove('hover-right');
        });
    }

    // --- Profile Page Scroll Interaction ---
    const profileHero = document.querySelector('.profile-hero');
    const scrollIndicator = document.getElementById('scroll-indicator');

    if (profileHero && scrollIndicator) {
        // Button Click Handler
        scrollIndicator.addEventListener('click', () => {
            profileHero.classList.add('shrunk');
            // Scroll to safe position (e.g. 50vh + slight offset) to ensure content is active
            window.scrollTo({
                top: window.innerHeight * 0.6,
                behavior: 'smooth'
            });
        });

        // Scroll Handler (Reset ONLY)
        window.addEventListener('scroll', () => {
            // Restore full screen only when at very top
            if (window.scrollY < 10) {
                profileHero.classList.remove('shrunk');
            }
            // Auto-shrink if user scrolls deep manually (fallback)
            else if (window.scrollY > window.innerHeight * 0.8) {
                profileHero.classList.add('shrunk');
            }
        });
    }

    // --- Profile Page Logic ---
    const profileParams = new URLSearchParams(window.location.search);
    const profileId = profileParams.get('id');

    // Mock Data
    const profiles = {
        'afu': {
            name: '阿福',
            role: 'Visionary Photographer',
            // Images array for slideshow
            images: ['images/AFU_BG/BG3.png'],
            bio: '阿福是一名專注於捕捉光影瞬間的攝影師。他善於在平凡的日常中發現不平凡的美，作品風格以強烈的情感張力和獨特的構圖聞名。近期正致力於探索城市廢墟與自然重生的視覺專題。',
            location: 'Taichung, Taiwan',
            specialty: 'Street Photography'
        },
        'xiaoti': {
            name: '曉禔',
            role: 'Creative Director',
            // Images array for slideshow
            images: [
                'images/XiaoTI_BG/img_01.jpg',
                'images/XiaoTI_BG/img_02.jpg',
                'images/XiaoTI_BG/img_03.jpg',
                'images/XiaoTI_BG/img_04.JPG',
                'images/XiaoTI_BG/img_05.jpg',
                'images/XiaoTI_BG/img_06.jpg',
                'images/XiaoTI_BG/img_07.jpg',
                'images/XiaoTI_BG/img_08.jpg',
                'images/XiaoTI_BG/img_09.jpg',
                'images/XiaoTI_BG/img_10.jpg',
                'images/XiaoTI_BG/img_11.jpeg',
                'images/XiaoTI_BG/img_12.jpg',
                'images/XiaoTI_BG/img_13.jpg',
                'images/XiaoTI_BG/img_14.jpg',
                'images/XiaoTI_BG/img_15.jpg',
                'images/XiaoTI_BG/img_16.jpg'
            ],
            bio: '曉禔擁有豐富的視覺設計經驗，擅長將抽象概念轉化為具體的視覺語言。作為創意總監，她帶領團隊完成了多個獲獎的品牌重塑專案。她相信設計不僅是美學的展現，更是解決問題的工具。',
            location: 'Taipei, Taiwan',
            specialty: 'Brand Identity'
        }
    };

    if (profileId && profiles[profileId]) {
        const data = profiles[profileId];

        const nameEl = document.getElementById('profile-name');
        const roleEl = document.getElementById('profile-role');
        const bioEl = document.getElementById('profile-bio');
        const imgEl = document.getElementById('profile-img');

        if (nameEl) {
            nameEl.textContent = data.name;
            document.title = `${data.name} - Profile`;
        }
        if (roleEl) roleEl.textContent = data.role;
        if (bioEl) bioEl.textContent = data.bio;

        // --- Marquee Population ---
        const marqueeTrack = document.getElementById('marquee-track');
        if (marqueeTrack && data.images.length > 0) {
            marqueeTrack.innerHTML = ''; // Clear previous

            // Duplicate images enough times to fill screen + safety
            // For a smooth loop, we need at least 2 sets.
            const marqueeImages = [...data.images, ...data.images, ...data.images]; // x3 just to be safe

            marqueeImages.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.className = 'marquee-img';
                marqueeTrack.appendChild(img);
            });
        }

        // --- Slideshow Logic (Fullscreen) ---
        if (imgEl && data.images.length > 0) {
            let currentIndex = 0;

            // Set initial image
            imgEl.src = data.images[0];

            // Preload images
            data.images.forEach(src => {
                new Image().src = src;
            });

            // Only start interval if more than one image
            if (data.images.length > 1) {
                setInterval(() => {
                    // Only run slideshow if NOT shrunk (optimization)
                    const hero = document.querySelector('.profile-hero');
                    if (hero && hero.classList.contains('shrunk')) return;

                    // 1. Fade Out
                    imgEl.style.opacity = '0';

                    setTimeout(() => {
                        // 2. Change Image
                        currentIndex = (currentIndex + 1) % data.images.length;
                        imgEl.src = data.images[currentIndex];

                        // 3. Fade In
                        setTimeout(() => {
                            imgEl.style.opacity = '1';
                        }, 50);
                    }, 500);
                }, 3500);
            }
        }
    }
});
