'use strict';

const url = 'https://mate-academy.github.io/'
            + 'phone-catalogue-static/api/phones.json';

function getPhones() {
  return fetch(url)
    .then(response => response.json());
};

function getPhonesDetail(phoneArray) {
  const ul = document.createElement('ul');

  for (const phone of phoneArray) {
    const li = document.createElement('li');

    li.textContent = phone.name;
    ul.append(li);

    li.addEventListener('click', () => {
      showPhoneDetails(phone);
    });

    li.addEventListener('mouseover', (e) => {
      e.target.style.color = '#ff0000';
      e.target.style.cursor = 'pointer';
    });

    li.addEventListener('mouseout', (e) => {
      e.target.style.color = '';
    });
  }

  document.body.append(ul);
}

function showPhoneDetails(phone) {
  const previousDivs = [...document.querySelectorAll('.active')];

  for (const el of previousDivs) {
    el.remove();
  }

  const div = document.createElement('div');

  div.classList.add('active');
  div.innerText = phone.snippet;
  document.body.append(div);
}

function logError(error) {
  setTimeout(() => {
    throw new Error(`Can't recieve data from server`, error);
  }, 1000);
}

getPhones()
  .then(getPhonesDetail)
  .catch(logError);
