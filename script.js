document.addEventListener('DOMContentLoaded', () => {
    // ---------- CONFIG ----------
    const BIRTHDAY_UNLOCK_DAY = 2; // 2 means 02 September will unlock the surprise
    const YEAR = new Date().getFullYear();

    // ---------- ELEMENTS ----------
    const pages = document.querySelectorAll('.page');
    const body = document.body;
    const nameInput = document.getElementById('userName');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const lockMessage = document.getElementById('lockMessage');
    // Final message elements hata diye gaye hain

    // Puzzle 1 elements
    const puzzleInput = document.getElementById('puzzleInput');
    const puzzleBtn = document.getElementById('puzzleBtn');
    const celebrationMessage = document.getElementById('celebrationMessage');
    const allowedAnswers = ["shivanshu ki mummy", "shivanshu ki ma", "shivanshu mummy", "mummy"];

    // Puzzle 2 elements
    const puzzleInput2 = document.getElementById('puzzleInput2');
    const puzzleBtn2 = document.getElementById('puzzleBtn2');
    const celebrationMessage2 = document.getElementById('celebrationMessage2');
    const allowedAnswers2 = ["somya", "somu"];

    // Puzzle 3 elements
    const puzzleInput3 = document.getElementById('puzzleInput3');
    const puzzleBtn3 = document.getElementById('puzzleBtn3');
    const celebrationMessage3 = document.getElementById('celebrationMessage3');
    const allowedAnswers3 = ["mera naam", "mera naam", "naam"];

    // Slideshow elements
    const photos = document.querySelectorAll('.gallery-img');
    let currentPhotoIndex = 0;
    let slideshowInterval;

    // ---------- DATE / LOCK (consistent) ----------
    const today = new Date();
    const lockDate = new Date(`${YEAR}-09-01T00:00:00`);
    const isUnlocked = today.getTime() >= lockDate.getTime();

    if (!isUnlocked) {
        if (nextPageBtn) {
            nextPageBtn.textContent = `${BIRTHDAY_UNLOCK_DAY} September ko kholna`;
            nextPageBtn.classList.add('disabled-btn');
            nextPageBtn.disabled = true;
        }
        if (lockMessage) lockMessage.textContent = 'Yeh aage ka content dekhne ke liye bahut maja aayega!';
    } else {
        if (nextPageBtn) {
            nextPageBtn.textContent = 'Aage badho';
            nextPageBtn.classList.remove('disabled-btn');
            nextPageBtn.disabled = false;
        }
        if (lockMessage) lockMessage.style.display = 'none';
    }

    // restore visitor name if present
    const savedName = localStorage.getItem('visitorName');
    if (savedName && welcomeMessage) welcomeMessage.textContent = `Hey, ${savedName}!`;

    // ---------- NAVIGATION ----------
    const navigateToPage = (targetPageId, triggerConfetti = false) => {
        const activePage = document.querySelector('.page.active');
        const targetPage = document.getElementById(targetPageId);
        if (activePage && targetPage) {
            activePage.classList.remove('active');
            targetPage.classList.add('active');
            const targetColor = targetPage.getAttribute('data-color');
            if (targetColor) body.style.backgroundColor = targetColor;

            // Slideshow ko bas final page par hi shuru karo
            if (targetPageId === 'page-6') {
                startSlideshow();
            } else {
                clearInterval(slideshowInterval);
            }

            if (triggerConfetti) runConfetti();
        }
    };

    document.body.addEventListener('click', (event) => {
        if (event.target.matches('.btn[data-next-page]')) {
            const nextPageId = event.target.getAttribute('data-next-page');
            if (event.target.id === 'nextPageBtn' && event.target.disabled) return;

            if (event.target.closest('#page-1')) {
                const name = nameInput.value.trim();
                if (name) {
                    localStorage.setItem('visitorName', name);
                    if (welcomeMessage) welcomeMessage.textContent = `Hey, ${name}!`;
                    navigateToPage(nextPageId);
                } else {
                    alert('Kripya apna naam daalein!');
                }
            } else {
                navigateToPage(nextPageId);
            }
        }
    });

    // ---------- PUZZLE 1 LOGIC ----------
    if (puzzleBtn && puzzleInput) {
        const checkAnswer = () => {
            const userAnswer = puzzleInput.value.trim().toLowerCase();
            if (allowedAnswers.includes(userAnswer)) {
                celebrationMessage.textContent = 'Sahi Jawab! 🔥';
                celebrationMessage.classList.add('visible');
                runConfetti();

                setTimeout(() => {
                    navigateToPage('page-4');
                    celebrationMessage.classList.remove('visible');
                }, 2000);
            } else {
                alert('Galat jawab! Phir se koshish karo. 🤔');
            }
        };

        puzzleBtn.addEventListener('click', checkAnswer);
        puzzleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });
    }

    // ---------- PUZZLE 2 LOGIC ----------
    if (puzzleBtn2 && puzzleInput2) {
        const checkAnswer2 = () => {
            const userAnswer2 = puzzleInput2.value.trim().toLowerCase();
            if (allowedAnswers2.includes(userAnswer2)) {
                celebrationMessage2.textContent = 'Sahi Jawab! 🎉';
                celebrationMessage2.classList.add('visible');
                runConfetti();

                setTimeout(() => {
                    navigateToPage('page-5');
                    celebrationMessage2.classList.remove('visible');
                }, 2000);
            } else {
                alert('Galat jawab! Phir se koshish karo. 🤔');
            }
        };

        puzzleBtn2.addEventListener('click', checkAnswer2);
        puzzleInput2.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkAnswer2();
            }
        });
    }

    // ---------- PUZZLE 3 LOGIC (FINAL) ----------
    if (puzzleBtn3 && puzzleInput3) {
        const checkAnswer3 = () => {
            const userAnswer3 = puzzleInput3.value.trim().toLowerCase();
            if (allowedAnswers3.includes(userAnswer3)) {
                celebrationMessage3.textContent = 'Sahi Jawab! ✨ Ab dekho ek surprise!';
                celebrationMessage3.classList.add('visible');
                runConfetti();

                setTimeout(() => {
                    navigateToPage('page-6'); // Slideshow page
                    celebrationMessage3.classList.remove('visible');
                }, 2000);
            } else {
                alert('Galat jawab! Phir se koshish karo. 🤔');
            }
        };

        puzzleBtn3.addEventListener('click', checkAnswer3);
        puzzleInput3.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkAnswer3();
            }
        });
    }

    // ---------- PHOTO SLIDESHOW LOGIC (Automatic) ----------
    const showPhoto = (index) => {
        photos.forEach(photo => photo.classList.remove('active-photo'));
        photos[index].classList.add('active-photo');
    };
    
    const startSlideshow = () => {
        clearInterval(slideshowInterval);
        showPhoto(currentPhotoIndex);
        slideshowInterval = setInterval(() => {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            showPhoto(currentPhotoIndex);
        }, 3000);
    };

    // ---------- CONFETTI ----------
    const runConfetti = () => {
        const duration = 2.5 * 1000;
        const end = Date.now() + duration;
        const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 999 };
        const rand = (a, b) => Math.random() * (b - a) + a;

        const id = setInterval(() => {
            const timeLeft = end - Date.now();
            if (timeLeft <= 0) return clearInterval(id);
            const particleCount = Math.round(10 * (timeLeft / duration));
            confetti({ ...defaults, particleCount, origin: { x: rand(0.1, 0.3), y: rand(0, 0.4) } });
            confetti({ ...defaults, particleCount, origin: { x: rand(0.7, 0.9), y: rand(0, 0.4) } });
        }, 250);
    };

    // ---------- COUNTDOWN ----------
    (function countdownModule() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
        const birthdayDate = new Date(`${YEAR}-09-02T00:00:00`);
        const timerInterval = setInterval(() => {
            const now = Date.now();
            const diff = birthdayDate - now;
            if (diff <= 0) {
                countdownElement.innerText = "Janamdin Mubarak!";
                nextPageBtn.disabled = false;
                clearInterval(timerInterval);
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            countdownElement.innerText = `${days} din : ${hours} ghante : ${minutes} minute : ${seconds} second`;
        }, 1000);
    })();

    // --- Scroll Animations ---
    (function scrollAnim() {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scrolled');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        document.querySelectorAll('[data-scroll]').forEach(el => observer.observe(el));
    })();

    // ---------- ON LOAD: set initial background ----------
    const initialPage = document.querySelector('.page.active');
    if (initialPage) body.style.backgroundColor = initialPage.getAttribute('data-color');
});
