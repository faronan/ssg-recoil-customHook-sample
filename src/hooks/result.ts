import { useCallback } from 'react';
import useSWR from 'swr';
import { atom, useRecoilState } from 'recoil';
import { fetcher } from '../lib/fetcher';

const recordsState = atom<string[]>({
  key: 'records-state',
  default: [],
});

export const useResults = (): [string[], (records: string[]) => void] => {
  const [records, setResults] = useRecoilState(recordsState);
  return [records, useCallback((records: string[]) => setResults(records), [])];
};

export const useNewResults = (
  team: string,
  person: string,
  date: string,
): string[] => {
  const uri = `/api/getResults?team=${team}&person=${person}&date=${date}`;
  const { data } = useSWR(uri, fetcher);
  const newResult = data?.records;
  return newResult;
};
