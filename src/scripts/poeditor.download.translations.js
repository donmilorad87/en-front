/* eslint-disable no-undef */
import * as fs from "fs";
import "dotenv/config";

const response = await fetch("https://api.poeditor.com/v2/languages/list", {
	method: "POST",
	headers: {
		accept: "application/json",
	},
	body: new URLSearchParams({
		api_token: "47ea3af360fdb4d3e60087cc4b4c3e9f",
		id: "627341",
	}),
})
	.then((response) => response.json())
	.then((response) => {
		let map = response.result.languages.map((language) => {
			return language.code;
		});

		return map;
	})
	.catch(function (error) {
		console.log(error);
	});

if (response) {
	for (let i = 0; i < response.length; i++) {
		let language = response[i];
		await fetch("https://api.poeditor.com/v2/terms/list", {
			method: "POST",
			headers: {
				accept: "application/json",
			},
			body: new URLSearchParams({
				api_token: process.env.PO_EDITOR_API_KEY,
				id: process.env.PO_EDITOR_PROJECT_ID,
				language: language,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				let terms = response.result.terms;

				let tempData = {};
				for (let i = 0; i < terms.length; i++) {
					tempData[terms[i].term] =
						terms[i].translation.content.one ?? terms[i].translation.content;

					terms[i].plural !== ""
						? (tempData[terms[i].term + "_other"] = terms[i].plural)
						: false;
				}

				let dir = "src/Translation";

				if (!fs.existsSync(dir)) {
					fs.mkdirSync(dir, { recursive: true });
				}

				fs.writeFile(
					`${dir}/${language}.json`,
					JSON.stringify(tempData, null, 4),
					function (err) {
						if (err) throw err;
						console.log("File is created successfully.");
					}
				);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}
