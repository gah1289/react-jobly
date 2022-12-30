import React, { useEffect, useState, useRef, useContext } from 'react';
import JoblyApi from '../backend/helpers/api';
import './Jobs.css';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import ItemContext from '../ItemContext';

function JobCard({ job }) {
	const [
		company,
		setCompany
	] = useState();

	const { user } = useContext(ItemContext);

	useEffect(() => {
		async function getCompany(handle) {
			let res = await JoblyApi.getCompany(handle);

			setCompany(res);
			setIsLoading(false);
		}
		getCompany(job.companyHandle);
	}, []);
	const appliedJobs = user.current.applications;

	function checkApplied() {
		if (appliedJobs.includes(job.id)) {
			return true;
		}
		else {
			return false;
		}
	}

	const [
		isLoading,
		setIsLoading
	] = useState(true);
	const [
		applied,
		setApplied
	] = useState(checkApplied());

	if (isLoading) {
		return '';
	}

	const applyForJob = async (jobId) => {
		await JoblyApi.apply(user.current.username, jobId);

		setApplied(true);
	};

	return (
		<Card key={uuid()} style={{ minWidth: '30vw' }} className="job-card">
			<CardBody>
				<CardTitle tag="h5">{job.title}</CardTitle>
				<CardSubtitle className="mb-2 text-muted" tag="h6">
					Company:{' '}
					<Link to={`/companies/${company.handle}`} onClick>
						{company.name}
					</Link>
				</CardSubtitle>

				{job.salary ? <CardText>Salary: ${job.salary}</CardText> : <CardText> Salary not disclosed</CardText>}
				{job.equity ? <CardText>Equity: {job.equity}</CardText> : <CardText> No equity</CardText>}
				{applied ? (
					<Button disabled={true}>Applied</Button>
				) : (
					<Button outline onClick={() => applyForJob(job.id)}>
						Apply
					</Button>
				)}
			</CardBody>
		</Card>
	);
}

export default JobCard;
