const express = require("express");
const router = express.Router();
const myDB = require("../db/myDB.js");
const passport = require("passport");

router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/login?msg='Error auth'",
	}),
	(req, res) => {
		console.log("Logged in", req.body);
		res.redirect("/archiList");
	}
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/signin");
});

// route for registering a new user
router.post("/registerUser", async function (req, res) {
	try {
		const findUserRes = await myDB.findUserName(req.body.userName);
		console.log("Get username from login", findUserRes);

		// If findUserRes array is empty then we call registerUser function
		if (!findUserRes.length) {
			const registerUserRes = await myDB.registerUser(
				req.body.userName,
				req.body.password
			);
			console.log("Created user in db", registerUserRes);
		}
		// Send findUserRes to frontend and it will update accordingly
		res.send({ users: findUserRes });
	} catch (e) {
		res.status(400).send({ err: e });
	}
});

//route for get all architectures
router.get("/architectures/:findBy/:value", async (req, res) => {
	try{
		const archiRes = await myDB.getArchitectures(req.params.findBy, req.params.value);
		console.log("get architectures data from db ", archiRes);
		res.send({archiRes});
	}catch(e){
		res.status(400).send({ err: e });
	}
});

router.post("/myItinerary", async (req, res) => {
	try{
		const itineraryRes = await myDB.addItinerary(req.body);
		console.log("added an itinerary from db ", itineraryRes);
		res.send({status : "ok"});
	}catch(e){
		res.status(400).send({ err: e });
	}
});


router.post("/addStop", async (req, res) => {
	try{
		const addRes = await myDB.addStop(req.body.itinerayID, req.body.archiID);
		console.log("add stop in itineray from db ", addRes);
		res.send({status : "ok"});
	}catch(e){
		res.status(400).send({ err: e });
	}
});

router.post("/deleteStop", async (req, res) => {
	try{
		const delRes = await myDB.deleteStop(req.body.archiID);
		console.log("deleted stop in itineray from db ", delRes);
		res.send({status : "ok"});
	}catch(e){
		res.status(400).send({ err: e });
	}
});


module.exports = router;