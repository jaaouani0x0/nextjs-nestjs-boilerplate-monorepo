import React from 'react';
import { useRouter } from 'next/router';
import { usePersistLocaleCookie } from '../src/hooks/usePersistLocalCookie';
import {
  IconFlagFR,
  IconFlagUS
} from 'material-ui-flags';

export type LanguageSelectorProps = {
  language?: string
};

type Language = {
  code: string;
  label: string;
};

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'jp', label: 'JP' }
];

/* const select = (language: string) : JSX.Element => {
  switch(language) {
    case 'EN': return <IconFlagUS />;
    case 'FR': return <IconFlagFR />;
    case 'JP': return <IconFlagJP />;
    default:   return <IconFlagFR />;
  }
}; */

export const JPFlag = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={35} height={25} {...props}>
    <path fill="#fff" d="M0 0h900v600H0z" />
    <circle fill="#bc002d" cx={18} cy={14} r={10} />
  </svg>
);

export const LanguageSelector = ({language='en'}: LanguageSelectorProps) => {
  const router = useRouter();
  usePersistLocaleCookie();

  /** Trigger the language change by changing the locale of the Next?js router & keeping the same location */
  async function handleLanguageChange(newLocale: string) {
    if (router) {
      router.push(router.asPath, router.asPath, { locale: newLocale });
    }
  }

  return (
    <>
      {languages.map(({ code }: Language) => {
          return (
            <button key={code} onClick={() => handleLanguageChange(code)}
              style={{ backgroundColor: code === language ? '#FFF' : 'transparent',
                       boxShadow: 'none',
                       border:    0,
              }}>
              {(() => { 
                switch(code) {
                  case 'en': return <IconFlagUS />;
                  case 'fr': return <IconFlagFR />;
                  case 'jp': return <JPFlag />;
                  default:   return <IconFlagFR />;
                }
              })()}
            </button>
          );
        })
      }
    </>
  );
}
