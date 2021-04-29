import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileFormValues, GENDERS } from 'pages/Profile/hooks/useValidateForm';
import { User } from './types';

export type UserState = Readonly<{
  currentUser?: User;
}>;

const initialState: UserState = {
  currentUser: undefined,
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    optimisticallyUpdateCurrentUser: (state, action: PayloadAction<ProfileFormValues>) => {
      if (state.currentUser === undefined) {
        return;
      }
      state.currentUser = {
        ...state.currentUser,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        gender: action.payload.gender === GENDERS[0].value ? undefined : action.payload.gender,
        birthdate: action.payload.birthday,
        coalitionSubscription: action.payload.coalitionSubscription ?? false,
        causeSubscription: action.payload.causeSubscription ?? false,
        phone:
          action.payload.phoneNumber !== undefined &&
          action.payload.phoneCountry?.region !== undefined
            ? {
                number: action.payload.phoneNumber,
                country: action.payload.phoneCountry?.region,
              }
            : null,
      };
    },
    deleteCurrentUser: state => {
      state.currentUser = undefined;
    },
  },
});

export const {
  updateCurrentUser,
  deleteCurrentUser,
  optimisticallyUpdateCurrentUser,
} = userSlice.actions;
export default userSlice.reducer;
