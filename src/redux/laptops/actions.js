import { createAsyncThunk } from "@reduxjs/toolkit"

import axios from "axios";

export const getLaptops = createAsyncThunk("/getLaptops", async (params, thunkAPI) => {
	try {
		const response = await axios.get('http://localhost:3000/laptop', params, {
			headers: {
				'Content-Type': 'application/json',
			}
		});
		return response?.data ?? null
	} catch (error) {
		return thunkAPI.rejectWithValue("Error")
	}
})

export const getLaptopById = createAsyncThunk("/getLaptopById", async (id, thunkAPI) => {
	try {
		const response = await axios.get(`http://localhost:3000/laptop/${id}`, {
			headers: {
				'Content-Type': 'application/json',
			}
		});
		return response?.data ?? null
	} catch (error) {
		return thunkAPI.rejectWithValue("Error")
	}
})


export const getCart = createAsyncThunk("/getCart", async (thunkAPI) => {
	try {
		const response = await axios.get(`http://localhost:3000/cart`, {
			headers: {
				'Content-Type': 'application/json',
			}
		});
		return response?.data ?? null
	} catch (error) {
		return thunkAPI.rejectWithValue("Error")
	}
})


export const postToCart = createAsyncThunk("/postToCart", async (item, thunkAPI) => {
	try {
		await axios.post(`http://localhost:3000/cart`, item, {
			headers: {
				'Content-Type': 'application/json',
			}
		});
		return item
	} catch (error) {
		return thunkAPI.rejectWithValue("Error")
	}
})

export const deleteFromCart = createAsyncThunk("/deleteFromCart", async (id, thunkAPI) => {
	try {
		await axios.delete(`http://localhost:3000/cart/${id}`, {
			headers: {
				'Content-Type': 'application/json',
			}
		});
		return id
	} catch (error) {
		return thunkAPI.rejectWithValue("Error")
	}
})