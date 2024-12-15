import React from 'react';
import './UserSearchControls.css';
import { User } from '../../types/user';

interface UserSearchControls {
	searchName: string;
	setSearchName: React.Dispatch<React.SetStateAction<string>>;
	selectedCity: string;
	setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
	highlightOldest: boolean;
	setHighlightOldest: React.Dispatch<React.SetStateAction<boolean>>;
	users: User[];
}

const UserSearchControls: React.FC<UserSearchControls> = ({
	searchName,
	setSearchName,
	selectedCity,
	setSelectedCity,
	highlightOldest,
	setHighlightOldest,
	users,
}) => {
	const uniqueCities = Array.from(
		new Set(users.map((item) => item.address.city))
	);

	return (
		<div className="top-controls" role="region">
			<div className="input-container">
				<input
					type="text"
					id="search-input"
					className="top-controls__search-input"
					placeholder="Name"
					value={searchName}
					onChange={(e) => setSearchName(e.target.value)}
					aria-label="Search by name"
				/>
			</div>

			<div className="select-container">
				<select
					id="city-select"
					className="top-controls__city-select"
					value={selectedCity}
					onChange={(e) => setSelectedCity(e.target.value)}
					aria-label="Select a city"
				>
					<option value="">Select city</option>
					{uniqueCities.map((city) => (
						<option key={city} value={city}>
							{city}
						</option>
					))}
				</select>
			</div>

			<div className="checkbox-container">
				<label
					className="checkbox-label"
					htmlFor="highlight-oldest-checkbox"
				>
					<span>Highlight oldest per city</span>
					<div className="checkbox__container--highlight-oldest">
						<input
							type="checkbox"
							id="highlight-oldest-checkbox"
							checked={highlightOldest}
							onChange={(e) =>
								setHighlightOldest(e.target.checked)
							}
							aria-label="Highlight oldest per city"
						/>
					</div>
				</label>
			</div>
		</div>
	);
};

export default UserSearchControls;
