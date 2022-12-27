// import Comment from '../components/Comment';
import { useEffect, useState } from 'react';
import { getImages } from '../../utils/api';
import { useParams, Link } from 'react-router-dom';
import './styles.css';

export default function Day(props) {
	const { date } = useParams();
	//image url of current day
	const [theDay, setDay] = useState([]);
	//param date states for current/prev/next day
	const [dateState, setDateState] = useState({
		current: '',
		previous: '',
		next: '',
	});

	// modify date parameter to add/sub a day
	// refered to https://stackoverflow.com/questions/67291965/add-and-rest-one-day-to-date-string for solution
	function modifyDate(input, dayModification) {
		// converting params string to date object
		const newDate = new Date(`${input} 00:00`);
		// add the dayModification value as days to the date
		newDate.setDate(newDate.getDate() + dayModification);
		// could use date.toISOString or date.toJson to convert date to string; decides date format
		return newDate.toISOString().split('T')[0];
	}

	const findDay = async () => {
		const day = await props.monthImages.find((item) => item.date === date);
		return setDay(day);
	};

	const [mediaSource, setMediaSource] = useState([]);

	useEffect(() => {
		if (date) {
			findDay();
		}
		if (theDay.media_type === 'image') {
			setMediaSource(<img alt={`photo of ${date}`} src={theDay.url} />);
		} else {
			setMediaSource(
				<div class='embed-responsive embed-responsive-16by9'>
					<iframe
						class='embed-responsive-item'
						width='80%'
						height='500vh'
						src={theDay.url}
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowfullscreen></iframe>
				</div>
			);
		}
		setDateState({
			current: date,
			previous: modifyDate(date, -1),
			next: modifyDate(date, +1),
		});
	}, [theDay, date]);

	return (
		<div className='day-container'>
			{theDay && (
				<div className='card'>
					<span className='card-title'>
						<Link className='previousDay' to={`/day/${dateState.previous}`}>
							{' '}
							&#171;{' '}
						</Link>
						<h2> {theDay.title}</h2>
						<Link className='nextDay' to={`/day/${dateState.next}`}>
							{' '}
							&#187;{' '}
						</Link>
					</span>
					{mediaSource}
					<p> {theDay.copyright}</p>
					<p> Explanation: {theDay.explanation}</p>
				</div>
			)}
		</div>
	);
}
