(function () {
  'use strict';
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  const { rooms, property } = window.soraCatalogue;
  const roomFor = slug => rooms.find(room => room.slug === slug);
  const money = value => new Intl.NumberFormat('en-IE', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(value);
  const today = () => {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: property.timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const get = type => parts.find(part => part.type === type).value;
    return `${get('year')}-${get('month')}-${get('day')}`;
  };
  const isDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  const addDays = (date, days) => new Date(Date.parse(date) + days * 86400000).toISOString().slice(0, 10);
  const nightsBetween = (start, end) => isDate(start) && isDate(end) ? Math.round((Date.parse(end) - Date.parse(start)) / 86400000) : 0;
  const dateLabel = value => isDate(value) ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(value)) : 'Choose dates';
  const animate = (element, frames, duration = 450) => { if (!mq.matches && element?.animate) element.animate(frames, { duration, easing: 'cubic-bezier(.22,.61,.36,1)' }); };
  const params = new URLSearchParams(location.search);
  const pageUrl = name => document.body.dataset.urlMode === 'clean' ? '/' + name : name + '.html';
  const focusable = root => [...root.querySelectorAll('a[href],button:not(:disabled),input,select,textarea,[tabindex="0"]')].filter(el => !el.inert && el.getClientRects().length);
  let overlay = null;
  let returnFocus = null;
  let inertElements = [];
  const openOverlay = (element, focus, allowed = []) => {
    returnFocus = document.activeElement;
    overlay = element;
    let child = element;
    while (child.parentElement && child.parentElement !== document.documentElement) {
      [...child.parentElement.children].filter(el => el !== child && !allowed.includes(el) && !el.inert && el.tagName !== 'SCRIPT').forEach(el => { el.inert = true; inertElements.push(el); });
      child = child.parentElement;
    }
    document.body.style.overflow = 'hidden';
    focus.focus({ preventScroll: true });
  };
  const closeOverlay = () => {
    inertElements.forEach(el => { el.inert = false; });
    inertElements = [];
    overlay = null;
    document.body.style.overflow = '';
    returnFocus?.focus({ preventScroll: true });
  };
  document.addEventListener('keydown', event => {
    if (!overlay || event.key !== 'Tab') return;
    const controls = focusable(overlay);
    if (overlay.id === 'mobile-menu') controls.push(document.querySelector('.nav-toggle'));
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement))) { event.preventDefault(); first?.focus(); }
  });
  const header = document.querySelector('.site-header');
  const updateHeader = () => header?.classList.toggle('is-scrolled', scrollY > 40);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    menu.inert = true;
    const setMenu = open => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.inert = !open;
      menu.classList.toggle('is-open', open);
      header.classList.toggle('is-menu-open', open);
      if (open) openOverlay(menu, menu.querySelector('a'), [header]); else closeOverlay();
    };
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });
    matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches && menu.classList.contains('is-open')) setMenu(false); });
  }
  const reveals = document.querySelectorAll('.reveal');
  if (mq.matches || !('IntersectionObserver' in window)) reveals.forEach(el => el.classList.add('is-in'));
  else {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-in'); observer.unobserve(entry.target); }
    }), { rootMargin: '0px 0px -4% 0px', threshold: 0.05 });
    reveals.forEach(el => observer.observe(el));
    mq.addEventListener('change', event => { if (event.matches) { reveals.forEach(el => el.classList.add('is-in')); observer.disconnect(); } });
  }
  document.querySelectorAll('.accordion').forEach(accordion => {
    const triggers = [...accordion.querySelectorAll('.accordion__trigger')];
    triggers.forEach(trigger => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (!panel) return;
      panel.inert = trigger.getAttribute('aria-expanded') !== 'true';
      trigger.addEventListener('click', () => {
        const open = trigger.getAttribute('aria-expanded') !== 'true';
        triggers.forEach(other => {
          const content = document.getElementById(other.getAttribute('aria-controls'));
          const expanded = open && trigger === other;
          other.setAttribute('aria-expanded', String(expanded));
          if (content) { content.inert = !expanded; content.style.height = expanded ? content.scrollHeight + 'px' : '0px'; }
        });
      });
      new ResizeObserver(() => { if (!panel.inert) panel.style.height = panel.scrollHeight + 'px'; }).observe(panel.firstElementChild || panel);
    });
  });
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const image = lightbox.querySelector('.lightbox__figure img');
    const caption = lightbox.querySelector('.lightbox__caption');
    let items = [];
    let index = 0;
    lightbox.inert = true;
    const show = next => {
      index = (next + items.length) % items.length;
      const item = items[index];
      image.src = item.getAttribute('data-full') || item.querySelector('img').src;
      image.alt = item.getAttribute('data-alt') || item.querySelector('img').alt;
      caption.children[0].textContent = item.getAttribute('data-caption') || image.alt;
      caption.children[1].textContent = item.getAttribute('data-meta') || '';
      lightbox.querySelector('.lightbox__counter').textContent = `${index + 1} / ${items.length}`;
      animate(image, [{ opacity: 0.15, transform: 'translateX(8px)' }, { opacity: 1, transform: 'none' }]);
    };
    document.querySelectorAll('[data-lightbox]').forEach(trigger => trigger.addEventListener('click', () => {
      items = [...document.querySelectorAll('[data-lightbox]')].filter(item => item.dataset.lightbox === trigger.dataset.lightbox && !item.hidden);
      show(items.indexOf(trigger));
      lightbox.inert = false;
      lightbox.setAttribute('aria-hidden', 'false');
      lightbox.classList.add('is-open');
      openOverlay(lightbox, lightbox.querySelector('.lightbox__close'));
    }));
    const close = () => { lightbox.classList.remove('is-open'); closeOverlay(); lightbox.inert = true; lightbox.setAttribute('aria-hidden', 'true'); };
    lightbox.querySelector('.lightbox__close').addEventListener('click', close);
    lightbox.querySelector('.lightbox__nav--prev').addEventListener('click', () => show(index - 1));
    lightbox.querySelector('.lightbox__nav--next').addEventListener('click', () => show(index + 1));
    lightbox.addEventListener('click', event => { if (event.target === lightbox) close(); });
    document.addEventListener('keydown', event => {
      if (!lightbox.classList.contains('is-open')) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); show(index + (event.key === 'ArrowLeft' ? -1 : 1)); }
    });
    let touchStart = null;
    image.addEventListener('touchstart', event => { touchStart = [event.touches[0].clientX, event.touches[0].clientY]; }, { passive: true });
    image.addEventListener('touchend', event => {
      if (!touchStart) return;
      const dx = event.changedTouches[0].clientX - touchStart[0];
      const dy = event.changedTouches[0].clientY - touchStart[1];
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
      touchStart = null;
    }, { passive: true });
  }
  document.querySelectorAll('.filters').forEach(bar => {
    const items = [...document.querySelectorAll('[data-category]')];
    bar.addEventListener('click', event => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      const positions = new Map(items.filter(item => !item.hidden).map(item => [item, item.getBoundingClientRect()]));
      document.querySelector('.page-gallery .gallery-grid')?.classList.toggle('is-filtered', button.dataset.filter !== 'all');
      bar.querySelectorAll('[data-filter]').forEach(control => control.setAttribute('aria-pressed', String(control === button)));
      items.forEach(item => { item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter; });
      items.filter(item => !item.hidden).forEach(item => {
        const before = positions.get(item);
        const after = item.getBoundingClientRect();
        animate(item, before ? [{ transform: `translate(${before.left - after.left}px,${before.top - after.top}px)`, opacity: 0.65 }, { transform: 'none', opacity: 1 }] : [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }]);
      });
      const status = document.querySelector('[data-gallery-status]');
      if (status) status.textContent = `${items.filter(item => !item.hidden).length} images shown`;
    });
  });
  document.querySelectorAll('form[action="book.html"], form[action="/book"]').forEach(form => {
    const arrival = form.querySelector('[name="arrival"]');
    const departure = form.querySelector('[name="departure"]');
    if (!arrival || !departure) return;
    arrival.min = today(); arrival.value = today(); departure.value = addDays(today(), 3);
    const sync = () => { departure.min = addDays(arrival.value || today(), 1); departure.max = addDays(arrival.value || today(), property.maxStayNights); };
    sync();
    arrival.addEventListener('change', () => { if (departure.value <= arrival.value || nightsBetween(arrival.value, departure.value) > property.maxStayNights) departure.value = addDays(arrival.value || today(), 3); sync(); });
  });
  const booking = document.querySelector('[data-booking]');
  if (booking) {
    const arrival = booking.querySelector('[data-field="checkin"]');
    const departure = booking.querySelector('[data-field="checkout"]');
    const guests = booking.querySelector('[data-field="guests"]');
    const roomError = booking.querySelector('[data-room-error]');
    const state = { step: 1, room: roomFor(params.get('room')) ? params.get('room') : null };
    arrival.value = isDate(params.get('arrival')) ? params.get('arrival') : today();
    departure.value = isDate(params.get('departure')) ? params.get('departure') : addDays(arrival.value, 3);
    const count = parseInt(params.get('guests'), 10);
    guests.value = [1, 2, 3].includes(count) ? String(count) : '2';
    if (state.room && Number(guests.value) > roomFor(state.room).maxGuests) state.room = null;
    arrival.min = today();
    const update = (selector, value) => document.querySelectorAll(selector).forEach(el => { el.textContent = value; });
    const summary = () => {
      const room = roomFor(state.room);
      const nights = nightsBetween(arrival.value, departure.value);
      update('[data-summary-room]', room?.name || 'Choose a room');
      update('[data-summary-in]', dateLabel(arrival.value)); update('[data-summary-out]', dateLabel(departure.value)); update('[data-summary-guests]', guests.value);
      update('[data-nights]', nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'}` : 'Choose dates');
      update('[data-rate]', room ? `${money(room.rate)} / night` : 'Choose a room');
      update('[data-total]', room && nights > 0 && nights <= property.maxStayNights ? money(room.rate * nights) : '—');
      update('[data-summary-compact]', room && nights > 0 && nights <= property.maxStayNights ? `${room.name} · ${money(room.rate * nights)}` : 'Choose your room');
      departure.min = addDays(isDate(arrival.value) ? arrival.value : today(), 1); departure.max = addDays(isDate(arrival.value) ? arrival.value : today(), property.maxStayNights);
      booking.querySelectorAll('.room-option').forEach(option => {
        const info = roomFor(option.dataset.room);
        const disabled = Number(guests.value) > info.maxGuests;
        option.disabled = disabled; option.setAttribute('aria-pressed', String(!disabled && state.room === info.slug)); option.classList.toggle('is-selected', !disabled && state.room === info.slug);
        option.querySelector('[data-room-status]').textContent = disabled ? `Sleeps ${info.maxGuests} · choose fewer guests` : 'View room';
      });
    };
    const fieldError = (field, message) => {
      const error = booking.querySelector(`[data-error="${field.dataset.field}"]`);
      field.setAttribute('aria-invalid', String(Boolean(message))); field.closest('.field--inline').classList.toggle('has-error', Boolean(message)); error.textContent = message;
      return !message;
    };
    const validDates = (focus = true) => {
      const nights = nightsBetween(arrival.value, departure.value);
      const a = fieldError(arrival, !isDate(arrival.value) ? 'Choose an arrival date.' : arrival.value < today() ? 'Arrival must be today or later.' : '');
      const d = fieldError(departure, !isDate(departure.value) ? 'Choose a departure date.' : nights < 1 ? 'Departure must be after arrival.' : nights > property.maxStayNights ? 'Stays are limited to 14 nights.' : '');
      const g = fieldError(guests, ![1, 2, 3].includes(Number(guests.value)) ? 'Choose between one and three guests.' : '');
      if (focus && !(a && d && g)) (!a ? arrival : !d ? departure : guests).focus();
      return a && d && g;
    };
    const setStep = (step, focus = true) => {
      state.step = step; booking.dataset.currentStep = step;
      booking.querySelectorAll('.step-panel').forEach(panel => { panel.classList.toggle('is-active', Number(panel.dataset.step) === step); });
      booking.querySelectorAll('.progress__step').forEach(item => {
        const number = Number(item.dataset.step);
        item.classList.toggle('is-current', number === step); item.classList.toggle('is-done', number < step);
        if (number === step) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
      });
      summary();
      if (focus) { const heading = booking.querySelector('.is-active h2'); heading.tabIndex = -1; heading.focus({ preventScroll: true }); heading.scrollIntoView({ behavior: mq.matches ? 'instant' : 'smooth', block: 'start' }); }
    };
    [arrival, departure, guests].forEach(field => field.addEventListener('input', () => { if (state.room && Number(guests.value) > roomFor(state.room).maxGuests) state.room = null; summary(); if (field.getAttribute('aria-invalid') === 'true') validDates(false); }));
    booking.querySelectorAll('.room-option').forEach(option => option.addEventListener('click', () => { state.room = option.dataset.room; roomError.textContent = ''; summary(); animate(booking.querySelector('[data-total]'), [{ opacity: 0.25 }, { opacity: 1 }], 250); }));
    const validRoom = () => { const room = roomFor(state.room); const valid = room && Number(guests.value) <= room.maxGuests; roomError.textContent = valid ? '' : 'Choose a room that fits your guests.'; if (!valid) booking.querySelector('.room-option:not(:disabled)')?.focus(); return valid; };
    booking.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => { if (!validDates()) { if (state.step !== 1) setStep(1); return; } if (state.step >= 2 && !validRoom()) return; setStep(Math.min(4, state.step + 1)); }));
    booking.querySelectorAll('[data-prev]').forEach(button => button.addEventListener('click', () => setStep(Math.max(1, state.step - 1))));
    booking.querySelector('[data-confirm]').addEventListener('click', () => {
      if (!validDates()) { setStep(1); return; } if (!validRoom()) { setStep(2); return; }
      const query = new URLSearchParams({ code: 'SORA-' + Math.random().toString(36).slice(2, 8).toUpperCase(), room: state.room, in: arrival.value, out: departure.value, guests: guests.value });
      location.href = pageUrl('confirmation') + '?' + query.toString();
    });
    const disclosure = booking.querySelector('.summary-disclosure');
    const compact = matchMedia('(max-width: 1080px)');
    disclosure.open = !compact.matches;
    compact.addEventListener('change', event => { disclosure.open = !event.matches; });
    setStep(1, false);
  }
  const confirmation = document.querySelector('[data-confirmation]');
  if (confirmation) {
    const room = roomFor(params.get('room'));
    const nights = nightsBetween(params.get('in'), params.get('out'));
    const guests = Number(params.get('guests'));
    const valid = room && isDate(params.get('in')) && params.get('in') >= today() && nights >= 1 && nights <= property.maxStayNights && Number.isInteger(guests) && guests >= 1 && guests <= room.maxGuests;
    const values = valid ? { code: /^SORA-[A-Z0-9]{6}$/.test(params.get('code')) ? params.get('code') : 'SORA-STAY', room: room.name, in: dateLabel(params.get('in')), out: dateLabel(params.get('out')), nights, guests, rate: money(room.rate), total: money(room.rate * nights) } : { code: 'No stay selected', room: 'Choose a room', in: '—', out: '—', nights: '—', guests: '—', rate: '—', total: '—' };
    Object.entries(values).forEach(([key, value]) => { confirmation.querySelector(`[data-c="${key}"]`).textContent = value; });
    if (!valid) { confirmation.querySelector('h1').textContent = 'Choose your dates and room'; confirmation.querySelector('.lede').textContent = 'Choose a room and dates to see your stay details. Online reservations are not yet available.'; confirmation.querySelector('[data-confirmation-note]').textContent = 'No stay has been selected. Explore the rooms to plan your visit.'; }
  }
  const contact = document.querySelector('[data-contact-form]');
  const contactFields = contact?.querySelector('[data-contact-fields]');
  if (contactFields) contactFields.disabled = false;
  if (contact) contact.addEventListener('submit', event => {
    event.preventDefault(); let firstInvalid = null;
    ['name', 'message'].forEach(name => { const field = contact.elements[name]; const invalid = !field.value.trim(); field.closest('.field--inline').classList.toggle('has-error', invalid); field.setAttribute('aria-invalid', String(invalid)); if (invalid && !firstInvalid) firstInvalid = field; });
    if (firstInvalid) { firstInvalid.focus(); return; }
    contact.hidden = true; const success = document.querySelector('[data-contact-success]'); success.hidden = false; success.tabIndex = -1; success.focus(); animate(success, [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }]);
  });
  document.querySelectorAll('[data-compare-guests]').forEach(select => select.addEventListener('change', () => {
    const minimum = Number(select.value);
    document.querySelectorAll('[data-compare-room]').forEach(row => { row.hidden = roomFor(row.dataset.compareRoom).maxGuests < minimum; });
    document.querySelector('[data-compare-status]').textContent = `${rooms.filter(room => room.maxGuests >= minimum).length} room types fit ${minimum} ${minimum === 1 ? 'guest' : 'guests'}`;
  }));
  const chapterLinks = [...document.querySelectorAll('.chapter-nav a')];
  if (chapterLinks.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) chapterLinks.forEach(link => { if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); }), { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    chapterLinks.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
  }
})();
