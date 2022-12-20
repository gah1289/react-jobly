import React, { useEffect, useState } from 'react';
import JoblyApi from '../backend/helpers/api';
import './Companies.css';
import { CardGroup, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, CardImg } from 'reactstrap';

import CompanySearchForm from './CompanySearchForm';

import logo1 from './logos/logo1.png';
import logo2 from './logos/logo2.png';
import logo3 from './logos/logo3.png';
import logo4 from './logos/logo4.png';
import noLogo from './logos/no-logo.png';

function CompaniesList() {
	const [
		companies,
		setCompanies
	] = useState([]);

	const [
		isLoading,
		setIsLoading
	] = useState(true);

	const [
		applied,
		setApplied
	] = useState(false);

	const getLogo = (logoUrl) => {
		let logo;
		let logoNum;
		if (logoUrl) {
			logoNum = logoUrl[11];
			if (logoNum === '1') {
				logo = logo1;
			}
			if (logoNum === '2') {
				logo = logo2;
			}
			if (logoNum === '3') {
				logo = logo3;
			}
			if (logoNum === '4') {
				logo = logo4;
			}
		}
		else logo = noLogo;
		return logo;
	};

	const filterCompanies = (co) => {
		setCompanies(co);
	};

	useEffect(() => {
		async function getCompanies(data) {
			let companiesFromApi = await JoblyApi.getCompanies();
			filterCompanies(companiesFromApi);

			setIsLoading(false);
		}
		getCompanies();
	}, []);

	if (isLoading) {
		return <p> loading...</p>;
	}

	return (
		<div>
			<h1>Companies</h1>
			<CompanySearchForm filterCompanies={filterCompanies} />

			<CardGroup>
				{companies.map((company) => (
					<Card key={company.handle} style={{ minWidth: '30vw' }} className="company-card">
						<CardImg
							style={{ height: '150px', width: '200px', margin: 'auto' }}
							alt={company.name}
							src={getLogo(company.logoUrl)}
							top
							width="100%"
						/>
						<CardBody>
							<CardTitle tag="h5">{company.name}</CardTitle>
							<CardSubtitle className="mb-2 text-muted" tag="h6">
								Size: {company.numEmployees} Employees
							</CardSubtitle>
							<CardText>{company.description}</CardText>
							<Button>Jobs</Button>
						</CardBody>
					</Card>
				))}
			</CardGroup>
		</div>
	);
}

export default CompaniesList;
