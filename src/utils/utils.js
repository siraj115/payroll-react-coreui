const capitalizeFirstLetter= (str)=>{
    return str.charAt(0).toUpperCase()+str.slice(1)     
  }
const calculateDaysRemaining = (startdate,enddate)=>{
  const startDate = new Date(startdate);
  const endDate = new Date(enddate);
  console.log(startDate,endDate)
  return (endDate - startDate) / (1000 * 60 * 60 * 24);;
}
const formattedDate = (dateStr)=>{
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB',options)
}
  export {capitalizeFirstLetter, calculateDaysRemaining, formattedDate}