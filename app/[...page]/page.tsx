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
    <div className='flex flex-col'>
      <header className='h-[64px] w-full bg-white'>
        <div className='relative mx-auto flex h-full w-full max-w-[1200px] justify-around'>
          <div className='absolute bottom-0 left-0 top-0 flex items-center'>
            <Image priority src={logoIcon} alt='Logo' />
          </div>
          <Tabs />
          <div className='absolute bottom-0 right-0 top-0 flex items-center font-semibold'>
            <button className='h-[24px] text-tab leading-tab'>
              {logoutTitle}
            </button>
          </div>
        </div>
      </header>
      <main className='mx-auto mb-[36px] flex w-full max-w-[1200px] flex-col'>
        <h1 className='mb-[32px] mt-[36px] text-title font-bold leading-title'>
          {title}
        </h1>
        <div className='flex min-h-[618px] gap-[34px]'>
          <section className='shadow-card flex flex-auto flex-col rounded-[30px] bg-white'>
            <ExpenseTable />
          </section>
          <section className='shadow-card flex w-[379px] flex-initial flex-col gap-[24px] rounded-[30px] bg-white p-[32px]'>
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
