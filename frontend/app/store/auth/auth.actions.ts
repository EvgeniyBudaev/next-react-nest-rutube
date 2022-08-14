import { createAsyncThunk } from '@reduxjs/toolkit'

import { IAuthFields } from '@/components/layout/header/auth-form/auth-form.interface'

import { IAuthData } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

export const register = createAsyncThunk<IAuthData, IAuthFields>(
	'auth/register',
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await AuthService.register(email, password)
			//toastr.success('Регистрация', 'Успешно выполнена')
			return response
		} catch (e) {
			//toastError(e)
			return thunkAPI.rejectWithValue(e)
		}
	}
)
