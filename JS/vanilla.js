
const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

// function for appending the elements

function getElements(getData, search_val) {
	  const card = document.createElement('div');
  	card.setAttribute('class', 'background_2 margin_3 width_100');

  	const div1 = document.createElement('div');
  	div1.setAttribute('class', 'width_25 display_inline center_align');

  	const div1_1 = document.createElement('div');
  	div1_1.setAttribute('class', 'padding_0_20 left_align');

  	const div2 = document.createElement('div');
  	div2.setAttribute('class', 'width_25 display_inline center_align');

  	const div3 = document.createElement('div');
  	div3.setAttribute('class', 'width_45 display_inline center_align');

  	// checkbox declare
  	const checkbox = document.createElement('input');
  	checkbox.type = 'checkbox';
  	if(getData.selected) {
  		checkbox.checked = true;
  	}
  	else {
  		checkbox.checked = false;
  	}
  	checkbox.name = "subhojit_121";
  	checkbox.value = checkbox.key;
  	checkbox.setAttribute('class', 'margin_3')

  	// include text with it
  	const h1 = document.createElement('h4');
  	h1.textContent = getData.label;
  	h1.setAttribute('class', 'font_14 font_family margin_3 margin_left_20 display_inline');

  	// include textField
  	var input1 = '';
  			
  	if(getData.field && getData.field.type && getData.field.type == 'select') {
  		var input1 = document.createElement('select');
  		if(getData.field.options.length > 0) {
  			getData.field.options.map((option, index) => {
  				var get_option = document.createElement('option');
  				get_option.setAttribute("value", option);
  				get_option.setAttribute("class", "center_align");
					  get_option.innerHTML = option;
					  input1.appendChild(get_option);
  			})
  		}
  	}
  	else {
  		input1 = document.createElement('input');
  		if(getData.field && getData.field.type) {
  			input1.type = getData.field.type;
  		}
  	}
  	if(getData.field && getData.field.defaultValue) {
  		input1.value = getData.field.defaultValue;
  	}
  	
  	input1.setAttribute('class', 'width_45 display_inline center_align margin_3 margin_left_20');

  	const h2 = document.createElement('h4');
  	h2.textContent = getData.description;
  	h2.setAttribute('class', 'font_14 font_family margin_3');

  	// console.log(search_val);

  	if(search_val && search_val != '') {
 
  		var myPattern = new RegExp('(\\w*'+getData.label+'\\w*)','gi');
  		var matches = search_val.match(myPattern);

  		if (matches === null) {

  		}
  		else {
  			container.appendChild(card);
  		  card.appendChild(div1);
  		  card.appendChild(div2);
  		  card.appendChild(div3);
  		  div1.appendChild(div1_1)
  		  div1_1.appendChild(checkbox);
  		  div1_1.appendChild(h1);
  		  div2.appendChild(input1);
  		  div3.appendChild(h2);
  		}
  	}
  	else {
  		container.appendChild(card);
	  	card.appendChild(div1);
	  	card.appendChild(div2);
	  	card.appendChild(div3);
	  	div1.appendChild(div1_1)
	  	div1_1.appendChild(checkbox);
	  	div1_1.appendChild(h1);
	  	div2.appendChild(input1);
	  	div3.appendChild(h2);
  	}
  	
}

// variable for storing the data;

var aData = "";

// search input handler ---- not finished....

var searchInput = document.getElementById('search_1110');
var search_val = '';
searchInput.addEventListener('input', function (evt) {
	// console.log(this.value);
	// console.log(aData);
	search_val = this.value;
	// console.log(data);

	app.innerHTML = "";
	if(aData.config && aData.config.length > 0) {
  		aData.config.map((getData, index) => {
			getElements(aData, search_val);
		});
	}
	
});

//Api call

var request = new XMLHttpRequest();
request.open('GET', 'https://api.myjson.com/bins/1a1dbq', true);

// Creating a request variable and assign a new XMLHttpRequest object to it.
request.onload = function () {

  // Begining accessing JSON data here
  var data = JSON.parse(this.response);
  aData = data;
  if (request.status >= 200 && request.status < 400) {
  	// console.log(data);
  	if(data.config && data.config.length > 0) {
  		data.config.map((getData, index) => {
  			// console.log(getData);
  			getElements(getData)
  		});
  	}
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();


