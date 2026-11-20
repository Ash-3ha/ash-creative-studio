/**
 * ASH Creative Studio — Production Google Tag Manager dataLayer Architecture
 *
 * Prepared for:
 * - Google Analytics 4 (GA4 recommended & custom events)
 * - Google Ads Conversion Tracking (Lead forms, Click-to-call, Chat)
 * - Meta Pixel (Lead, Contact, ViewContent, Schedule via GTM triggers)
 */

/**
 * Universal safe dataLayer pusher with debugging support
 */
export function pushDataLayer(payload) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  // Helpful console logging for local testing & preview verification
  if (
    typeof window !== 'undefined' &&
    (window.location.search.includes('gtm_debug=1') ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1')
  ) {
    console.log(`[GTM dataLayer: ${payload.event}]`, payload);
  }
}

/**
 * Generic event tracker
 */
export function trackEvent(name, params = {}) {
  pushDataLayer({
    event: name,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    page_title: typeof document !== 'undefined' ? document.title : '',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    ...params,
  });
}

/**
 * 1. Form Submission (Google Ads Lead conversion / Meta Lead)
 */
export function trackContactFormSubmit(params = {}) {
  trackEvent('contact_form_submit', {
    form_id: params.form_id || 'contact_form',
    form_name: 'contact',
    service_requested: params.service || params.service_requested || 'Not specified',
    budget_range: params.budget || params.budget_range || 'Not specified',
    target_timeline: params.timeline || params.target_timeline || '',
    conversion_type: 'lead_inquiry',
    ...params,
  });
}

/**
 * 2. WhatsApp Click (High-intent chat conversion / Meta Contact)
 */
export function trackWhatsAppClick(params = {}) {
  trackEvent('whatsapp_click', {
    cta_location: params.cta_location || 'unknown',
    button_text: params.button_text || 'WhatsApp',
    target_url: params.target_url || params.element_href || '',
    conversion_type: 'direct_chat',
    ...params,
  });
}

/**
 * 3. Telephone Click (Click-to-Call / Google Ads Call Conversion)
 */
export function trackPhoneClick(params = {}) {
  trackEvent('phone_click', {
    cta_location: params.cta_location || 'unknown',
    phone_number: params.phone_number || params.element_text || '',
    target_url: params.target_url || params.element_href || '',
    conversion_type: 'click_to_call',
    ...params,
  });
}

/**
 * 4. Direct Email Click (Email conversion / Meta Contact)
 */
export function trackEmailClick(params = {}) {
  trackEvent('email_click', {
    cta_location: params.cta_location || 'unknown',
    email_address: params.email_address || params.element_text || '',
    target_url: params.target_url || params.element_href || '',
    conversion_type: 'direct_email',
    ...params,
  });
}

/**
 * 5. Book / Schedule Discovery Call Click (GA4 schedule / conversion)
 */
export function trackBookCallClick(params = {}) {
  trackEvent('book_call_click', {
    cta_location: params.cta_location || 'unknown',
    button_text: params.button_text || params.element_text || 'Schedule Call',
    target_url: params.target_url || params.element_href || '/contact/',
    conversion_type: 'appointment_intent',
    ...params,
  });
}

/**
 * 6. Primary Action CTA Click (Hero exploration, portfolio CTA)
 */
export function trackPrimaryCTAClick(params = {}) {
  trackEvent('primary_cta_click', {
    cta_location: params.cta_location || 'unknown',
    button_text: params.button_text || params.element_text || 'Explore',
    target_url: params.target_url || params.element_href || '',
    ...params,
  });
}

/**
 * Helper to determine CTA placement context in DOM
 */
function inferCtaLocation(el) {
  if (el.dataset.trackLocation) return el.dataset.trackLocation;
  if (el.closest('.whatsapp-floating-wrap')) return 'floating_badge';
  if (el.closest('header.site-header')) return 'site_header';
  if (el.closest('.mobile-menu')) return 'mobile_drawer_menu';
  if (el.closest('footer')) return 'site_footer';
  if (el.closest('.hero')) return 'hero_section';
  if (el.closest('#contact') || el.closest('.contact-section')) return 'home_contact_section';
  if (el.closest('.direct-channels-card')) return 'contact_page_channels_card';
  if (el.closest('.form-success')) return 'form_success_card';
  if (el.closest('.page-header')) return 'page_header';
  return 'page_body';
}

/**
 * Global click delegation for all tracked elements
 */
if (typeof document !== 'undefined') {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target) return;

    // Check for explicit data-track element
    const trackEl = target.closest('[data-track]');
    if (trackEl) {
      const eventName = trackEl.getAttribute('data-track');
      const location = inferCtaLocation(trackEl);
      const text = (trackEl.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60);
      const href = trackEl.getAttribute('href') || undefined;

      const baseParams = {
        cta_location: location,
        button_text: text,
        target_url: href,
        element_href: href,
        element_text: text,
      };

      const handlerMap = {
        contact_form_submit: trackContactFormSubmit,
        whatsapp_click: trackWhatsAppClick,
        phone_click: trackPhoneClick,
        email_click: trackEmailClick,
        book_call_click: trackBookCallClick,
        primary_cta_click: trackPrimaryCTAClick,
      };

      if (handlerMap[eventName]) {
        handlerMap[eventName](baseParams);
      } else {
        trackEvent(eventName, baseParams);
      }
      return;
    }

    // Fallback: Check if clicked link is an outbound contact protocol without explicit data-track
    const anchor = target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    const text = (anchor.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60);
    const location = inferCtaLocation(anchor);

    if (href.startsWith('mailto:')) {
      trackEmailClick({
        cta_location: location,
        email_address: href.replace('mailto:', '').split('?')[0],
        button_text: text,
        target_url: href,
      });
    } else if (href.startsWith('tel:')) {
      trackPhoneClick({
        cta_location: location,
        phone_number: href.replace('tel:', ''),
        button_text: text,
        target_url: href,
      });
    } else if (href.includes('wa.me/') || href.includes('whatsapp.com/send')) {
      trackWhatsAppClick({
        cta_location: location,
        button_text: text,
        target_url: href,
      });
    }
  });
}
