'use strict';
const entries = window.FOOD_ENTRIES;
const grid = document.querySelector('#food-cards');
const dialog = document.querySelector('#food-dialog');
const detail = document.querySelector('#food-detail');
let lastTrigger = null;
let restoreFocus = null;

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function price(value) { return `NT$${value.toLocaleString('en-US')}`; }
function dishName(meal) { return meal.dish + (meal.portion ? `（${meal.portion}）` : ''); }
function openEntry(entry, trigger) {
  lastTrigger = trigger;
  detail.replaceChildren();
  detail.append(element('p', 'MY FOOD JOURNAL / 我的用餐筆記', 'eyebrow'));
  const title = element('h2', entry.name); title.id = 'detail-title'; detail.append(title);
  if (entry.image) {
    const image = element('img'); image.src = entry.image; image.alt = entry.imageAlt; image.className = 'detail-image'; detail.append(image);
  }
  for (const meal of entry.meals) {
    const section = element('section', undefined, 'meal-detail');
    section.append(element('h3', dishName(meal)), element('p', `用餐時價格 ${price(meal.price)}`, 'detail-price'));
    if (meal.visitedOn) { const date = element('time', `用餐日期：${meal.visitedOn}`); date.dateTime = meal.visitedOn; section.append(date); }
    section.append(element('p', '我的小心得', 'review-label'), element('blockquote', meal.review, 'detail-review'));
    detail.append(section);
  }
  detail.append(element('p', '以上為個人用餐感想。價格為用餐時紀錄，請以店家現場提供為準。', 'detail-footnote'));
  dialog.showModal();
  document.body.classList.add('dialog-open');
  document.querySelector('#close-dialog').focus();
}
function closeEntry() { restoreFocus = lastTrigger; dialog.close(); }
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  const target = restoreFocus || lastTrigger;
  restoreFocus = null;
  if (target?.isConnected) target.focus();
});
document.querySelector('#close-dialog').addEventListener('click', closeEntry);
dialog.addEventListener('cancel', event => { event.preventDefault(); closeEntry(); });

entries.forEach((entry, index) => {
  const card = element('article', undefined, `food-card palette-${index % 3}`);
  const art = element('div', undefined, 'card-art');
  if (entry.image) {
    const image = element('img'); image.src = entry.image; image.alt = entry.imageAlt; image.loading = 'lazy'; art.append(image);
  } else {
    const decorative = element('div', undefined, 'food-doodle'); decorative.setAttribute('aria-hidden', 'true');
    decorative.append(element('span', '∿', 'steam'), element('span', undefined, 'bowl'), element('span', undefined, 'chopstick first'), element('span', undefined, 'chopstick second'));
    art.append(decorative, element('span', '手帳裝飾插畫 · 非餐點實拍', 'image-note'));
  }
  art.append(element('span', `食記 ${String(index + 1).padStart(2, '0')}`, 'page-label'));
  const content = element('div', undefined, 'card-content');
  content.append(element('p', '宜大周邊 / 我的用餐紀錄', 'card-kicker'), element('h3', entry.name));
  const firstMeal = entry.meals[0];
  content.append(element('p', dishName(firstMeal), 'dish-name'), element('p', price(firstMeal.price), 'meal-price'), element('p', `「${firstMeal.review}」`, 'card-review'));
  const button = element('button', undefined, 'read-button'); button.type = 'button';
  button.setAttribute('aria-label', `閱讀${entry.name}的用餐筆記`);
  button.append(element('span', '翻開這一頁'), element('span', '↗'));
  button.addEventListener('click', () => openEntry(entry, button));
  content.append(button);card.append(art, content);grid.append(card);
});
document.querySelector('#entry-count').textContent = `${entries.length} 篇食記`;
