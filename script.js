// --- State ---
let currentStep = 1;
const totalSteps = 8; // Step 8 included
let userName = "Meri Love";

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  showStep(currentStep);
  createPetals();

  // Heart message show on click
  const heartEl = document.getElementById('interactiveHeart');
  if (heartEl) {
    heartEl.addEventListener('click', () => {
      setTimeout(() => {
        const msg = document.getElementById('heartMessage');
        if (msg) msg.classList.add('show');
      }, 500);
    });
  }
});

// ---- Navigation ----
function showStep(step) {
  document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
  const current = document.getElementById(`step${step}`);
  if (current) current.classList.add('active');

  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
  gsap.to("#progressBar", { width: `${progressPercentage}%`, duration: 0.8, ease: "power2.out" });

  switch (step) {
    case 2:
      gsap.from(".name-input", { scale: 0.5, opacity: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      break;
    case 3:
      gsap.from("#interactiveHeart", { scale: 0.5, rotation: 180, duration: 0.9, ease: "elastic.out(1, 0.5)" });
      document.getElementById('heartName').textContent = userName;
      break;
    case 4:
      typeMessage();
      gsap.from(".photo-frame", { y: 50, rotation: -10, opacity: 0, duration: 0.9, ease: "back.out(1.7)" });
      break;
    case 5:
      gsap.from(".polaroid", { y: 100, opacity: 0, stagger: 0.15, duration: 0.9, ease: "back.out(1.7)" });
      break;
    case 6:
      gsap.from(".heart", { scale: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" });
      break;
    case 7:
      gsap.from("#step7", { opacity: 0, y: 50, duration: 1, ease: "power2.out" });
      break;
    case 8:
      gsap.from("#step8", { opacity: 0, y: 50, duration: 1, ease: "power2.out" });
      // Load canvas-confetti if not loaded
      if (!window.confetti) {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
        script.onload = () => runStep8Confetti();
        document.body.appendChild(script);
      } else {
        runStep8Confetti();
      }
      break;
  }
}

// ---- Next Step ----
function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  }
}

// ---- Save Name ----
function saveName() {
  const nameInput = document.getElementById('nameInput').value.trim();
  if (nameInput) {
    userName = nameInput;
    document.getElementById('displayName').textContent = userName;
    document.getElementById('finalName').textContent = userName;
    document.getElementById('heartName').textContent = userName;
    document.getElementById('finalCelebrationName').textContent = userName;
    nextStep();

    gsap.to(".name-input", {
      backgroundColor: "#e8f5e9",
      borderColor: "#81c784",
      duration: 0.4, yoyo: true, repeat: 1
    });
  } else {
    gsap.to(".name-input", {
      backgroundColor: "#ffebee",
      borderColor: "#e53935",
      duration: 0.4, yoyo: true, repeat: 1
    });
    alert("Please apna pyaara naam likho 💗");
  }
}

// ---- Floating Hearts ----
function createHearts() {
  const container = document.getElementById('floatingHearts');
  const colors = ['#ff4081','#f06292','#f8bbd0','#d81b60','#ff80ab'];

  let total = Math.floor(10 + Math.random() * 3);
  for (let i=0;i<total;i++){
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤';
    heart.style.left = `${20 + Math.random()*60}%`;
    heart.style.top = `${50 + Math.random()*20}%`;
    heart.style.color = colors[Math.floor(Math.random()*colors.length)];
    heart.style.animationDuration = `${3+Math.random()*2}s`;
    heart.style.fontSize = `${28+Math.random()*20}px`;
    container.appendChild(heart);
    setTimeout(()=>heart.remove(),5000);
  }
  gsap.to("#interactiveHeart",{scale:1.3,duration:0.25,yoyo:true,repeat:1});
}

// ---- Falling Petals ----
function createPetals() {
  const container = document.getElementById('petalsContainer');
  const colors = ['#ffcdd2','#f8bbd0','#fce4ec','#f48fb1'];

  for(let i=0;i<15;i++){
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const type = Math.floor(Math.random()*3);
    let path = "M50,0 C60,15 60,30 50,45 C40,30 40,15 50,0";
    if(type===1) path="M50,0 C70,20 70,40 50,50 C30,40 30,20 50,0";
    if(type===2) path="M50,0 C55,10 55,25 50,35 C45,25 45,10 50,0";

    petal.style.width=`${10+Math.random()*20}px`;
    petal.style.height=`${10+Math.random()*20}px`;
    petal.style.left=`${Math.random()*100}%`;
    petal.style.top='-20px';
    petal.style.opacity=0.8;

    petal.innerHTML=`<svg viewBox="0 0 100 50" width="100%" height="100%">
      <path d="${path}" fill="${colors[Math.floor(Math.random()*colors.length)]}" />
    </svg>`;

    container.appendChild(petal);
    const duration = 10+Math.random()*20;
    const delay = Math.random()*15;
    const sway = 50+Math.random()*100;

    gsap.to(petal,{
      y:window.innerHeight+50,
      x:`+=${sway}`,
      rotation:360,
      duration,delay,ease:"none",
      onComplete:()=>{petal.remove();}
    });
  }
}

// ---- Typewriter ----
function typeMessage() {
  const messages = [
    `Dear ${userName},`,
    `Shuruat dosti se hui thi… par aaj tu meri zindagi ka sabse important hissa ban gaya hai.  
    Tere bina din adhoora lagta hai, aur teri ek smile meri sari tension uda deti hai.  
    Tu meri bestie se zyada, meri aadat, meri zarurat aur meri sabse khaas insaan hai ❤️`,
    "Happy Birthday, meri love! ❤"
  ];

  const typingText = document.getElementById('typingText');
  let msgIndex = 0, charIndex=0, isDeleting=false, speed=90;

  function type() {
    const current = messages[msgIndex];
    if(isDeleting){
      typingText.innerHTML=current.substring(0,charIndex-1);
      charIndex--; speed=45;
    }else{
      typingText.innerHTML=current.substring(0,charIndex+1);
      charIndex++; speed=90;
    }

    if(!isDeleting && charIndex===current.length){isDeleting=true; speed=1200;}
    else if(isDeleting && charIndex===0){isDeleting=false; msgIndex=(msgIndex+1)%messages.length; speed=450;}

    setTimeout(type,speed);
  }

  setTimeout(()=>{document.getElementById('typedMessage')?.classList.add('show'); type();},400);
}

// ---- Step 8 Confetti + Balloons ----
function runStep8Confetti() {
  const canvas = document.getElementById('confettiCanvas');
  if(!canvas) return;

  // Confetti burst for 3s
  const end = Date.now() + 3000;
  function frame(){
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x:0 }
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x:1 }
    });
    if(Date.now() < end){
      requestAnimationFrame(frame);
    } else {
      spawnFallingConfetti();
    }
  }
  frame();

  // Optional: Add balloon animation
  spawnBalloons();
}

function spawnFallingConfetti(){
  setInterval(()=>{
    confetti({
      particleCount:2,
      spread:55,
      origin:{x:Math.random()},
      gravity:0.5,
      ticks:200
    });
  },300);
}

// Simple balloon animation for Step 8
function spawnBalloons(){
  const letters = ['H','B','D','Y','O','U']; // Example
  letters.forEach((letter,i)=>{
    const balloon = document.createElement('div');
    balloon.classList.add('balloon-step8');
    balloon.textContent = letter;
    balloon.style.left=`${10+i*15}%`;
    document.body.appendChild(balloon);
    gsap.to(balloon,{y:-window.innerHeight,duration:6+Math.random()*3,repeat:-1,ease:"linear"});
  });
}

// ---- Restart ----
function restart(){
  currentStep=1;
  showStep(currentStep);
}