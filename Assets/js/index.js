// Declaration of an array of hourly time blocks
const workingHours = [
	{
		timeLabel: "09:00",
		key: 9,
	},
	{
		timeLabel: "10:00",
		key: 10,
	},
	{
		timeLabel: "11:00",
		key: 11,
	},
	{
		timeLabel: "12:00",
		key: 12,
	},
	{
		timeLabel: "13:00",
		key: 13,
	},
	{
		timeLabel: "14:00",
		key: 14,
	},
	{
		timeLabel: "15:00",
		key: 15,
	},
	{
		timeLabel: "16:00",
		key: 16,
	},
	{
		timeLabel: "17:00",
		key: 17,
	},
];

// function to target the current date section
const renderDate = () => {
	// get current date from moment js and format date/time
	const dateAndTime = moment().format("dddd, MMMM Do, YYYY hh:mm A");
	//set the text.content to in the <p> to update the date
	$("#currentDay").append(dateAndTime);
};

// Read from local storage function
const readFromLocalStorage = (key) => {
	// get from LS using key name
	const dataFromLS = localStorage.getItem(key);

	// parse data from LS
	const parsedData = JSON.parse(dataFromLS);
	if (parsedData) {
		return parsedData;
	} else {
		return "";
	}
};

// Write to local storage function
const writeToLocalStorage = (key, value) => {
	// convert value to string
	const stringifiedValue = JSON.stringify(value);

	// set stringified value to LS for key name
	localStorage.setItem(key, stringifiedValue);
};

// function to create HTML for each time block and append to the page

// const renderTimeBlocks = () => { };

// function to target the current date section and render the date and time

// const renderDate = () => { }

// Initial function to execute on page load
const onReady = () => {
	renderDate();
	renderTimeBlocks();
};

// Event listeners
$(document).ready(onReady);
// $(window).on("load", onReady);
