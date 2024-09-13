'use client';

import Image from 'next/image';
import { Tags, tagsIcons, tagsTitles } from '@/helpers/constants';
import { Controller, useForm } from 'react-hook-form';
import { Expense, useExpense } from '@/context/Expense';
import {
  InputAttributes,
  NumericFormat,
  PatternFormat,
} from 'react-number-format';

export function ExpenseForm() {
  const { register, handleSubmit, setValue, watch, control } =
    useForm<Expense>();
  const { addExpense } = useExpense();

  const activeTag = watch('category');

  return (
    <form
      className='flex flex-col gap-[24px]'
      onSubmit={handleSubmit(addExpense)}
    >
      <label className='flex flex-col gap-[16px]'>
        <h3 className='text-big font-semibold leading-big'>Описание</h3>
        <input
          {...register('description')}
          className='h-[39px] rounded-[6px] border-[1px] border-border p-[12px]'
          placeholder='Введите описание'
        />
      </label>
      <div className='flex flex-col gap-[16px]'>
        <h3 className='text-big font-semibold leading-big'>Категория</h3>
        <div className='flex flex-wrap gap-[6px]'>
          {Object.values<Tags>(Tags).map((tag) => (
            <div
              key={tag}
              tabIndex={0}
              aria-label={tagsTitles.get(tag)}
              aria-selected={activeTag === tag}
              className={`flex cursor-pointer items-center gap-[12px] rounded-[30px] ${activeTag === tag ? 'bg-primary' : 'bg-background'} px-[20px] py-[8px]`}
              onClick={() => setValue('category', tag)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setValue('category', tag);
              }}
            >
              <Image priority src={tagsIcons.get(tag)} alt={`${tag} icon`} />
              <span className='text-normal font-normal leading-normal'>
                {tagsTitles.get(tag)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <label className='flex flex-col gap-[16px]'>
        <h3 className='text-big font-semibold leading-big'>Дата</h3>
        <Controller
          control={control}
          name='date'
          render={({ field: { onChange } }) => (
            <PatternFormat
              format='##.##.####'
              onValueChange={({ formattedValue }) => onChange(formattedValue)}
              customInput={CustomDateInput}
            />
          )}
        />
      </label>
      <label className='flex flex-col gap-[16px]'>
        <h3 className='text-big font-semibold leading-big'>Сумма</h3>
        <Controller
          control={control}
          name='sum'
          render={({ field: { onChange } }) => (
            <NumericFormat
              onValueChange={({ floatValue }) => onChange(floatValue)}
              customInput={CustomSumInput}
              thousandSeparator=' '
              suffix=' ₽'
            />
          )}
        />
      </label>
      <button className='rounded-[6px] bg-primary p-[12px] text-normal font-normal leading-normal text-white'>
        Добавить новый расход
      </button>
    </form>
  );
}

const CustomSumInput = (props: InputAttributes) => {
  return (
    <input
      {...props}
      className='h-[39px] rounded-[6px] border-[1px] border-border p-[12px]'
      placeholder='Введите сумму'
    />
  );
};

const CustomDateInput = (props: InputAttributes) => {
  return (
    <input
      {...props}
      className='h-[39px] rounded-[6px] border-[1px] border-border p-[12px]'
      placeholder='Введите дату'
    />
  );
};
