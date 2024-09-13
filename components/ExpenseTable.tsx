'use client';
import { Table } from '@/components/Table';
import triangleIcon from '@/assets/triangle.svg';
import Image from 'next/image';
import { ExpenseEntity, useExpense } from '@/context/Expense';
import { Dropdown } from './Dropdown';
import { Tags, tagsTitles } from '@/helpers/constants';
import flow from 'lodash.flow';
import { useState } from 'react';
import { parse, isValid } from 'date-fns';

const tableTitle = 'Таблица расходов';

enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

const filterByTag = (tag: Tags | null) => (state: ExpenseEntity[]) => {
  if (tag) {
    return state.filter((expense) => expense.category === tag);
  }
  return state;
};

const sortByDate = (direction: SortDirection) => (state: ExpenseEntity[]) => {
  return [...state].sort((a, b) => {
    const dateA = parse(a.date ?? '', 'dd.MM.yyyy', new Date());
    const dateB = parse(b.date ?? '', 'dd.MM.yyyy', new Date());

    if (!isValid(dateA) || !isValid(dateB)) {
      return 0;
    }

    if (direction === SortDirection.ASC) {
      return dateA.getTime() - dateB.getTime();
    }
    return dateB.getTime() - dateA.getTime();
  });
};

export const ExpenseTable = () => {
  const { state, deleteExpense } = useExpense();
  const [selectedTag, setSelectedTag] = useState<Tags | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );

  const data = flow(filterByTag(selectedTag), sortByDate(sortDirection))(state);

  return (
    <>
      <div className='m-[32px] mb-[26px] mr-[34px] flex h-[29px] items-end justify-between'>
        <h2 className='text-subtitle font-bold leading-subtitle'>
          {tableTitle}
        </h2>
        <div className='flex gap-[24px]'>
          <Dropdown
            onSelect={({ key }) => setSelectedTag(key as Tags)}
            menuItems={Object.values<Tags>(Tags).map((tag) => ({
              key: tag,
              text: tagsTitles.get(tag) ?? '',
            }))}
          >
            <div className='flex cursor-pointer items-center'>
              <span className='mr-[8px] text-[12px] font-normal leading-[18px]'>
                Фильтровать по категории
              </span>
              <Image priority src={triangleIcon} alt='triangle icon' />
            </div>
          </Dropdown>
          <Dropdown
            onSelect={({ key }) => setSortDirection(key as SortDirection)}
            menuItems={[
              { key: SortDirection.ASC, text: 'По возрастанию' },
              { key: SortDirection.DESC, text: 'По убыванию' },
            ]}
          >
            <div className='flex cursor-pointer items-center'>
              <span className='text-[12px] font-normal leading-[18px]'>
                Сортировать по
              </span>
              <span className='ml-[4px] mr-[8px] text-[12px] font-normal leading-[18px] text-primary underline underline-offset-[6px]'>
                дате
              </span>
              <Image priority src={triangleIcon} alt='triangle icon' />
            </div>
          </Dropdown>
        </div>
      </div>
      <Table data={data} onRowDelete={deleteExpense} />
    </>
  );
};
