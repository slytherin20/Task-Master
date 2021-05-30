export function date(){
     //Getting the current date
     const date = new Date();
     let dd = date.getDate();
     let mm = date.getMonth()+1;
     const yy = date.getFullYear();
     if(dd<10) dd = "0"+dd;
     if(mm<10) mm = "0"+mm;
     let dateString = yy+"-"+mm+"-"+dd;
     return dateString;
}

