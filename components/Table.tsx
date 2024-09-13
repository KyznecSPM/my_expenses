/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Tags, tagsTitles } from '@/helpers/constants';
import Image from 'next/image';
import actionBagIcon from '@/assets/action-bag.svg';
import actionEditIcon from '@/assets/action-edit.svg';
import { numericFormatter } from 'react-number-format';

const sumFormat = (value: number) =>
  numericFormatter(`${value}`, {
    thousandSeparator: ' ',
    suffix: ' ₽',
  });

const columns = [
  {
    key: 'description',
    title: 'Описание',
  },
  {
    key: 'category',
    title: 'Категория',
    render: (tag: Tags) => tagsTitles.get(tag),
  },
  {
    key: 'date',
    title: 'Дата',
  },
  {
    key: 'sum',
    title: 'Сумма',
    render: sumFormat,
  },
];

type Column = (typeof columns)[number]['key'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TableData = Record<Column, any>;

interface TableProps<T extends TableData> {
  data: Record<Column, T[Column]>[];
  onRowDelete?: (id: string) => void;
}

export function Table<T extends TableData>({
  data,
  onRowDelete,
}: TableProps<T>) {
  return (
    <div className='max-h-[530px] overflow-y-auto'>
      <table className='relative w-full'>
        <thead className='sticky top-0 bg-white'>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className='text-border text-normal px-[32px] py-[6px] text-left font-normal leading-normal'
              >
                {column.title}
              </th>
            ))}
            <th />
          </tr>
          <tr>
            <th
              className='h-[10px] bg-white p-0'
              colSpan={columns.length + 1}
            />
          </tr>
          <tr>
            <th
              className='bg-border h-[1px] p-0'
              colSpan={columns.length + 1}
            />
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map(({ key, render }) => (
                <td
                  key={key}
                  className='text-normal px-[32px] py-[7px] font-normal leading-normal'
                >
                  {/* @ts-expect-error */}
                  {render ? render(row[key]) : row[key]}
                </td>
              ))}
              <td className='py-[7px] pl-[32px] pr-[29px]'>
                <div className='flex items-center justify-center'>
                  <button className='mr-[12px]'>
                    <Image
                      priority
                      src={actionEditIcon}
                      alt='action edit icon'
                    />
                  </button>
                  <button onClick={() => onRowDelete && onRowDelete(row.id)}>
                    <Image
                      priority
                      src={actionBagIcon}
                      alt='action delete icon'
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
