import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

const teamState = atom<string>({
  key: 'form/team',
  default: '',
});

const dateState = atom<string>({
  key: 'form/date',
  default: '',
});

const personState = atom<string>({
  key: 'form/person',
  default: '',
});

export const useForm = (): [
  string,
  (team: string) => void,
  string,
  (date: string) => void,
  string,
  (person: string) => void,
] => {
  const [team, setTeam] = useRecoilState(teamState);
  const [date, setDate] = useRecoilState(dateState);
  const [person, setPerson] = useRecoilState(personState);

  return [
    team,
    useCallback((team: string) => setTeam(team), []),
    date,
    useCallback((date: string) => setDate(date), []),
    person,
    useCallback((person: string) => setPerson(person), []),
  ];
};
