import {MutableRefObject} from 'react';

import {FILTERS} from '@components/TodosFilters/config';

export type Filter = (typeof FILTERS)[keyof typeof FILTERS];

export interface Controls {
  toggleFilter: () => void;
}

export interface TodosFiltersProps {
  controlRef: MutableRefObject<Controls | null>;
}
