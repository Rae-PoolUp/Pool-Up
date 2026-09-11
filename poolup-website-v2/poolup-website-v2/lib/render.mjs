/**
 * Single presentation source for Next.js and the dependency-free static preview.
 * Content is authored locally in content/pages.mjs, never taken from form input.
 * Every text value is HTML-escaped before rendering.
 */
import content from '../content/pages.mjs';
import site from '../config/site.mjs';

export { content, site };
export const pageSlugs = Object.keys(content.pages);
export function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
const e = escapeHTML;
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export function makeContext(slug = 'home', mode = 'next', basePath = '') {
  const base = basePath.replace(/\/$/, '');
  const root = mode === 'static' ? (slug === 'home' ? './' : '../') : `${base}/`;
  return {
    slug, mode,
    asset: (name) => `${root}assets/${name}`,
    href: (target = 'home', anchor = '') => {
      const path = mode === 'static'
        ? `${root}${target === 'home' ? '' : `${target}/`}index.html`
        : `${base}/${target === 'home' ? '' : `${target}/`}`;
      return `${path}${anchor ? `#${anchor}` : ''}`;
    }
  };
}
const iconPaths = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h3"/>',
  shield: '<path d="m12 3 8 3v5c0 5-8 10-8 10S4 16 4 11V6Z"/><path d="m8 12 3 3 5-6"/>',
  people: '<circle cx="9" cy="7" r="3"/><path d="M3 20v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2"/>',
  car: '<path d="m4 9 2-5h12l2 5M3 9h18v9H3ZM5 18v2M19 18v2M6 13h2M16 13h2"/>',
  building: '<path d="M5 21V3h14v18M3 21h18M9 7h1M14 7h1M9 11h1M14 11h1M10 21v-5h4v5"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  route: '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h7a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>'
};
function icon(name) {
  return `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.route}</svg>`;
}
function button(ctx, text, target, variant = 'primary', anchor = '', arrow = true) {
  return `<a class="button button-${variant}" href="${e(ctx.href(target, anchor))}">${e(text)}${arrow ? icon('arrow') : ''}</a>`;
}
function brand(ctx) {
  return `<a class="brand" href="${e(ctx.href())}" aria-label="Pool Up home"><span class="brand-dot" aria-hidden="true"></span>Pool<span>Up</span></a>`;
}
const nav = [
 ['About Us','about-us'],['Our Services','our-services'],['Find a Ride','find-a-ride'],
 ['Drive With Us','drive-with-us'],['How It Works','how-it-works'],['Safety','safety'],['Community Impact','community-impact']
];
const moreNav = [
 ['Partners','partners'],['Employers','employers'],['Foundations and Charities','foundations'],
 ['Vehicle Network','vehicle-network'],['Pricing and Ride Credit','pricing'],['Accessibility','accessibility'],
 ['Cape Town Pilot','cape-town-pilot'],['FAQs','faqs'],['Contact Us','contact-us'],['Legal and Policies','legal']
];
function navLinks(items, ctx) {
  return items.map(([label,slug]) => `<a href="${e(ctx.href(slug))}"${ctx.slug === slug ? ' aria-current="page"' : ''}>${e(label)}</a>`).join('');
}
export function renderHeader(ctx) {
 return `<a class="skip-link" href="#main-content">Skip to content</a>
 ${site.preview ? '<div class="preview-bar"><strong>Website preview</strong><span>Registrations, verification and ride credit are not live yet.</span></div>' : ''}
 <div class="announcement"><a href="${e(ctx.href('cape-town-pilot'))}">${e(site.announcement)} <span aria-hidden="true">&#8594;</span></a></div>
 <header class="site-header"><div class="container header-inner">${brand(ctx)}
 <nav class="desktop-nav" aria-label="Main navigation">${navLinks(nav,ctx)}
 <details class="more-menu"><summary>More ${icon('chevron')}</summary><div class="more-links">${navLinks(moreNav,ctx)}</div></details></nav>
 <div class="header-actions">${button(ctx,'Apply as a Driver','drive-with-us','outline','driver-application',false)}${button(ctx,'Register My Work Route','find-a-ride','primary','registration',false)}</div>
 <details class="mobile-menu"><summary aria-label="Open navigation menu">${icon('menu')}<span>Menu</span></summary><nav class="mobile-links" aria-label="Mobile navigation">${navLinks([['Home','home'],...nav,...moreNav],ctx)}${button(ctx,'Register My Work Route','find-a-ride','primary','registration')}</nav></details>
 </div></header>`;
}
export function renderFooter(ctx) {
 const groups=[['Explore',[['About Us','about-us'],['Our Services','our-services'],['Find a Ride','find-a-ride'],['Drive With Us','drive-with-us'],['How It Works','how-it-works']]],
 ['Support',[['Safety','safety'],['Partners','partners'],['FAQs','faqs'],['Contact Us','contact-us'],['Report a Concern','report-a-concern']]],
 ['Our Network',[['Employers','employers'],['Foundations','foundations'],['Accessibility','accessibility'],['Vehicle Network','vehicle-network'],['Cape Town Pilot','cape-town-pilot']]],
 ['Legal',[['Terms of Use','terms'],['Privacy Notice','privacy'],['Refund Policy','refund-policy'],['Community Guidelines','community-guidelines'],['All Policies','legal']]]];
 return `<footer class="site-footer"><div class="container footer-main"><div class="footer-grid"><div class="footer-brand">${brand(ctx)}
 <p>${e(site.tagline)}</p><p>Pool Up connects verified commuters, drivers and approved transport partners for regular work-related journeys.</p>
 <p class="footer-disclaimer">Route availability is subject to demand, verification, driver availability and vehicle suitability.</p>
 <p class="supporting-line">${e(site.supportingLine)}</p></div>
 ${groups.map(([title,links])=>`<nav aria-label="${title}"><h2>${title}</h2>${navLinks(links,ctx)}</nav>`).join('')}</div>
 <div class="footer-bottom"><span>&copy; 2026 Pool Up. All rights reserved.</span><span>${e(site.location)}</span></div></div>
 <div class="footer-watermark" aria-hidden="true">Share the road.</div></footer>`;
}
function paragraphs(values, className = '') {
 return values.map(text=>`<p${className ? ` class="${className}"` : ''}>${e(text)}</p>`).join('');
}
function homeCards(items, icons) {
 return items.map((item,i)=>`<article class="feature-card"><div class="icon-bubble">${icon(icons[i % icons.length])}</div><h3>${e(item.title)}</h3><p>${e(item.text)}</p></article>`).join('');
}
export function renderHome(ctx) {
 const h=content.home;
 return `<main id="main-content">
 <section class="hero"><div class="container hero-grid"><div class="hero-copy">
 <h1><span>Share the road.</span><span>Share the cost.</span><span>Get to work.</span></h1>
 <div class="hero-description">${paragraphs(h.hero)}</div><div class="button-row">${button(ctx,'Find a Work Ride','find-a-ride','primary','registration')}${button(ctx,'Offer a Seat','drive-with-us','outline','driver-application',false)}</div>
 <p class="trust-line">${h.trust.map(t=>`<span>${e(t)}</span>`).join('')}</p>
 <a href="${e(ctx.href('cape-town-pilot'))}" class="pilot-status"><span aria-hidden="true"></span>Cape Town pilot &#183; Proposed work routes</a>
 </div><figure class="hero-figure"><img src="${e(ctx.asset(site.heroImage))}" width="540" height="410" alt="Two people meeting beside a car on a neighbourhood street." fetchpriority="high"/>
 <figcaption class="route-badge"><span>Proposed pilot route</span><strong>Muizenberg &#8594; Airport Industria</strong></figcaption></figure></div></section>
 <section class="section"><div class="container narrow center"><h2>${e(h.intro.title)}</h2>${h.intro.paragraphs.map(t=>`<p${t.startsWith('Pool Up was created')?' class="emphasis"':''}>${e(t)}</p>`).join('')}</div></section>
 <section class="section section-soft"><div class="container"><h2 class="center">${e(h.steps.title)}</h2><div class="cards-grid steps-grid">${homeCards(h.steps.items,['pin','search','card','shield'])}</div><div class="section-action">${button(ctx,'See How It Works','how-it-works','outline')}</div></div></section>
 <section class="section"><div class="container people-grid"><figure class="community-figure"><img src="${e(ctx.asset(site.communityImage))}" width="520" height="395" alt="Workers walking together on a Cape Town street." loading="lazy"/></figure><div><h2>${e(h.people.title)}</h2>${paragraphs(h.people.paragraphs)}</div></div></section>
 <section class="section section-soft"><div class="container"><h2 class="center">${e(h.values.title)}</h2><div class="cards-grid benefits-grid">${homeCards(h.values.items,['people','car','building','heart','route'])}</div></div></section>
 <section class="section"><div class="container narrow center"><h2>${e(h.income.title)}</h2>${paragraphs(h.income.paragraphs)}</div></section>
 <section class="section section-dark"><div class="container narrow center"><h2>${e(h.partners.title)}</h2>${paragraphs(h.partners.paragraphs)}<div class="section-action">${button(ctx,'Become a Community Partner','partners')}</div></div></section>
 <section class="section section-green"><div class="container narrow center"><h2>${e(h.pilot.title)}</h2>${h.pilot.paragraphs.map(t=>`<p${t === 'Muizenberg to Airport Industria'?' class="route-name"':''}>${e(t)}</p>`).join('')}<div class="section-action">${button(ctx,'Register My Route','find-a-ride','primary','registration')}</div></div></section>
 </main>`;
}
function renderField(label, index, kind) {
 const id=`${kind}-field-${index}`;
 const shared=`id="${id}" name="${slugify(label)}"`;
 let control;
 if(label==='Days transport is required' || label==='Days available') {
  return `<fieldset class="day-options field full-width"><legend>${e(label)}</legend>${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<label><input type="checkbox" name="days" value="${d}"/><span>${d}</span></label>`).join('')}</fieldset>`;
 }
 if(label.startsWith('I am a commuter')) {
  control=`<select ${shared}><option value="">Select your role</option>${['Commuter','Driver','Employer','Foundation','Charity','Transport provider'].map(v=>`<option value="${e(v)}">${e(v)}</option>`).join('')}</select>`;
 } else if(/accessibility|anything else|message|emergency contact/i.test(label)) {
  control=`<textarea ${shared} rows="3"></textarea>`;
 } else {
  const type=/email/i.test(label)?'email':/mobile|whatsapp/i.test(label)?'tel':/time/i.test(label)?'time':/seats/i.test(label)?'number':'text';
  control=`<input ${shared} type="${type}" ${type==='number'?'min="1" step="1"':''} autocomplete="off"/>`;
 }
 return `<div class="field${/textarea|select/.test(control)?' full-width':''}"><label for="${id}">${e(label)}</label>${control}</div>`;
}
function renderForm(kind) {
 const form=content.forms[kind];
 return `<section id="${e(form.id)}" class="form-panel"><h2>${e(form.title)}</h2>
 <div class="notice"><strong>Preview only. This form is not connected.</strong><p>Fields and submission are disabled. No registration or enquiry will be saved or sent. Do not submit identity documents, bank details or medical information here.</p></div>
 <form aria-label="${e(form.title)}" data-preview-form><fieldset class="form-fields" disabled><legend class="sr-only">${e(form.title)} fields</legend><div class="form-grid">${form.fields.map((label,i)=>renderField(label,i,kind)).join('')}</div>
 <div class="consent-group">${form.consents.map((text,i)=>`<label class="consent"><input type="checkbox" name="consent-${i}"/><span>${e(text)}</span></label>`).join('')}</div>
 <button class="button button-primary" type="button" disabled>${e(form.button)} ${icon('arrow')}</button></fieldset></form></section>`;
}
function renderBlock(block, ctx) {
 switch(block.type) {
  case 'h2': return `<h2 id="${slugify(block.text)}">${e(block.text)}</h2>`;
  case 'h3': return `<h3>${e(block.text)}</h3>`;
  case 'p': {
   let text=block.text;
   if(text.startsWith('WhatsApp: Insert')&&site.whatsapp) text=`WhatsApp: ${site.whatsapp}`;
   if(text.startsWith('Email: Insert')&&site.email) text=`Email: ${site.email}`;
   if(text.startsWith('Operating Hours: Insert')&&site.supportHours) text=`Operating Hours: ${site.supportHours}`;
   return `<p>${e(text)}</p>`;
  }
  case 'notice': return `<div class="notice"><p>${e(block.text)}</p></div>`;
  case 'values': return `<div class="pool-values">${block.items.map(v=>`<div><strong>${e(v.slice(0,1))}</strong><span>${e(v.slice(3))}</span></div>`).join('')}</div>`;
  case 'list': return `<${block.ordered?'ol':'ul'} class="${block.ordered?'numbered-list':'content-list'}">${block.items.map(t=>`<li>${e(t)}</li>`).join('')}</${block.ordered?'ol':'ul'}>`;
  case 'cta': return `<div class="inline-action">${button(ctx,block.text,block.target,'primary',block.anchor || '')}</div>`;
  case 'form': return renderForm(block.kind);
  default: throw new Error(`Unknown content block: ${block.type}`);
 }
}
function pageHero(page,ctx) {
 return `<section class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${e(ctx.href())}">Home</a><span aria-hidden="true">/</span><span>${e(page.label)}</span></nav>
 <p class="eyebrow">${e(page.label)}</p><h1>${e(page.title)}</h1></div></section>`;
}
function sidebar(page,ctx) {
 const headings=page.blocks.filter(b=>b.type==='h2');
 return `<aside class="page-sidebar">${headings.length?`<nav class="page-contents" aria-label="On this page"><h2>On this page</h2>${headings.map(b=>`<a href="#${slugify(b.text)}">${e(b.text)}</a>`).join('')}</nav>`:''}
 <div class="sidebar-card"><span class="eyebrow">One route at a time</span><h2>A community that moves together.</h2><p>Registering does not guarantee an immediate ride.</p>${button(ctx,'Explore the Pilot','cape-town-pilot','outline')}</div>
 <nav class="related-links" aria-label="Related pages"><a href="${e(ctx.href('find-a-ride'))}">Find a Ride ${icon('arrow')}</a><a href="${e(ctx.href('drive-with-us'))}">Drive With Us ${icon('arrow')}</a><a href="${e(ctx.href('contact-us'))}">Contact Us ${icon('arrow')}</a></nav></aside>`;
}
export function renderPage(slug,ctx) {
 if(slug==='home') return renderHome(ctx);
 const page=content.pages[slug];
 if(!page) throw new Error(`Page does not exist: ${slug}`);
 let body;
 if(page.kind==='faq') {
  body=`<div class="container faq-container">${page.entries.map((f,i)=>`<details class="faq-item"${i===0?' open':''}><summary>${e(f.question)}${icon('chevron')}</summary><div class="faq-answer">${paragraphs(f.answer)}</div></details>`).join('')}<div class="section-action">${button(ctx,'Contact Us','contact-us','outline')}</div></div>`;
 } else if(page.kind==='legal') {
  body=`<div class="container">${page.blocks.map(b=>renderBlock(b,ctx)).join('')}<div class="notice"><strong>Policy outlines, not approved legal terms.</strong><p>${e(content.pages.terms.blocks[2].text)}</p></div><div class="cards-grid legal-grid">${content.policies.map(p=>`<article class="feature-card"><h2>${e(p.title)}</h2><p>${e(p.text)}</p><a class="text-link" href="${e(ctx.href(p.target))}">View policy outline ${icon('arrow')}</a></article>`).join('')}</div></div>`;
 } else {
  body=`<div class="container article-layout"><article class="article-content">${page.kind==='policy'?'<div class="notice"><strong>Policy outline only.</strong><p>The supplied text describes what this policy should cover. Full, reviewed policy terms have not yet been supplied.</p></div>':''}${page.blocks.map(b=>renderBlock(b,ctx)).join('')}${page.kind==='policy'?`<div class="inline-action">${button(ctx,'All Policies','legal','outline')}</div>`:''}</article>${sidebar(page,ctx)}</div>`;
 }
 return `<main id="main-content" class="page-${e(slug)}">${pageHero(page,ctx)}<div class="page-body">${body}</div></main>`;
}
export function render404(ctx) {
 return `<main id="main-content"><section class="section"><div class="container narrow center"><p class="eyebrow">404</p><h1>This route is not here.</h1><p>The page may have moved. Return to Pool Up to find your way.</p>${button(ctx,'Back to Home','home')}</div></section></main>`;
}
export function renderDocument(slug) {
 const ctx=makeContext(slug,'static');
 const title=slug==='home'?`Pool Up | ${site.tagline}`:`${content.pages[slug].label} | Pool Up`;
 return `<!doctype html><html lang="en-ZA"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="color-scheme" content="light"/><title>${e(title)}</title><meta name="description" content="Pool Up connects verified commuters, drivers and approved transport partners travelling along similar work routes."/>${site.preview?'<meta name="robots" content="noindex,nofollow"/>':''}<link rel="icon" href="${e(ctx.asset('favicon.svg'))}" type="image/svg+xml"/><link rel="stylesheet" href="${e(ctx.asset('site.css'))}"/><script src="${e(ctx.asset('site.js'))}" defer></script></head><body>${renderHeader(ctx)}${renderPage(slug,ctx)}${renderFooter(ctx)}</body></html>`;
}
