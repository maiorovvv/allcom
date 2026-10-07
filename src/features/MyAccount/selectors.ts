import { RootState } from '../../app/store';
import UserDto from './types/User';

export const selectLoadUser = (state: RootState): boolean => state.userData.loading;
export const selectUser = (state: RootState): UserDto => state.userData.user;
