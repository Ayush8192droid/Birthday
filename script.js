// ज़रूरी HTML तत्वों को प्राप्त करें
const mainImage = document.getElementById('main-image');
const mainText1 = document.getElementById('main-text-1');
const mainText2 = document.getElementById('main-text-2');
const mainButton = document.getElementById('main-button');
const textSection = document.getElementById('text-section');
const lyricsSection = document.getElementById('lyrics-section');
const backgroundMusic = document.getElementById('background-music'); 
const finalMessage = document.getElementById('final-message'); 

// --- GIF और मैसेज के लिए ओवरले कंटेनर ---
const finalOverlay = document.createElement('div');
finalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    opacity: 0;
    transition: opacity 1s ease-in-out;
    pointer-events: none;
    z-index: 10;
`;
document.body.appendChild(finalOverlay);

// अंतिम GIF एलिमेंट
const finalGif = document.createElement('img');
finalGif.src = 'https://media.tenor.com/5hNFjHWQYKQAAAAi/bubu-dudu-sseeyall.gif';
finalGif.style.width = '200px'; 
finalGif.style.height = 'auto';
finalOverlay.appendChild(finalGif); 

// finalMessage को ओवरले में जोड़ना
finalMessage.remove(); 
finalOverlay.appendChild(finalMessage); 
// ------------------------------------

let step = 1; 

const lyricLines = [
    document.getElementById('line1'), 
    document.getElementById('line2'), 
    document.getElementById('line3'), 
    document.getElementById('line4')
];

// FIX: टाइमिंग को अलग-अलग परिभाषित किया गया
const interval_standard = 2800; // लाइन्स 1, 2, 3 के लिए
const interval_last = 1700;      // लाइन 4 के लिए
let lyricTimer; // setTimeout ID को स्टोर करने के लिए

mainImage.src = 'https://media.tenor.com/TKWhffgW_IsAAAAi/white-bear1934.gif'; 


function startLyricSequence(i) {
    // 1. अगर सभी लाइनें पूरी हो गईं (i = 4)
    if (i >= lyricLines.length) {
        // तुरंत GIF और मैसेज दिखाएँ
        lyricsSection.classList.add('hidden'); 
        finalOverlay.style.opacity = '1';
        finalMessage.style.opacity = '1'; 
        return;
    }

    // 2. पिछली लाइन को छिपाएँ
    if (i > 0) {
        const previousLine = lyricLines[i - 1];
        previousLine.style.animation = 'none'; 
        previousLine.style.opacity = '0'; 
    }

    // 3. वर्तमान लाइन को स्लाइड करके दिखाएँ
    const currentLine = lyricLines[i];
    currentLine.style.opacity = '0'; 
    currentLine.style.animation = `slideUpFadeIn 0.7s ease-out forwards`; 

    // 4. अगली देरी का समय निर्धारित करें
    // अगर यह आखिरी लाइन (index 3) है, तो देरी 500ms होगी, वरना 2800ms
    const delay = (i === lyricLines.length - 1) ? interval_last : interval_standard;

    // 5. अगली लाइन/ट्रांज़िशन को शेड्यूल करें
    lyricTimer = setTimeout(() => {
        startLyricSequence(i + 1); // रिकर्सिव कॉल
    }, delay);
}


mainButton.addEventListener('click', function() {
    
    // 1. पुराने तत्वों को छिपाएँ (Fade Out)
    mainImage.classList.add('hidden');
    mainText1.classList.add('hidden');
    mainText2.classList.add('hidden');
    mainButton.classList.add('hidden');

    // 2. 0.5 सेकंड इंतज़ार करें (ट्रांज़िशन टाइम)
    setTimeout(() => {
        if (step === 1) {
            // --- पहली क्लिक के बाद बदलाव ---
            mainImage.src = 'https://media.tenor.com/TG89D51JHccAAAAi/thank-you.gif'; 
            mainText1.textContent = 'Are you really ready to know...?';
            mainText2.textContent = ''; 
            mainButton.textContent = 'Show Me ✨';
            
            // नए तत्वों को वापस दिखाएँ
            mainImage.classList.remove('hidden');
            mainText1.classList.remove('hidden');
            mainButton.classList.remove('hidden');

            step = 2; 
            
        } else if (step === 2) {
            // --- दूसरी क्लिक के बाद बदलाव (लिरिक्स और म्यूज़िक) ---
            
            // म्यूज़िक शुरू करें
            backgroundMusic.volume = 0.5; 
            backgroundMusic.play().catch(error => {
                console.log("Music auto-play was blocked.", error);
            });

            // GIF और बटन को परमानेंटली गायब करें
            mainImage.style.display = 'none'; 
            mainButton.style.display = 'none';
            textSection.classList.add('hidden'); 
            
            // लिरिक्स सेक्शन को दिखाएँ
            lyricsSection.classList.remove('hidden');
            
            // FIX: क्रमिक टाइमर अनुक्रम शुरू करें (index 0 से)
            startLyricSequence(0); 

            step = 3;
        }
    }, 500); 
});
