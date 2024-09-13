import bagIcon from '@/assets/bag.svg';
import carIcon from '@/assets/car.svg';
import gameboyIcon from '@/assets/gameboy.svg';
import houseIcon from '@/assets/house.svg';
import messageIcon from '@/assets/message-text.svg';
import teacherIcon from '@/assets/teacher.svg';

export enum Tags {
  Food = 'Food',
  Transportation = 'Transportation',
  Housing = 'Housing',
  Entertainment = 'Entertainment',
  Education = 'Education',
  Other = 'Other',
}

export const tagsIcons = new Map([
  [Tags.Food, bagIcon],
  [Tags.Transportation, carIcon],
  [Tags.Housing, houseIcon],
  [Tags.Entertainment, gameboyIcon],
  [Tags.Education, teacherIcon],
  [Tags.Other, messageIcon],
]);

export const tagsTitles = new Map([
  [Tags.Food, 'Еда'],
  [Tags.Transportation, 'Транспорт'],
  [Tags.Housing, 'Жилье'],
  [Tags.Entertainment, 'Развлечения'],
  [Tags.Education, 'Образование'],
  [Tags.Other, 'Другое'],
]);
