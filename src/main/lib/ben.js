/**
 * Ben.js Copyright (C) 20015, Ralph Soika, https://github.com/rsoika/ben.js
 */

var Ben = new Ben();

function Ben() {

	console.debug('------------------------');
	console.debug('Ben.js: Version 1.0.0');
	console.debug('------------------------');

	var that = this;

	this._controllers = new Array();

	this.createController = function(id, model, appController) {
		console.debug('register new controller: \'' + id + '\'');

		var aController = new BenController(id, model, appController);
		that._controllers.push(aController);

		if (appController)
			return appController;
		else
			return aController;

	}

	this.findController = function(f) {
		return that._controllers[0];
	}

}

function BenController(id, model, controller) {
	this.id = id;
	this.model = model;
	this.controller = controller;

	/*
	 * refresh the view
	 */
	this.refresh = function() {
		console.debug("updateing view '" + this.id + "': Model=", this.model);
		var selectorId = "[ben-controller='" + this.id + "']";

		/* clear input fields... */
		// clear_form_elements(this.id);
		update_form_elements(this.id, this.model);

	}

	this.read = function() {
		console.debug(this.id + " read view...");
		var selectorId = "[ben-controller='" + this.id + "']";

		// read all keys...

		// alert('read...');

		read_form_elements(this.id, this.model);

	}
}

/**
 * this method updates all input fields with the attribute 'ben-model' inside
 * the given controller section with the corresponding model value. If no model
 * value exists the field input will be cleard
 */
function update_form_elements(controllerid, model) {

	var selectorId = "[ben-controller='" + controllerid + "']";

	// $(selectorId).find(':input').each(function() {
	$(selectorId).find('[ben-model]').each(function() {

		// check if input is a ben-model
		var modelField = $(this).attr("ben-model");
		if (modelField) {

			var modelValue = model[modelField];
			if (!modelValue)
				modelValue = "";

			// test for normal element
			if (!this.type && $(this).text) {
				$(this).text(modelValue);
			} else {
				// test input fields
				switch (this.type) {
				case 'text':
				case 'hidden':
				case 'password':
				case 'select-multiple':
				case 'select-one':
				case 'textarea':
					$(this).val(modelValue);
					break;
				case 'checkbox':
				case 'radio':
					this.checked = false;
				}
			}
		}
	});

}

/**
 * this method reads all input fields with the attribute 'ben-model' inside the
 * given controller section and updates the corresponding model value.
 */
function read_form_elements(controllerid, model) {

	var selectorId = "[ben-controller='" + controllerid + "']";

	$(selectorId).find(':input').each(function() {
		// $(selectorId).find('[ben-model]').each(function() {

		// check if input is a ben-model
		var modelField = $(this).attr("ben-model");
		if (modelField) {

			var modelValue = "";

			// test input fields
			switch (this.type) {
			case 'text':
			case 'hidden':
			case 'password':
			case 'select-multiple':
			case 'select-one':
			case 'textarea':
				modelValue = $(this).val();
				model[modelField] = modelValue;
				console.log("Updating Model: ", model);
				break;
			case 'checkbox':
			case 'radio':
				this.checked = false;
			}

		}
	});

}

$(document).ready(function() {

	console.debug("starting application...");
	// refresh all registered controllers....
	$.each(Ben._controllers, function(index, contrl) {
		contrl.refresh();
	});

});