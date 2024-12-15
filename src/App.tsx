import dpsLogo from './assets/DPS.svg';
import './App.css';
import { lazy, Suspense, useEffect, useState, useMemo } from 'react';
import userService from './services/users';
import { User } from './types/user';
import useDebounce from './components/hooks/useDebounce';
import UserSearchControls from './components/UserSearchControls/UserSearchControls';
import Loading from './components/Loading/Loading';
const UserListTable = lazy(
	() => import('./components/UserListTable/UserListTable')
);

const App = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [searchName, setSearchName] = useState<string>('');
	const [selectedCity, setSelectedCity] = useState<string>('');
	const [highlightOldest, setHighlightOldest] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const debouncedSearchName = useDebounce(searchName, 1000);
	const debouncedSelectedCity = useDebounce(selectedCity, 500);

	useEffect(() => {
		userService
			.getAll()
			.then((data) => {
				if (Array.isArray(data)) setUsers(data);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}, []);

	const filteredData = useMemo(
		() =>
			users
				.filter((item: User) =>
					`${item.firstName} ${item.lastName}`
						.toLowerCase()
						.includes(debouncedSearchName.toLowerCase())
				)
				.filter((item: User) =>
					debouncedSelectedCity
						? item.address.city === debouncedSelectedCity
						: true
				),
		[users, debouncedSearchName, debouncedSelectedCity]
	);

	const oldestPerCity: Record<string, User> = useMemo(
		() =>
			users.reduce<Record<string, User>>((acc, item) => {
				const city = item.address.city;
				if (
					!acc[city] ||
					new Date(item.birthDate) < new Date(acc[city].birthDate)
				) {
					acc[city] = item;
				}
				return acc;
			}, {}),
		[users]
	);

	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<UserSearchControls
					searchName={searchName}
					setSearchName={setSearchName}
					selectedCity={selectedCity}
					setSelectedCity={setSelectedCity}
					highlightOldest={highlightOldest}
					setHighlightOldest={setHighlightOldest}
					users={users}
				/>

				{loading ? (
					<Loading />
				) : (
					<Suspense fallback={<Loading />}>
						<UserListTable
							filteredData={filteredData}
							oldestPerCity={oldestPerCity}
							highlightOldest={highlightOldest}
						/>
					</Suspense>
				)}
			</div>
		</>
	);
};

export default App;
