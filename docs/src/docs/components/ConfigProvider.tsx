import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorage from 'react-use-localstorage';

const LINGJIE_LOCALE_KEY = 'LINGJIE_LOCALE_KEY'

export type ConfigContextValue = {
  locale: string;
  updateLocale: (locale: string) => void
}

export const ConfigContext = React.createContext<ConfigContextValue | null>(null);

export const useConfigConsumer = (): ConfigContextValue => {
  const configContext = useContext(ConfigContext);

  if (configContext === null) {
    throw new Error(`<ConfigProvider /> not found!`);
  }

  return configContext
};

export type ConfigProviderProps = {
  children: React.ReactNode;
};

export const ConfigProvider = ({ children }: ConfigProviderProps) => {

  const [localeFromLS, setLocaleToLS] = useLocalStorage(LINGJIE_LOCALE_KEY, 'en');
  const [locale, setLocale] = useState(localeFromLS)

  const updateLocale = useCallback((newLocale: string) => {
    // update the locale stored in local storage
    setLocaleToLS(newLocale)
    // update locale state
    setLocale(newLocale)
  }, [setLocaleToLS, setLocale])

  const { t, i18n } = useTranslation()

  const localStorageHandler = useCallback((event: StorageEvent) => {
    if (event.key === LINGJIE_LOCALE_KEY && event.newValue && event.newValue !== locale) {
      updateLocale(event.newValue)
    }
  }, [updateLocale])

  useEffect(() => {
    window.addEventListener('storage', localStorageHandler)

    return () => {
      window.removeEventListener('storage', localStorageHandler)
    }
  }, [localStorageHandler])

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])


  const configContext = useMemo<ConfigContextValue>(() => {
    return {
      locale,
      updateLocale
    }
  }, [locale, updateLocale])

  return (
    <ConfigContext.Provider value={configContext}>
      {children}
    </ConfigContext.Provider>
  );
};
