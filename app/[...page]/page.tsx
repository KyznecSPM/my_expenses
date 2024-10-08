import Image from 'next/image';
import logoIcon from '@/assets/logo.svg';
import { Tabs } from '@/components/Tabs';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseTable } from '@/components/ExpenseTable';

const logoutTitle = 'Выйти';

const title = 'Мои расходы';
const formTitle = 'Новый расход';

export default function Home() {
  return (
    <div className='flex min-w-[750px] flex-col'>
      <header className='h-[64px] w-full bg-white'>
        <div className='relative mx-auto flex h-full w-full max-w-[1264px] justify-around'>
          <div className='absolute bottom-0 left-[32px] top-0 flex items-center'>
            <Image priority src={logoIcon} alt='Logo' />
          </div>
          <Tabs />
          <div className='absolute bottom-0 right-[32px] top-0 flex items-center font-semibold'>
            <button className='h-[24px] text-tab leading-tab'>
              {logoutTitle}
            </button>
          </div>
        </div>
      </header>
      <main className='mx-auto mb-[36px] flex w-full max-w-[1264px] flex-col px-[32px]'>
        <h1 className='mb-[32px] mt-[36px] text-title font-bold leading-title'>
          {title}
        </h1>
        <div className='flex min-h-[618px] flex-col gap-[34px] lg:flex-row'>
          <section className='flex flex-auto flex-col rounded-[30px] bg-white shadow-card'>
            <ExpenseTable />
          </section>
          <section className='flex w-[379px] flex-initial flex-col gap-[24px] rounded-[30px] bg-white p-[32px] shadow-card'>
            <h2 className='text-subtitle font-bold leading-subtitle'>
              {formTitle}
            </h2>
            <ExpenseForm />
          </section>
        </div>
      </main>
    </div>
  );
}
