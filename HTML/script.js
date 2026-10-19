const header = document.querySelector('#site-header');
const menuButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#site-nav');
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
menuButton?.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu'; });
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navigation.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false'); }));

const journey = {
  practice: { label: '10 years of practice', title: 'Consistency became a personal brand.', text: 'A long-term practice taught me discipline, visual storytelling and how visible progress can build trust.', image: 'assets/08-photo.jpg', alt: 'Yoga practice collage' },
  training: { label: '200-hour teacher training', title: 'From practitioner to teacher.', text: 'Professional Hatha yoga training in the Netherlands created a strong foundation for safe, confident and inclusive teaching.', image: 'assets/09-photo.jpg', alt: 'Yoga teacher training in the Netherlands' },
  teaching: { label: 'Online and in-person teaching', title: 'Communication in every format.', text: 'Teaching strengthened my ability to present clearly, adapt to different audiences and create meaningful shared experiences.', image: 'assets/04-photo.jpg', alt: 'Shihui teaching an in-person yoga class' },
  community: { label: 'Community building', title: 'Connection became the work.', text: 'Sharing yoga across countries and online developed practical skills in trust, content creation and audience engagement.', image: 'assets/07-photo.jpg', alt: 'International outdoor yoga community' }
};
const tabs = [...document.querySelectorAll('[data-stage]')];
const journeyImage = document.querySelector('#journey-image');
const journeyPanel = document.querySelector('#journey-panel');
tabs.forEach((tab, index) => { tab.addEventListener('click', () => selectStage(tab)); tab.addEventListener('keydown', event => { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return; event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length; tabs[next].focus(); selectStage(tabs[next]); }); });
function selectStage(tab) { const data = journey[tab.dataset.stage]; if (!data) return; tabs.forEach(item => { const active = item === tab; item.classList.toggle('active', active); item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; }); document.querySelector('#journey-label').textContent = data.label; document.querySelector('#journey-title').textContent = data.title; document.querySelector('#journey-text').textContent = data.text; journeyPanel.setAttribute('aria-labelledby', tab.id); journeyImage.src = data.image; journeyImage.alt = data.alt; }

const cases = {
  yoga: {
    label: 'Yoga & Personal Branding',
    title: 'Mindful Brand & Organic Growth',
    overview: '10 years of yoga practice shaped into certified teaching (200h+), international workshops across 4 countries (Sweden, Netherlands, Spain, Portugal), and an engaged organic community of 8,000+ followers built through authentic storytelling.',
    points: [
      'Certified yoga instructor (200h+) leading dynamic flow, alignment, and breathwork',
      'Organic online community of 8,000+ followers built through consistent visual content and reels',
      'International teaching and community events across Sweden, Netherlands, Spain, and Portugal',
      'Personal branding combining mindful wellness with Scandinavian aesthetics and community trust'
    ]
  },
  marketing: {
    label: 'IHM Group Project · Digital Marketing',
    title: 'Sjuhärads Skafferi: Growth Strategy',
    overview:
      'An academic group project focused on improving regional visibility and creating clearer digital acquisition paths for Sjuhärads Skafferi.',
    points: [
      'Challenge: Limited digital awareness among relevant regional audiences.',
      'My role: Competitor research, selected parts of the SWOT and PESTEL analysis, and content journey mapping.',
      'Team contribution: Personas, objectives, channel strategy and final presentation were developed collaboratively.',
      'Method: Market research, strategic frameworks and customer journey analysis.',
      'Recommendation: Local SEO, producer-focused storytelling and seasonal content campaigns.',
      'Learning: I learned to separate assumptions from evidence and to document which recommendations were supported by research.'
    ]
  }
},
  hotel: {
    label: 'Hospitality & Leadership',
    title: 'Hotel Operations & Customer Relations',
    overview: 'Hands-on leadership experience managing hotel operations, guest satisfaction, and team communication in fast-paced international hospitality settings.',
    points: [
      'Team Leadership & Coordination: Mentoring team members, managing front-desk operations, and ensuring high standards',
      'Customer Relationship Excellence: Proactive communication, dispute resolution, and memorable guest experiences',
      'Cross-Cultural Communication: Fluency in English and Chinese with professional Swedish communication',
      'Operational Problem Solving: Handling high-occupancy coordination, VIP arrangements, and event logistics',
      'Transferable Marketing Value: Deep understanding of customer psychology, retention, and service-driven branding'
    ]
  }
};
const dialog = document.querySelector('#case-dialog'); let dialogTrigger;
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => { const item = cases[button.dataset.case]; if (!item) return; dialogTrigger = button; document.querySelector('#dialog-label').textContent = item.label; document.querySelector('#dialog-title').textContent = item.title; document.querySelector('#dialog-overview').textContent = item.overview; document.querySelector('#dialog-points').replaceChildren(...item.points.map(point => { const li = document.createElement('li'); li.textContent = point; return li; })); dialog.showModal(); }));
document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => dialogTrigger?.focus());
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');
  const openSettingsBtn = document.getElementById('open-cookie-settings');
  if (!banner) return;

  const storageKey = 'shihui_cookie_consent_v1';

  const hasConsent = () => {
    try {
      const consent = localStorage.getItem(storageKey);
      if (consent === 'accepted' || consent === 'essential') return true;
    } catch (e) { }
    const match = document.cookie.match(new RegExp('(^| )' + storageKey + '=([^;]+)'));
    return match && (match[2] === 'accepted' || match[2] === 'essential');
  };

  if (hasConsent()) {
    banner.classList.add('hidden');
  } else {
    banner.classList.remove('hidden');
    banner.classList.remove('closing');
  }

  const setConsent = (type) => {
    try {
      localStorage.setItem(storageKey, type);
    } catch (e) { }
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    document.cookie = `${storageKey}=${type}; expires=${expiry.toUTCString()}; path=/; SameSite=Lax`;
    banner.classList.add('closing');
    setTimeout(() => {
      banner.classList.add('hidden');
    }, 300);
  };

  acceptBtn?.addEventListener('click', () => setConsent('accepted'));
  declineBtn?.addEventListener('click', () => setConsent('essential'));

  openSettingsBtn?.addEventListener('click', () => {
    banner.classList.remove('hidden');
    banner.classList.remove('closing');
  });
});
