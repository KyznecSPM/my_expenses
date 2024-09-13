'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { title: 'Мои расходы', href: '/my_expenses' },
  { title: 'Анализ расходов', href: '/expenditure_analysis' },
];

export function Tabs() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className='flex'>
      <ul className='flex items-center'>
        {tabs.map(({ title, href }) => (
          <li key={href} className='[&:not(:last-child)]:mr-[48px]'>
            <Link
              href={href}
              className={
                pathname === href
                  ? 'text-tab font-semibold leading-tab text-primary underline underline-offset-[6px]'
                  : 'text-tab font-normal leading-tab underline-offset-[6px] hover:underline'
              }
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
