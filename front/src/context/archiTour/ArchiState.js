import React, { useEffect, useReducer } from "react";
import ArchiContext from "./archiContext";
import ArchiReducer from "./archiReducer";
import { SHOW_BUILDINGS, SEARCH_BUILDINGS, GET_BUILDING, GET_ITINERARY, SET_ITINERARY, SET_ITINERARYINDEX, SET_ITINERARYID} from "../types";

const ArchiState = (props) => {
	const initialState = {
		buildings: [],
		building: {},
		itineraries: [],
		itinerary: [],
		itineraryIndex: 0,
		itineraryID: "",
	};

	const [state, dispatch] = useReducer(ArchiReducer, initialState);

	// Show Buildings
	const showBuildings = async () => {
		const rawData = await fetch("/allarchitectures");
		const res = await rawData.json();
		dispatch({
			type: SHOW_BUILDINGS,
			payload: res,
		});
	};

	useEffect(() => {
		showBuildings();
	}, []);

	// Search Buildings
	const searchBuildings = async (text) => {
		console.log(text);
		const rawData = await fetch(`/architectures/${text}`);
		const res = await rawData.json();
		dispatch({
			type: SEARCH_BUILDINGS,
			payload: res,
		});
	};

	// Get Building
	const getBuilding = async (title) => {
		console.log("fuction getting called", title);
		// Needs to get the specific building
		const rawData = await fetch(`/architectures/${title}`);
		const res = await rawData.json();
		// console.log("getBuilding" )
		dispatch({
			type: GET_BUILDING,
			payload: res[0], //因为res是个list但是只有一个value?
		});
	};

	const addItinerary = async (username) => {
		const responseRaw = fetch("/addItinerary", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
			}),
		});
		console.log("responseRaw", responseRaw);
	}

	const getItinerary = async () => {
		const rawData = await fetch("/allItinerary");
		const res = await rawData.json();
		console.log("getItinerary res", res);
		dispatch({
			type: GET_ITINERARY,
			payload: res,
		});
	};

	const setItineraryIndex = async (index) => {
		const res = index;
		dispatch({
			type: SET_ITINERARYINDEX,
			payload: res,
		});
	}

	const setItineraryID = async (id) => {
		const res = id;
		dispatch({
			type: SET_ITINERARYID,
			payload: res,
		});
	}

	const setItinerary = async (obj) => {
		const res = obj;
		dispatch({
			type: SET_ITINERARY,
			payload: res,
		});
	}


	const addStop = async (itinerayID,
		imageUrl,
		title,
		designer,
		address,
		phone,
		openTime,
		closeTime) => {
		const responseRaw = fetch("/addStop", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				itinerayID: itinerayID,
				imageUrl: imageUrl,
				title: title,
				designer: designer,
				address: address,
				phone: phone,
				openTime: openTime,
				closeTime: closeTime,
			}),
		});
		console.log("responseRaw", responseRaw);
	}

	const deleteStop = async (id, title) => {
		const responseRaw = fetch("/deleteStop", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
				title: title,
			}),
		});
		console.log("Delete Stop responseRaw", responseRaw);
	}


	return (
		<ArchiContext.Provider
			value={{
				buildings: state.buildings,
				building: state.building,
				itineraries: state.itineraries,
				itinerary: state.itinerary,
				itineraryIndex: state.itineraryIndex,
				itineraryID: state.itineraryID,
				showBuildings,
				searchBuildings,
				getBuilding,
				addItinerary,
				getItinerary,
				setItinerary,
				addStop,
				deleteStop,
				setItineraryIndex,
				setItineraryID,
			}}
		>
			{props.children}
		</ArchiContext.Provider>
	);
};

export default ArchiState;