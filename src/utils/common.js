import moment from "moment";
export const checkErr = (_err)=>{
  console.log("from common", _err)
  let errMsg = "";
  if(_err.firstName){
    errMsg = errMsg + _err.firstName+". ";
  }
 if(_err.lastName){
   errMsg = errMsg + _err.lastName+". ";
 } 
 if(_err.contactMobile){
   errMsg = errMsg + _err.contactMobile+". "
 }
 if(_err.email){
   errMsg = errMsg +  _err.email +". "
 }
 if(_err.reportingManagerId){
   errMsg = errMsg + _err.reportingManagerId;
 }
 
 return errMsg;

}

export const formatMoney = (amount, toFixed) => {
  try {
    if (toFixed === undefined) {
      toFixed = 2;
    }
    if (amount === undefined) {
      return "...";
    }
    if (amount === null) {
      return "....";
    }
    if (amount.length === "") {
      return "....";
    }
    if (isNaN(+amount)) {
     
      return "....";
    }

    // return (+amount).toFixed(toFixed).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return amount.toString().split(".")[0].length > 3
      ? amount
          .toString()
          .substring(0, amount.toString().split(".")[0].length - 3)
          .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
          "," +
          amount
            .toString()
            .substring(amount.toString().split(".")[0].length - 3)
      : amount.toString();
  } catch (error) {}
};

export const getQparams = (qParams) => {
  // let qParams =[{page:1},{search:"abi"}]
  let url = "";

  if (qParams) {
    let params = qParams;
    let flag = 1;
    params.map((item, index) => {
      if (Object.values(item)[0] !== "") {
        if (flag) {
          flag = 0;
          url += `?${Object.keys(item)}=${Object.values(item)}`;
        } else {
          url += `&${Object.keys(item)}=${Object.values(item)}`;
        }
      }
    });

    return url;
    // ?page=1&search=abi"
  }
};
export const stringSortingByChar = (str, char) => {
  if (
    str != null &&
    str != undefined &&
    str != "" &&
    str.length > char &&
    str.length != char
  ) {
    let sorted = str.slice(0, char);

    return sorted + "..";
  } else {
    return str;
  }
};

export const determineMaxdate = () => {
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  var date = new Date();

  let maxDate = date.addDays(14);
  return maxDate;
};
export const GetFormattedDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  let res = [day, month, year].join("-");
  return res;
};
export const getDayName = (name) => {
  switch (name) {
    case "sun":
      return "Sunday";
    case "mon":
      return "Monday";
    case "tue":
      return "Tuesday";
    case "wed":
      return "Wednesday";
    case "thu":
      return "Thursday";
    case "fri":
      return "Friday";
    case "sat":
      return "Saturday";
  }
};
