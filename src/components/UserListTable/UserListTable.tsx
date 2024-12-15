import React from 'react';
import './UserListTable.css';
import { User } from '../../types/user';

interface UserListTableProps {
	filteredData: User[];
	oldestPerCity: Record<string, User>;
	highlightOldest: boolean;
}

const formatDate = (date: string) => {
	const d = new Date(date);
	return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};

const UserListTable: React.FC<UserListTableProps> = ({
	filteredData,
	oldestPerCity,
	highlightOldest,
}) => {
	if (!filteredData.length) {
		return <p>No users found. Please adjust your filter criteria.</p>;
	}

	return (
		<table className="user-list-table">
			<thead className="user-list-table__head">
				<tr className="user-list-table__row">
					<th className="user-list-table__header-cell">Name</th>
					<th className="user-list-table__header-cell">City</th>
					<th className="user-list-table__header-cell">Birthday</th>
				</tr>
			</thead>
			<tbody className="user-list-table__body">
				{filteredData.map((item) => {
					const isOldest =
						oldestPerCity[item.address.city].id === item.id;

					return (
						<tr
							key={item.id}
							className={`user-list-table__row ${
								highlightOldest && isOldest
									? 'user-list-table__row--highlight'
									: ''
							}`}
						>
							<td
								className={`user-list-table__cell ${
									highlightOldest && isOldest
										? 'user-list-table__cell--highlight'
										: ''
								}`}
							>
								{item.firstName} {item.lastName}
							</td>
							<td
								className={`user-list-table__cell ${
									highlightOldest && isOldest
										? 'user-list-table__cell--highlight'
										: ''
								}`}
							>
								{item.address.city}
							</td>
							<td
								className={`user-list-table__cell ${
									highlightOldest && isOldest
										? 'user-list-table__cell--highlight'
										: ''
								}`}
							>
								{formatDate(item.birthDate)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default UserListTable;
