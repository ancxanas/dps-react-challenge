import axios from 'axios';
import { User } from '../types/user';

const getAll = async (): Promise<User> => {
	try {
		const res = await axios.get('https://dummyjson.com/users');
		if (res && res.data && res.data.users) {
			return res.data.users;
		} else {
			throw new Error('Unexpected response format');
		}
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};

export default {
	getAll: getAll,
};
