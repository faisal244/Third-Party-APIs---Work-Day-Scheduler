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

// function to generate HTML for each time block, then append to the page.
const renderTimeBlocks = () => {
	// target the time block container and create time blocks for each working hour in the workingHours array
	$.each(workingHours, function (index, workingHour) {
		// get current hour using moment js
		const currentHour = moment().hour();

		// function to render the textarea color depending on the conditional statements
		const renderTextareaColor = () => {
			// if current hour is equal to working hour
			if (currentHour === workingHour.key) {
				return "present";
			}
			//if current hour is less than working Hour
			else if (currentHour < workingHour.key) {
				return "future";
				//if current hour greater than  working Hour
			} else if (currentHour > workingHour.key) {
				return "past";
			}
		};

		$(
			"#time-block-container"
		).append(`<div class="time-blocks d-flex flex-row align-items-center">
        <div id=timeLabel">${workingHour.timeLabel}</div>
        <textarea
          class="text-area form-control text-black ${renderTextareaColor()}"
          id="floatingTextarea2"
          style="height: 100px"
        >${readFromLocalStorage(workingHour.key)}</textarea>
        <div class="button-container">
          <button class="save-button">save</button>

        </div>
        </div>`);
	});

	// targeting save and delete button elements
	const saveButton = document.querySelectorAll(".save-button");

	// delete button functionality to be considered in future development - see below 2 comments for reference
	// const deleteButton = document.querySelectorAll(".delete-button");
	// <button class="delete-button">Delete</button>

	// targeting text area elements
	const textAreas = document.querySelectorAll(".text-area");

	const notify = document.querySelectorAll(".notification");

	// looping trough each button and attaching an event listener
	saveButton.forEach((btn, index) => {
		$(btn).on("click", () => {
			// if text area is saved when not empty
			if (textAreas[index].value != "") {
				// call fn to store notes to LS
				writeToLocalStorage(workingHours[index].key, textAreas[index].value);

				//Render Saved to LS notification, and remove it after it has been displayed for 5 seconds
				$("#notify").empty();
				$("#notify").append(
					`Appointment Added to <code>localStorage</code> ✔️`
				);

				setTimeout(function () {
					if ($("#notify").length > 0) {
						$("#notify").empty();
					}
				}, 5000);
			} else {
				// add alert message to text area section if no text has been entered and user tries to save
				textAreas[index].placeholder =
					"You can not save an empty section, please insert information to save";
			}
		});
	});
};

// function to target the current date section and render the date and time
const renderDate = () => {
	// get current date from moment js and format date/time
	const dateAndTime = moment().format("dddd, MMMM Do, YYYY hh:mm A");
	//set the text.content to in the <p> to update the date
	$("#currentDay").append(dateAndTime);
};

// clear all tasks and reload page
const clearLocalStorage = () => {
	localStorage.clear();
	location.reload();
};

// Initial function to execute on page load
const onReady = () => {
	renderDate();
	renderTimeBlocks();
};

// Event listeners
$(document).ready(onReady);
const clearButton = $(".clearButton");
clearButton.click(clearLocalStorage);
