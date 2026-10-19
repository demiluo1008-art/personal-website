const header=document.querySelector('#site-header');
const menuButton=document.querySelector('#menu-toggle');
const navigation=document.querySelector('#site-nav');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>20),{passive:true});
menuButton?.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.querySelector('.sr-only').textContent=open?'Close menu':'Open menu';});
navigation?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');}));

const journey={
  practice:{label:'10 years of practice',title:'Consistency became a personal brand.',text:'A long-term practice taught me discipline, visual storytelling and how visible progress can build trust.',image:'assets/08-photo.jpg',alt:'Yoga practice collage'},
  training:{label:'200-hour teacher training',title:'From practitioner to teacher.',text:'Professional Hatha yoga training in the Netherlands created a strong foundation for safe, confident and inclusive teaching.',image:'assets/09-photo.jpg',alt:'Yoga teacher training in the Netherlands'},
  teaching:{label:'Online and in-person teaching',title:'Communication in every format.',text:'Teaching strengthened my ability to present clearly, adapt to different audiences and create meaningful shared experiences.',image:'assets/04-photo.jpg',alt:'Shihui teaching an in-person yoga class'},
  community:{label:'Community building',title:'Connection became the work.',text:'Sharing yoga across countries and online developed practical skills in trust, content creation and audience engagement.',image:'assets/07-photo.jpg',alt:'International outdoor yoga community'}
};
const tabs=[...document.querySelectorAll('[data-stage]')];
const journeyImage=document.querySelector('#journey-image');
const journeyPanel=document.querySelector('#journey-panel');
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectStage(tab));tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:event.key==='ArrowRight'?(index+1)%tabs.length:(index-1+tabs.length)%tabs.length;tabs[next].focus();selectStage(tabs[next]);});});
function selectStage(tab){const data=journey[tab.dataset.stage];if(!data)return;tabs.forEach(item=>{const active=item===tab;item.classList.toggle('active',active);item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;});document.querySelector('#journey-label').textContent=data.label;document.querySelector('#journey-title').textContent=data.title;document.querySelector('#journey-text').textContent=data.text;journeyPanel.setAttribute('aria-labelledby',tab.id);journeyImage.src=data.image;journeyImage.alt=data.alt;}

const cases={
  yoga:{label:'Yoga instruction',title:'Mindful Flow',overview:'A flexible class architecture combining Vinyasa, grounding Hatha and breathwork for modern students and teams.',points:['Breath-synchronised sequences for varied experience levels','Posture resets designed for desk-based work','Accessible alignment with an emphasis on sustainable practice']},
  community:{label:'Digital marketing',title:'8K+ Organic Community',overview:'An organic audience-growth project built through authentic wellness content and consistent community engagement.',points:['More than 8,000 followers grown without paid acquisition','A recognisable, warm visual and editorial voice','Practical content learning now supported by IHM marketing studies']},
  brand:{label:'Brand and web',title:'Personal Brand Platform',overview:'A responsive editorial website bringing yoga experience and emerging marketing expertise into one clear professional story.',points:['Semantic, accessible and mobile-first structure','Focused journeys for collaborators and LIA opportunities','A visual system inspired by mindful movement and Scandinavian restraint']}
};
const dialog=document.querySelector('#case-dialog');let dialogTrigger;
document.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',()=>{const item=cases[button.dataset.case];if(!item)return;dialogTrigger=button;document.querySelector('#dialog-label').textContent=item.label;document.querySelector('#dialog-title').textContent=item.title;document.querySelector('#dialog-overview').textContent=item.overview;document.querySelector('#dialog-points').replaceChildren(...item.points.map(point=>{const li=document.createElement('li');li.textContent=point;return li;}));dialog.showModal();}));
document.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
dialog?.addEventListener('close',()=>dialogTrigger?.focus());
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  if (!banner || !acceptBtn) return;

  const hasConsent = () => {
    try {
      if (localStorage.getItem('cookieConsent') === 'accepted') return true;
    } catch (e) {}
    const match = document.cookie.match(/(^| )cookieConsent=([^;]+)/);
    return match && match[2] === 'accepted';
  };

  if (hasConsent()) {
    banner.classList.add('hidden');
  }

  acceptBtn.addEventListener('click', () => {
    try {
      localStorage.setItem('cookieConsent', 'accepted');
    } catch (e) {}
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    document.cookie = `cookieConsent=accepted; expires=${expiry.toUTCString()}; path=/; SameSite=Lax`;
    banner.classList.add('hidden');
  });
});
