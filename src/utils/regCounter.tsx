import { useEffect, useState } from 'react';

export const useRegContent = (text: string = '') => {
  const [matches, setMatches] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const regex = /utm_content%3D([^%&]+)/g;
    const regex2 = /utm_content=([^?&]+)/g;

    const matches = text.match(regex) || [];
    const matches2 = text.match(regex2) || [];
    // Extract the captured group (the utm_content value) from each match
    const utmContentValues = matches.map((match) => {
      const matchWithoutPrefix = match.replace('utm_content', '');
      return matchWithoutPrefix.split('"')[0];
    });
    const utmContentValues2 = matches2.map((match) => {
      const matchWithoutPrefix = match.replace('utm_content', '');
      return matchWithoutPrefix.split('"')[0];
    });

    setMatches({
      'utm_content%3D': [...new Set(utmContentValues)],
      'utm_content=': [...new Set(utmContentValues2)],
    });
  }, [text]);

  return matches;
};
export const useRegCampaign = (text: string = '') => {
  const [matches, setMatches] = useState<Record<string, string[]>>({});
  useEffect(() => {
    const regex = /utm_campaign%3D([^%&]+)/g;
    const regex2 = /utm_campaign=([^?&]+)/g;
    // Find matches
    const matches = text.match(regex) || [];
    const matches2 = text.match(regex2) || [];

    // Extract the captured group (the utm_content value) from each match
    const utmContentValues = matches.map((match) => {
      const matchWithoutPrefix = match.replace('utm_campaign', '');
      return matchWithoutPrefix.split('"')[0];
    });
    const utmContentValues2 = matches2.map((match) => {
      const matchWithoutPrefix = match.replace('utm_campaign', '');
      return matchWithoutPrefix.split('"')[0];
    });

    setMatches({
      'utm_campaign%3D': [...new Set(utmContentValues)],
      'utm_campaign=': [...new Set(utmContentValues2)],
    });
  }, [text]);
  return matches;
};

export enum RegKeys {
  redirectUtm = 'redirectUtm',
  subscription = 'subsciption',
}
