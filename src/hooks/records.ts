import { useCallback } from 'react';
import useSWR from 'swr';
import { atom, useRecoilState } from 'recoil';
import { fetcher } from '../lib/fetcher';

type record = {
  hoge: string;
};

const recordsState = atom<record[]>({
  key: 'records-state',
  default: [],
});

export const useRecords = (): [record[], (records: record[]) => void] => {
  const [records, setRecords] = useRecoilState(recordsState);
  return [records, useCallback((records: record[]) => setRecords(records), [])];
};

export const useNewRecords = (
  team: string,
  person: string,
  date: string,
): record[] => {
  const uri = `/api/getRecords?team=${team}&person=${person}&date=${date}`;
  const { data } = useSWR(uri, fetcher);
  const newRecord = data?.records;
  return newRecord;
};
