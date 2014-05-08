// For todays date;
Date.prototype.today = function () { 
    return  this.getFullYear() + '-'+ (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1)+ "-" + ((this.getDate() < 10)?"0":"") + this.getDate();
}

// For the time now
Date.prototype.timeNow = function(){     
	return ((this.getHours() < 10)?"0":"") + ((this.getHours()>12)?(this.getHours()-12):this.getHours()) +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds() + ' ' + ((this.getHours()>12)?('PM'):'AM'); 
};


// For date formatted to string YYYY-MM-DD
Date.prototype.dateToString = function(date){     
	return date.getFullYear() + '-'+ (((date.getMonth()+1) < 10)?"0":"") + (date.getMonth()+1)+ "-" + ((date.getDate() < 10)?"0":"") + date.getDate(); 
};

// For string date YYYY-MM-DD to date object.
Date.prototype.stringToDate = function(date){   
	date = date.split('-');

	var year = date[0];
	var month = date[1] - 1;
	var day = date[2];

	return new Date(year, month, day);
};