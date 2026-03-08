import React, { useState, useEffect, useRef } from 'react';

const VERSION = '20260301';

const PAYPAL_EMAIL = 'waltherj@web.de';
const PAYPAL_URL = `https://www.paypal.com/donate?business=${encodeURIComponent(PAYPAL_EMAIL)}&currency_code=EUR`;

const strings = {
  de: {
    help: 'Hilfe: waltherj(at)web.de',
    donation: 'Spenden',
    poweredBy: 'Bereitgestellt von getBible.net',
    copyright: '© 2026 Joachim Walther · Open Source (ISC)',
    modalTitle: 'Dieses Projekt unterstützen',
    modalText: 'Ihre Spenden helfen, diese App am Laufen zu halten. Die Beiträge werden aufgeteilt zwischen:',
    apiBenefit: 'für den Betrieb und die Wartung der API-Server, die die Bibeltexte bereitstellen.',
    devBenefit: 'für Domain-Registrierung, SSL-Zertifikat und laufende Wartung der App.',
    devLabel: 'Dem Entwickler',
    donateButton: 'Über PayPal spenden',
    close: 'Schließen',
  },
  en: {
    help: 'Help: waltherj(at)web.de',
    donation: 'Donate',
    poweredBy: 'Powered by getBible.net',
    copyright: '© 2026 Joachim Walther · Open Source (ISC)',
    modalTitle: 'Support this project',
    modalText: 'Your donations help keep this app running. Contributions are split between:',
    apiBenefit: 'for running and maintaining the API servers that provide Bible text data.',
    devBenefit: 'for domain registration, SSL certificate, and ongoing app maintenance.',
    devLabel: 'The developer',
    donateButton: 'Donate via PayPal',
    close: 'Close',
  },
} as const;

type Lang = keyof typeof strings;

function getStrings(lang: string) {
  return strings[lang as Lang] ?? strings.de;
}

interface Props {
  lang: string;
}

function HamburgerMenu({ lang }: Props) {
  const [open, setOpen] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = getStrings(lang);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <>
      <div className="hamburger-wrapper" ref={menuRef}>
        <button
          className="hamburger-button"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        {open && (
          <div className="hamburger-menu">
            <a
              className="menu-item"
              href="mailto:waltherj@web.de"
            >
              {t.help}
            </a>
            <div className="menu-item menu-item-static">
              Version {VERSION}
            </div>
            <button
              className="menu-item"
              onClick={() => { setDonationOpen(true); setOpen(false); }}
            >
              {t.donation}
            </button>
            <a
              className="menu-item"
              href="https://getbible.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.poweredBy}
            </a>
            <a
              className="menu-item menu-item-static"
              href="https://github.com/Joeatc/askthebible"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.copyright}
            </a>
          </div>
        )}
      </div>

      {donationOpen && (
        <div className="donation-overlay" onClick={() => setDonationOpen(false)}>
          <div className="donation-modal" onClick={e => e.stopPropagation()}>
            <h2>{t.modalTitle}</h2>
            <p>{t.modalText}</p>
            <ul>
              <li>
                <strong>getBible.net</strong> &mdash; {t.apiBenefit}
              </li>
              <li>
                <strong>{t.devLabel}</strong> &mdash; {t.devBenefit}
              </li>
            </ul>
            <div className="donation-actions">
              <a
                className="donate-paypal-button"
                href={PAYPAL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.donateButton}
              </a>
              <button
                className="donation-close-button"
                onClick={() => setDonationOpen(false)}
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HamburgerMenu;
