// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// export interface ProfileState {
//   value: any;
//   employees: any;
// }

// const initialState: ProfileState = {
//   value: 0,
//   employees: [],
// };

// export const profileSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     increment: (state) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//     updateEmployees: (state, action: PayloadAction<any>) => {
//       state.employees = action.payload;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount, updateEmployees } =
//   profileSlice.actions;

// export default profileSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  id: string;
  name: string;
  email: string;
  position?: string;
}

interface ProfileState {
  employees: Employee[];
}

const initialState: ProfileState = {
  employees: [],
};

export const profileSlice = createSlice({
  name: "employees", // Renamed to match the data it manages
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees = state.employees.map((emp) =>
        emp.id === action.payload.id ? action.payload : emp
      );
    },
    removeEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },
  },
});

// Export actions
export const { setEmployees, addEmployee, updateEmployee, removeEmployee } =
  profileSlice.actions;

// Export reducer
export default profileSlice.reducer;
