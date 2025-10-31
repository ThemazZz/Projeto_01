const OFFER_DURATION_HOURS = 48; 


const now = new Date();
const offerEndDate = new Date(now.getTime() + OFFER_DURATION_HOURS * 60 * 60 * 1000);


const elDays = document.getElementById('days');
const elHours = document.getElementById('hours');
const elMinutes = document.getElementById('minutes');
const elSeconds = document.getElementById('seconds');
const ctaBtn = document.getElementById('cta');
const countdownWrapper = document.getElementById('countdown');


function twoDigits(num) {
  return String(num).padStart(2, '0');
}


function updateCountdown() {
  const now = new Date();
  const diff = offerEndDate - now; 

  
  if (diff <= 0) {
    
    elDays.textContent = '00';
    elHours.textContent = '00';
    elMinutes.textContent = '00';
    elSeconds.textContent = '00';

    
    ctaBtn.textContent = 'Oferta encerrada';
    ctaBtn.classList.add('disabled');
    ctaBtn.setAttribute('aria-disabled', 'true');

    
    ctaBtn.classList.remove('pulse');
    return;
  }

  
  const secondsTotal = Math.floor(diff / 1000);
  const days = Math.floor(secondsTotal / (3600 * 24));
  const hours = Math.floor((secondsTotal % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  
  elDays.textContent = twoDigits(days);
  elHours.textContent = twoDigits(hours);
  elMinutes.textContent = twoDigits(minutes);
  elSeconds.textContent = twoDigits(seconds);

  
  const hoursLeftTotal = diff / (1000 * 60 * 60); 

  
  if (hoursLeftTotal <= 12) {
    ctaBtn.classList.add('pulse');
  } else {
    ctaBtn.classList.remove('pulse');
  }

  
  if (hoursLeftTotal <= 24) {
    ctaBtn.textContent = `Compre agora • ${Math.ceil(hoursLeftTotal)}h restantes`;
  } else {
    ctaBtn.textContent = 'Compre agora';
  }
}


updateCountdown(); 
const intervalId = setInterval(() => {
  updateCountdown();
  if (new Date() >= offerEndDate) clearInterval(intervalId);
}, 1000);


ctaBtn.addEventListener('click', (e) => {
  if (ctaBtn.classList.contains('disabled')) {
    e.preventDefault();
    return;
  }
});