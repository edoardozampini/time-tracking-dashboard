const buttons = [
  document.getElementById('daily'),
  document.getElementById('weekly'),
  document.getElementById('monthly'),
];
const defaultButton = buttons.find(btn => btn.id === 'daily');

const cardHours = document.getElementsByClassName('card__hours');
const cardPrevious = document.getElementsByClassName('card__previous');

let timeData = null;

fetch('/data.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error uploading file');
    }
    return response.json();
  })
  .then((data) => {
    timeData = data;
    updateCardData('daily');
    setActiveButton(defaultButton);
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        setActiveButton(button);
        const timeframe = button.id;
        updateCardData(timeframe);
      });
    });
  });

function updateCardData(timeframe) {
  const previousLabels = {
    daily: 'Yesterday',
    weekly: 'Last Week',
    monthly: 'Last Month',
  };

  const previousLabel = previousLabels[timeframe];

  for (let i = 0; i < cardHours.length; i++) {
    const currentHours = timeData[i].timeframes[timeframe].current;
    const previousHours = timeData[i].timeframes[timeframe].previous;

    cardHours[i].textContent = currentHours === 1 ? `${currentHours}hr` : `${currentHours}hrs`;
    cardPrevious[i].textContent = previousHours === 1 ? `${previousLabel} - ${previousHours}hr` : `${previousLabel} - ${previousHours}hrs`;
  }
}


function setActiveButton(activeBtn) {
  buttons.forEach((btn) =>
    btn.classList.remove('timeframe-btn--active')
  );
  activeBtn.classList.add('timeframe-btn--active');
}