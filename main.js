const clock = document.getElementById('clock');
const countDown = document.getElementById('count-down');
const christmasDate = new Date('08 june 2019 10:00:00 +1');

function formatTimeNumber(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return `${number}`;
}

function timeToString(hours, minutes, seconds) {
  return `${hours}:${formatTimeNumber(minutes)}:${formatTimeNumber(seconds)}`;
}

function updateClock(clock) {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const timeString = timeToString(hours, minutes, seconds);
  clock.textContent = timeString;
}

// Date’s getTime is in milliseconds, so convert to seconds without decimal places
function epochSecondsForDate(date) {
  return Math.floor(date.getTime() / 1000);
}

function formatDuration(totalSeconds) {
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const days = Math.floor(totalSeconds / (3600 * 24));
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function updateCountDown(element, endDate) {
  const currentDate = new Date();
  const currentTime = epochSecondsForDate(currentDate);
  const endTime = epochSecondsForDate(endDate);
  const secondsRemaining = endTime - currentTime;
  element.textContent = formatDuration(secondsRemaining);
}

setInterval(() => {
  updateClock(clock);
  updateCountDown(countDown, christmasDate);
}, 1000);


jQuery(($) => {
  // Lancement du compte à rebours au chargement de la page
  countdownManager.init();
});


/* EFFET SMOOTH SCOLL */

// Pour tous les liens commençant par #.
$("a[href^='#']").click(function (e) {
  let
    yPos;
  let yInitPos;
  let target = ($(`${$(this).attr('href')}:first`));

  // On annule le comportement initial au cas ou la base soit différente de la page courante.
  e.preventDefault();

  yInitPos = $(window).scrollTop();

  // On ajoute le hash dans l'url.
  window.location.hash = $(this).attr('href');

  // Comme il est possible que l'ajout du hash perturbe le défilement, on va forcer le scrollTop à son endroit inital.
  $(window).scrollTop(yInitPos);

  // On cible manuellement l'ancre pour en extraire sa position.
  // Si c'est un ID on l'obtient.
  target = ($(`${$(this).attr('href')}:first`));

  // Sinon on cherche l'ancre dans le name d'un a.
  if (target.length == 0) {
    target = ($(`a[name=${$(this).attr('href').replace(/#/gi, '')}]:first`));
  }

  // Si on a trouvé un name ou un id, on défile.
  if (target.length == 1) {
    yPos = target.offset().top; // Position de l'ancre.

    // La largeur minimale de l'écran correspond
    if (window.matchMedia('(min-width: 1000px)').matches) {
      $('html,body').animate({ scrollTop: yPos - 60 }, 1000);
    }
    // Sinon
    else {
      $('html,body').animate({ scrollTop: yPos - 60 }, 1000);
    }
    // On anime le défilement jusqu'à l'ancre.
			 // On décale de 190 pixels l'affichage pour ne pas coller le bord haut de l'affichage du navigateur et on défile en 1 seconde jusqu'à l'ancre.
  }
});

/* ~~~~~~~~~~~~~~~~~~~ */

$(document).ready(() => {
  $(window).bind('scroll', () => {
    const navHeight = $(window).height() - 81;
			 if ($(window).scrollTop() > navHeight) {
				 $('.up').addClass('fixed');
      $('#top-anchor').css({ bottom: '30px' });
			 } else {
				 $('.up').removeClass('fixed');
      $('#top-anchor').css({ bottom: '-100px' });
			 }
  });
});


let menu_close = 0; /* 0=fermé 1=ouvert */

$('.menu').click(() => {
  if (menu_close == 0) {
		      /* $('nav').css({"margin-left" : "0"}); */
		      $('#burgerone').css({ marginTop: '9px', transform: 'rotateZ(45deg)' });
		      $('#burgerthree').css({ marginTop: '9px', transform: 'rotateZ(-45deg)' });
		      $('#burgertwo').css({ opacity: '0' });
    $('nav ul').animate({ left: '0' }, 500);
    menu_close = 1;
  } else {
		      /* $('nav').css({"margin-left" : "-250px"}); */
		      $('#burgerone').css({ transform: 'rotateZ(0deg)', marginTop: '0' });
     		  $('#burgerthree').css({ transform: 'rotateZ(0deg)', marginTop: '18px' });
		      $('#burgertwo').css({ opacity: '1' });
    $('nav ul').animate({ left: '-100%' }, 500);
    menu_close = 0;
  }
});

$('nav li').click(() => {
  $('#burgerone').css({ transform: 'rotateZ(0deg)', marginTop: '0' });
  $('#burgerthree').css({ transform: 'rotateZ(0deg)', marginTop: '18px' });
  $('#burgertwo').css({ visibility: 'visible' });
  $('#burgertwo').css({ opacity: '1' });

  menu_close = 0;
});
